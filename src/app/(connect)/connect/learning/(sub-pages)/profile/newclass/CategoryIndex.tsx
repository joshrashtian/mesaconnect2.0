import { DnaIcon } from "lucide-react";
import { ReactNode } from "react";
import { BiMath } from "react-icons/bi";
import {
  IoBook,
  IoDesktop,
  IoFlask,
  IoHammer,
  IoLaptop,
} from "react-icons/io5";

export function IconGet(category: string): ReactNode {
  switch (category.toLowerCase()) {
    case "math":
      return <BiMath />;
    case "cmpsci":
      return <IoDesktop />;
    case "physic":
      return <IoFlask />;
    case "engr":
      return <IoHammer />;
    case "biosci":
      return <DnaIcon />;
    default:
      return <IoBook />;
  }
}
