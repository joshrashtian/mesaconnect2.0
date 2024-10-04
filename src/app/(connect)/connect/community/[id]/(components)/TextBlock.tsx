"use client";
import { useBlock } from "../../BlockIndex";

export default function TextBlockComponent() {
  const block = useBlock();
  return <p>{block?.data}</p>;
}
