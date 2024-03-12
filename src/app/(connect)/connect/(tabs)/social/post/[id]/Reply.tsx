import React from "react";
import { ReplyType } from "./Replies";
import { months } from "../../../../../../../../config/calendar";

const Reply = ({ contents }: { contents: ReplyType }) => {
  const time = new Date(contents.created_at);
  return (
    <main className="flex flex-row shadow-xl rounded-2xl">
      <ul
        className={`w-1 p-1 min-h-full ${
          contents.private ? "bg-teal-600" : "bg-orange-600"
        }  rounded-l-2xl`}
      />
      <ul className="p-3 bg-white w-full h-full rounded-r-2xl">
        <section className="flex flex-row justify-between">
          <h1 className="font-bold">{contents.creator.realname}</h1>
          <h2>
            {months[time.getMonth()]} {time.getDate()}, {time.getFullYear()} /{" "}
            {time.getHours()}:{time.getMinutes()}
          </h2>
        </section>
        <p className="text-slate-500">{contents.reply}</p>
      </ul>
    </main>
  );
};

export default Reply;
