import React, { useState, useEffect, useMemo, useRef } from "react";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { getFirestore, onSnapshot, collection } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import Table from "@confirmit/react-table";
import { useAuth } from "../../contexts/AuthContext";
import "./CCLibrary.css";

export default function CCLibrary() {
  const [tableData, setTableData] = useState([]);
  const [attachmentDownloadURL, setAttachmentDownloadURL] = useState("");
  const { currentUser } = useAuth();
  

  useEffect(() => {
    const db = getFirestore();
    return onSnapshot(collection(db, "Orders"), (snapshot) => {
      setTableData(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  const myRefname = useRef(null);

  function handleAttachmentClick(attachment) {
    const storage = getStorage();
    getDownloadURL(ref(storage, attachment)).then((url) => {
      setAttachmentDownloadURL(url);
      myRefname.current.click();

      console.log(url);
    });
  }

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
            <div >
              {row.original.Tags.map((data, index) => {
                return (
                  <span className="table-tag" key={index} >
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
                  <button
                    className="attachment-btn"
                    onClick={() => {
                      handleAttachmentClick(attachment);
                    }}
                  >
                    {attachment}
                  </button>
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
    {currentUser && <Container className="CC-Table">
        <h2 className="CC-Library-title">CC Library</h2>
        <a
          className="table-atag"
          href={attachmentDownloadURL}
          download
          ref={myRefname}
          target="_blank"
        ></a>
        <Table className="table"
          content={
            <Table.Content
              columns={columns}
              data={tableData}
            />
          }
        ></Table>
      </Container>}
    </>
  );
}
