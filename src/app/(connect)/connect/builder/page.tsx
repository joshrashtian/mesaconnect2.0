"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BuilderIndex } from ".";
import Studio from "./Studio";

const Page = () => {
  const [selected, setSelected] = useState<any>();
  const searchParams = useSearchParams()!;
  const id = searchParams.get("type");

  const Home = {
    postType: "Hub",
    onSelect: () => {
      return (
        <Studio
          setSelect={(e: any) => {
            setSelected(e);
          }}
        />
      );
    },
  };

  useEffect(() => {
    const useParams = () => {
      const found = BuilderIndex.find((e) => e.postType.toLowerCase() === id);

      if (!found) {
        setSelected(Home);
        return;
      }

      setSelected(found);
    };

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useParams();
  }, []);

  if (!selected) return null;
  return (
    <main className="w-full h-full pb-16 flex dark:invert gap-4 flex-col">
      <h1 className="text-4xl font-bold text-transparent bg-clip-text inline-block bg-gradient-to-tr from-orange-700 to-black font-eudoxus ">
        MESA Studio
      </h1>
      <section className="flex flex-row gap-3 w-full min-h-full">
        <nav className="w-1/6 max-w-40 flex gap-10 flex-col bg-zinc-50  rounded-2xl text-center p-2 justify-between items-center">
          <section className="flex gap-3 flex-col">
            <ul
              onClick={() => {
                setSelected(Home);
              }}
              className={`w-full p-3 flex justify-center ${
                selected === "Home" ? " text-white" : ""
              } duration-300 hover:bg-orange-500  hover:text-white cursor-pointer rounded-2xl `}
            >
              <h1 className="font-semibold font-eudoxus text-center text-xl">
                Home
              </h1>
            </ul>
            <h1 className="font-bold text-xl text-orange-800 font-eudoxus border-y-2 border-orange-900 border-double p-1">
              Posts
            </h1>
            {BuilderIndex.map((e, index) => {
              if (e.class === 0)
                return (
                  <ul
                    onClick={() => {
                      setSelected(e);
                    }}
                    key={index}
                    className={`w-full p-3 flex justify-center ${
                      selected.postType === e.postType
                        ? "bg-orange-600  text-white"
                        : ""
                    } duration-300 hover:bg-orange-500 flex flex-row items-center gap-3 hover:text-white cursor-pointer rounded-2xl `}
                  >
                    {e.icon && <e.icon size={16} />}
                    <h1 className="font-semibold font-eudoxus text-center text-xl">
                      {e.postType}
                    </h1>
                  </ul>
                );
            })}
            <h1 className="font-bold text-xl text-orange-800 font-eudoxus border-y-2 border-orange-900 border-double p-1">
              Profile Studio
            </h1>
            {BuilderIndex.map((e, index) => {
              if (e.class === 1)
                return (
                  <ul
                    onClick={() => {
                      setSelected(e);
                    }}
                    key={index}
                    className={`w-full p-3 flex justify-center ${
                      selected.postType === e.postType
                        ? "bg-orange-600 text-white"
                        : ""
                    } duration-300 hover:bg-orange-500 flex flex-row items-center gap-3 hover:text-white cursor-pointer rounded-2xl `}
                  >
                    {e.icon && <e.icon size={20} />}
                    <h1 className="font-semibold font-eudoxus text-center text-xl">
                      {e.postType}
                    </h1>
                  </ul>
                );
            })}
          </section>
        </nav>

        <div className="bg-white rounded-3xl p-10 overflow-y-scroll no-scrollbar w-full h-full">
          <selected.onSelect />
        </div>
      </section>
    </main>
  );
};

export default Page;
