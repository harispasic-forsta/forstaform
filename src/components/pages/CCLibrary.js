import React, { useState, useEffect, useMemo, useRef } from "react";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { getFirestore, onSnapshot, collection } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import Table from "@confirmit/react-table";
import "../../App.css";
import "./CCLibrary.css";

export default function CCLibrary() {
  const [tableData, setTableData] = useState([]);
  const [url, setUrl] = useState("");
  const [show, setShow] = useState(false);
  const [attachmentDownloadURL, setAttachmentDownloadURL] = useState("");

  useEffect(() => {
    const db = getFirestore();
    return onSnapshot(collection(db, "Orders"), (snapshot) => {
      setTableData(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  //  const storage = getStorage();
  //  const attachment= (ref(storage, attachment));

  //   getDownloadURL=(attachment).then((url) => {
  //     console.log(url)
  //     setUrl(url)
  // })
  const myRefname = useRef(null);

  function handleAttachmentClick(attachment) {
    const storage = getStorage();
    getDownloadURL(ref(storage, attachment)).then((url) => {
      setAttachmentDownloadURL(url);
      myRefname.current.click();

      console.log(url);
    });
  }

  // const downloadURL = (attachment) => {
  //   const storage = getStorage();
  //   getDownloadURL(ref(storage, attachment)).then((url) => {
  //     console.log(url)
  //    return url;
  //   });
  // };

  const columns = useMemo(
    () => [
      {
        Header: "URL",
        accessor: "URL",
      },
      {
        Header: "Project",
        accessor: "Project",
      },
      {
        Header: "Report",
        accessor: "Report",
      },
      {
        Header: "Slide",
        accessor: "Slide",
      },
      {
        Header: "Subject",
        accessor: "Subject",
      },
      {
        Header: "Request",
        accessor: "Request",
      },
      {
        Header: "Tags",
        accessor: "Tags",
        Cell: function tableTags({ row }) {
          return (
            <div>
              {row.original.Tags.map((data) => {
                return (
                  <span className="table-tag" key={data.label + Date.now()}>
                    {data.label}
                  </span>
                );
              })}
            </div>
          );
        },
      },
      {
        Header: "Attachments",
        accessor: "Attachments",
        Cell: function tableAttachments({ row }) {
          return (
            <div>
              {row.original.Attachments.map((attachment) => (
                <span className="table-attachments" key={attachment}>
                  {" "}
                  <button onClick={handleAttachmentClick}>{attachment}</button>
                </span>
              ))}
            </div>
          );
        },
      },
    ],
    []
  );
  console.log("table data");

  return (
    <>
      <Container className="CC-Table">
        <h2 className="CC-Library-title">CC Library</h2>
        <a
          className="table-atag"
          href={attachmentDownloadURL}
          download
          ref={myRefname}
        ></a>
        <Table
          content={
            <Table.Content
              columns={columns}
              data={tableData}
              className="table"
            />
          }
        ></Table>
      </Container>
    </>
  );
}
