"use client";
import { useBlock } from "../../BlockIndex";

export default function TextBlockComponent() {
  const block = useBlock();
  return (
    <div>
      <p>{block?.data}</p>
      {block?.editor && <div>Editor</div>}
    </div>
  );
}
