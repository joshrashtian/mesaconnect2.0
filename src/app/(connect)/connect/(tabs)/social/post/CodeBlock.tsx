import React from "react";

const CodeBlock = ({ text }: { text: string | undefined }) => {
  const code = text?.split("\n");

  return (
    <pre className="bg-gray-800 p-4 flex flex-col rounded-xl">
      {code?.map((line: string, i: number) => (
        <code className="text-white font-mono">
          {i} | {line}
        </code>
      ))}
    </pre>
  );
};

export default CodeBlock;
