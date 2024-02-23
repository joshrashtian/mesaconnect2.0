"use client";

import { MenuContext } from "@/app/(connect)/InfoContext";
import { useContext, useMemo, useState } from "react";
import { ChangeSections } from "./ChangeIndex";
import { userContext } from "@/app/AuthContext";

export type ProjectLinks = {
  name: string;
  link: string;
  website: {
    name: string;
    icon: string;
  };
};

const webOptions = [
  {
    name: "GitHub",
    icon: "https://banner2.cleanpng.com/20180326/gxq/kisspng-github-computer-icons-icon-design-github-5ab8a31e334e73.4114704215220498222102.jpg",
  },
  {
    name: "Custom",
    icon: "",
  },
];

const Projects = () => {
  const [links, setLinks] = useState<ProjectLinks[]>([]);
  const [json, setJson] = useState<any>([]);

  const toast = useContext<any>(MenuContext);
  const user = useContext<any>(userContext);

  useMemo(() => {
    setJson({
      type: "links",
      contents: links.map((link) => ({
        name: link.name,
        link: link.link,
        website: link.website,
      })),
    });
    console.log(json);
  }, [links]);

  const upload = () => {
    if (!json || json.contents.length === 0) {
      toast.toast("No Skills Exist!", "Error");
      return;
    }

    let error;

    links.map((e, i) => {
      if (!e.name || !e.link || !e.website) {
        toast.toast("Please fill in all fields!", "Error");
        error = true;
      }
    });

    if (error) return;

    ChangeSections(user.userData, "projects", json);
    console.log("Reached");
  };

  return (
    <main className="flex flex-col gap-4">
      {links.map((link, i) => (
        <section className="bg-zinc-100 shadow-md flex flex-col p-4 justify-center rounded-2xl gap-2">
          <h1 className="font-bold text-2xl">Link #{i}</h1>
          <ul className="flex flex-row justify-between">
            <h1>
              {link.name} | {link.link} | {link.website?.name}
            </h1>
            <button
              onClick={() => {
                setLinks(links.filter((_, index) => index !== i));
              }}
            >
              <h1>x</h1>
            </button>
          </ul>
          <input
            type="text"
            className="p-2 px-5  rounded-full"
            placeholder="Name"
            onChange={(e) => {
              setLinks(
                links.map((link, index) => {
                  if (index === i) {
                    return {
                      ...link,
                      name: e.target.value,
                    };
                  }
                  return link;
                })
              );
            }}
          />
          <input
            type="text"
            className="p-2 px-5 rounded-full"
            placeholder="Link"
            onChange={(e) => {
              setLinks(
                links.map((link, index) => {
                  if (index === i) {
                    return {
                      ...link,
                      link: e.target.value,
                    };
                  }
                  return link;
                })
              );
            }}
          />
          <div className="flex flex-row gap-3 justify-center">
            {webOptions.map((e) => (
              <button
                className="bg-white p-2 px-3 rounded-full"
                onClick={() => {
                  setLinks(
                    links.map((link, index) => {
                      if (index === i) {
                        return {
                          ...link,
                          website: e,
                        };
                      }
                      return link;
                    })
                  );
                }}
              >
                <h1>{e.name}</h1>
              </button>
            ))}
          </div>
        </section>
      ))}
      <button
        onClick={() => {
          setLinks([
            ...links,
            { name: undefined, link: undefined, website: undefined },
          ]);
        }}
        className="w-full border-2 border-opacity-40 border-dashed rounded-full p-3"
      >
        <h1 className="font-mono text-zinc-500 text-xl">Create New Link</h1>
      </button>

      <button
        onClick={() => {
          upload();
        }}
      >
        <h1>Save</h1>
      </button>
    </main>
  );
};

export default Projects;
