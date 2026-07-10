import { Outlet } from "react-router-dom";
import Navbar from "../src/components/layout/Navbar";

export default function AppLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}