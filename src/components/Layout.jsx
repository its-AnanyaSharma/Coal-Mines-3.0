import { React } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router-dom";
import {Toaster} from 'react-hot-toast'
function Layout() {
  return (
    <>
      <Header />

      <Outlet />
      <Toaster/>
      <Footer />
    </>
  );
}

export default Layout;
