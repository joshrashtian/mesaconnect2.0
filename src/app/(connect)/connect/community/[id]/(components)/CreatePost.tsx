"use client";
import React, { useCallback } from "react";
import { IoPencil } from "react-icons/io5";
import { useMultiStep } from "../../../MutliStepContext";

const CreatePost = () => {
  const { create } = useMultiStep();

  const post = useCallback(() => {
    create({
      title: "Create Post",
      components: [
        <div key="c">
          <p>Welcome</p>
        </div>,
        <div key="2">
          <p>Numbero Dos</p>
        </div>,
      ],
    });
  }, []);

  return (
    <button
      onClick={post}
      className="fixed bottom-10 right-4 z-50 rounded-full bg-red-600 p-4 text-3xl text-white duration-500 hover:scale-105 hover:bg-red-700"
    >
      <IoPencil />
    </button>
  );
};

export default CreatePost;
