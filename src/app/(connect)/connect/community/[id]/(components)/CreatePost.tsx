"use client";
import React, { useCallback } from "react";
import { IoMegaphone, IoPencil } from "react-icons/io5";
import { useMultiStep, useMultiStepState } from "../../../MutliStepContext";
import Input from "@/_components/Input";
import JoinButton from "./JoinButton";
import StandardButton from "@/(mesaui)/StandardButton";
import { IoMdMegaphone } from "react-icons/io";
import { Editor } from "@monaco-editor/react";

const CreatePost = () => {
  const { create, incrementStep, state } = useMultiStep();

  const post = () => {
    create({
      title: "Create Post",
      components: [
        <PageOne key="a" />,
        <PageTwo key="b" />,
        <PageThree key="c" />,
      ],
      options: {
        indexsWithNotskip: [2],
      },
    });
  };

  return (
    <button
      onClick={post}
      className="fixed bottom-10 right-4 z-50 rounded-full bg-red-600 p-4 text-3xl text-white duration-500 hover:scale-105 hover:bg-red-700"
    >
      <IoPencil />
    </button>
  );
};

const PageOne = () => {
  const [state, setState] = useMultiStepState();

  return (
    <div>
      <h3>What Would You Like To Post?</h3>

      <ol className="flex flex-col gap-1">
        <StandardButton
          buttonType="button"
          icon={<IoMdMegaphone />}
          onClick={() => setState({ type: "announcement" })}
        >
          Announcement
        </StandardButton>
        <StandardButton
          buttonType="button"
          icon={<IoMdMegaphone />}
          onClick={() => setState({ type: "html" })}
        >
          HTML
        </StandardButton>
      </ol>
    </div>
  );
};

const PageTwo = () => {
  const { alterState, state, decrementStep, incrementStep } = useMultiStep();

  switch (state?.type) {
    case "announcement":
      return (
        <div className="flex flex-col gap-3">
          <Input
            value={state?.title}
            onChange={(e) => alterState({ title: e.target.value })}
          />
          <Input
            value={state?.data?.text}
            onChange={(e) => alterState({ data: { text: e.target.value } })}
          />
          <StandardButton buttonType="button" onClick={decrementStep}>
            Back
          </StandardButton>
          <StandardButton buttonType="button" onClick={incrementStep}>
            Next
          </StandardButton>
        </div>
      );
    case "html":
      return (
        <div className="flex flex-col gap-3">
          <h3 className="font-bold">HTML Block</h3>
          <ul className="flex w-full flex-row gap-2">
            <Editor
              className="h-64 w-1/3 rounded-lg border-4 border-black/50"
              defaultLanguage="html"
              defaultValue={state.data}
              onChange={(e) => alterState({ data: e })}
            />
            <div
              className="w-1/2 border-4 border-black/50"
              dangerouslySetInnerHTML={{ __html: state.data }}
            />
          </ul>
        </div>
      );
    default:
      return null;
  }
};

const PageThree = () => {
  const { state, decrementStep, incrementStep } = useMultiStep();
  return (
    <div>
      <h3>Post Preview</h3>

      <ul className="mb-4 h-64 w-full rounded-3xl bg-white p-5 shadow-lg">
        <h4 className="text-xl font-bold">{state.title}</h4>
        {state.type === "html" ? (
          <div dangerouslySetInnerHTML={{ __html: state.data }} />
        ) : (
          <p>{state.data?.text}</p>
        )}
      </ul>
      <footer className="flex flex-row gap-2">
        <StandardButton buttonType="button" onClick={decrementStep}>
          Back
        </StandardButton>
        <StandardButton buttonType="button" onClick={incrementStep}>
          Post
        </StandardButton>
      </footer>
    </div>
  );
};

export default CreatePost;
