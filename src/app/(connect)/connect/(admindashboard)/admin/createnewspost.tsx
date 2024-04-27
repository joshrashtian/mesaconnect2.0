"use client";
import React, { useState } from "react";

const CreateNews = () => {
  const [title, setTitle] = useState<string>();
  const [json, setJson] = useState<object>();
  const [sections, setSelections] = useState<
    { type: string; text?: string; imgURL?: string }[]
  >([{ type: "text" }]);
  const [tags, setTags] = useState<string[]>();

  return (
    <section>
      <h1>CreateNews</h1>
      <form>
        <input />
      </form>
    </section>
  );
};

export default CreateNews;
