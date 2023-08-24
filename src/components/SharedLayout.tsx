import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { footerAPI } from "../data/data";
import Cart from "./Cart";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface SharedLayoutProps {
  children: ReactNode;
}

const SharedLayout: React.FC<SharedLayoutProps> = ({ children }) => {
  const isAuth = localStorage.getItem("isAuth");

  if (!isAuth) {
    return <Navigate to={"/login"} />;
  }
  return (
    <>
      <Navbar />
      {children}
      <Cart />
      <Footer footerAPI={footerAPI} />
    </>
  );
};

export default SharedLayout;
