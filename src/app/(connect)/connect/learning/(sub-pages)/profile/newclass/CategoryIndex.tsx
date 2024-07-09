import { ReactNode } from "react";
import { BiMath } from "react-icons/bi";
import { IoBook, IoDesktop, IoLaptop } from "react-icons/io5";

export function IconGet(category: string): ReactNode {
  switch (category.toLowerCase()) {
    case "math":
      return <BiMath />;
    case "cmpsci":
      return <IoDesktop />;
    default:
      return <IoBook />;
  }
}
