"use client";
import React, { createContext, useState } from "react";
import { IoAdd, IoBuild } from "react-icons/io5";
import { InfoBlockType } from "@/app/(connect)/connect/(profiles)/profile/[id]/infoblocks";
import { Index } from "@/app/(connect)/connect/(profiles)/profile/boxTypes";
import { useModal } from "@/app/(connect)/connect/Modal";
import AddBlock from "./AddBlock";

const InfoBlockDashboard = ({
  Blocks,
}: {
  Blocks: InfoBlockType[] | undefined;
}) => {
  const [Active, setActive] = useState<any>();
  const { CreateModal } = useModal();
  const { setData } = useInfo();
  // @ts-ignore
  return (
    <React.Fragment>
      <main className="h-[410px] min-w-[110ch] max-w-[120ch] pb-10 font-eudoxus">
        <h1 className="text-4xl font-bold dark:text-slate-300">
          <IoBuild /> Infoblocks
        </h1>
        <section className="my-3 flex h-[90%] w-full flex-row bg-slate-200/20 p-2 dark:bg-zinc-600/70">
          <nav className="no-scrollbar flex w-72 flex-col gap-0.5 overflow-y-scroll p-2">
            {Blocks?.map((d, i: number) => {
              const block = Index.find(
                (e) => e?.title?.toLowerCase() === d.type.toLowerCase(),
              );

              if (!block) return null;

              return (
                <FormBlockButton
                  key={d.id}
                  onClick={() => {
                    setActive(block.create);
                    setData({ id: d.id, data: d.data, visible: d.visible });
                  }}
                  className="w-48 bg-white capitalize dark:bg-zinc-500/50"
                >
                  {block.icon}
                  {d.type}
                </FormBlockButton>
              );
            })}
          </nav>
          {Active && <section className="h-full w-full">{Active}</section>}
        </section>
        <ul className="flex w-full flex-row-reverse">
          <button
            onClick={() => {
              CreateModal(<AddBlock Blocks={Blocks} />);
            }}
            className="relative right-2 flex h-12 w-12 -translate-y-12 translate-x-4 items-center justify-center rounded-full bg-teal-700 p-1 text-white shadow-lg"
          >
            <IoAdd size={24} />
          </button>
        </ul>
      </main>
    </React.Fragment>
  );
};

// eslint-disable-next-line react/display-name
export const FormBlockButton = React.memo((props: any) => (
  <button
    {...props}
    className={`ring-offset-3 flex flex-row items-center justify-center gap-2 rounded-lg p-3 font-eudoxus text-xl ring-white delay-75 duration-500 hover:scale-105 hover:ring-1 hover:ring-amber-600 hover:drop-shadow-sm active:scale-95 active:ring-red-800 ${props.className}`}
  >
    {props.children}
  </button>
));

export default InfoBlockDashboard;

export const InfoContext = createContext<any>(null);
export const InfoProvide: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState();

  return (
    <InfoContext.Provider value={{ data, setData }}>
      {children}
    </InfoContext.Provider>
  );
};

export const useInfo = () => {
  let data = React.useContext(InfoContext);
  if (!data) {
    throw new Error("useInfo must be used within a InfoProvide");
  }

  return data;
};
