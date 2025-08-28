"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BuilderIndex } from ".";
import Studio from "./Studio";

const Page = () => {
  type BuilderItem = {
    postType: string;
    onSelect: () => JSX.Element;
    class?: number;
    icon?: any;
  };
  const [selected, setSelected] = useState<BuilderItem>();
  const [query, setQuery] = useState("");
  const searchParams = useSearchParams()!;
  const id = searchParams.get("type");

  // no-op placeholder; Home item created inline where needed

  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const found = BuilderIndex.find(
      (e) => e.postType.toLowerCase() === (id ?? "").toLowerCase(),
    );
    const homeItem: BuilderItem = {
      postType: "Hub",
      onSelect: () => (
        <Studio
          setSelect={(e: BuilderItem) => {
            setSelected(e);
          }}
        />
      ),
    };
    setSelected(found ?? homeItem);
  }, [id]);

  useEffect(() => {
    contentRef.current?.focus();
  }, [selected]);

  if (!selected) return null;
  return (
    <main className="flex h-full w-full flex-col gap-4 pb-16">
      <a
        href="#builder-content"
        className="sr-only focus:not-sr-only focus:underline"
      >
        Skip to content
      </a>
      <h1 className="inline-block bg-gradient-to-tr from-orange-700 to-black bg-clip-text font-eudoxus text-4xl font-bold text-transparent">
        MESA Studio
      </h1>
      {/* Mobile selector for quick switching */}
      <div className="md:hidden">
        <label htmlFor="builder-mobile-select" className="sr-only">
          Choose a builder section
        </label>
        <select
          id="builder-mobile-select"
          className="w-full rounded-xl border border-zinc-300 p-3"
          value={selected.postType}
          onChange={(e) => {
            const value = e.target.value;
            if (value === "Hub") {
              setSelected({
                postType: "Hub",
                onSelect: () => (
                  <Studio
                    setSelect={(e: BuilderItem) => {
                      setSelected(e);
                    }}
                  />
                ),
              });
              return;
            }
            const found = BuilderIndex.find((i) => i.postType === value);
            if (found) setSelected(found as BuilderItem);
          }}
        >
          <option value="Hub">Home</option>
          <optgroup label="Posts">
            {BuilderIndex.filter((e) => e.class === 0).map((e) => (
              <option key={e.postType} value={e.postType}>
                {e.postType}
              </option>
            ))}
          </optgroup>
          <optgroup label="Profile Studio">
            {BuilderIndex.filter((e) => e.class === 1).map((e) => (
              <option key={e.postType} value={e.postType}>
                {e.postType}
              </option>
            ))}
          </optgroup>
        </select>
      </div>
      <nav
        className="hidden w-full rounded-2xl bg-zinc-50 p-2 md:block"
        aria-label="Builder sections"
      >
        <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap">
          <div className="w-64 flex-none">
            <label htmlFor="builder-search" className="sr-only">
              Search builder items
            </label>
            <input
              id="builder-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search…"
              className="w-full rounded-xl border border-zinc-300 p-2"
            />
          </div>
          <ul
            className="flex flex-none flex-row items-center gap-2"
            role="list"
          >
            <li className="flex-none">
              <button
                type="button"
                onClick={() =>
                  setSelected({
                    postType: "Hub",
                    onSelect: () => (
                      <Studio
                        setSelect={(e: BuilderItem) => {
                          setSelected(e);
                        }}
                      />
                    ),
                  })
                }
                aria-current={selected?.postType === "Hub" ? "page" : undefined}
                className={`shrink-0 rounded-2xl px-4 py-2 duration-300 hover:bg-orange-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 focus-visible:ring-offset-2 ${
                  selected?.postType === "Hub"
                    ? "bg-orange-600 text-white ring-1 ring-orange-700"
                    : ""
                }`}
              >
                <span className="text-center font-eudoxus text-sm font-semibold">
                  Home
                </span>
              </button>
            </li>
          </ul>
          <span className="mx-1 flex-none select-none text-sm font-semibold text-orange-800">
            Posts
          </span>
          <ul
            className="flex flex-none flex-row items-center gap-2"
            role="list"
          >
            {BuilderIndex.filter(
              (e) =>
                e.class === 0 &&
                e.postType.toLowerCase().includes(query.toLowerCase()),
            ).map((e) => (
              <li key={e.postType} className="flex-none">
                <button
                  type="button"
                  onClick={() => setSelected(e as BuilderItem)}
                  aria-current={
                    selected?.postType === e.postType ? "page" : undefined
                  }
                  className={`group shrink-0 rounded-2xl px-4 py-2 duration-300 hover:bg-orange-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 focus-visible:ring-offset-2 ${
                    selected?.postType === e.postType
                      ? "bg-orange-600 text-white ring-1 ring-orange-700"
                      : ""
                  }`}
                >
                  {e.icon && (
                    <e.icon size={16} aria-hidden="true" focusable="false" />
                  )}
                  <span className="text-center font-eudoxus text-sm font-semibold">
                    {e.postType}
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <span className="mx-1 flex-none select-none text-sm font-semibold text-orange-800">
            Profile Studio
          </span>
          <ul
            className="flex flex-none flex-row items-center gap-2"
            role="list"
          >
            {BuilderIndex.filter(
              (e) =>
                e.class === 1 &&
                e.postType.toLowerCase().includes(query.toLowerCase()),
            ).map((e) => (
              <li key={e.postType} className="flex-none">
                <button
                  type="button"
                  onClick={() => setSelected(e as BuilderItem)}
                  aria-current={
                    selected?.postType === e.postType ? "page" : undefined
                  }
                  className={`group shrink-0 rounded-2xl px-4 py-2 duration-300 hover:bg-orange-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 focus-visible:ring-offset-2 ${
                    selected?.postType === e.postType
                      ? "bg-orange-600 text-white ring-1 ring-orange-700"
                      : ""
                  }`}
                >
                  {e.icon && (
                    <e.icon size={20} aria-hidden="true" focusable="false" />
                  )}
                  <span className="text-center font-eudoxus text-sm font-semibold">
                    {e.postType}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <section className="flex min-h-full w-full flex-row gap-3">
        <div
          id="builder-content"
          ref={contentRef}
          role="region"
          aria-labelledby="builder-region-title"
          tabIndex={-1}
          className="h-full w-full overflow-y-auto rounded-3xl bg-white p-10"
        >
          <h2 id="builder-region-title" className="sr-only">
            {selected?.postType ?? "Home"}
          </h2>
          <selected.onSelect />
        </div>
      </section>
    </main>
  );
};

export default Page;
