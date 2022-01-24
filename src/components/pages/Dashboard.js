import React from "react";
import "../../App.css";
import "./Dashboard.css";
import OrderForm from "../orderForm";
import SignOut from "../authentication/SignOut";

export default function Dashboard() {
  return (
    <>
      <OrderForm />
      <SignOut/>
    </>
  );
}
