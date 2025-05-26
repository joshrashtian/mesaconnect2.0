"use client";
import React, { useEffect, useRef, useState } from "react";
import { getJSONRandom, getJSONSearch } from "./UnsplashServerSide";
import Image from "next/image";

const UnsplashSearch = ({ updateImage }: { updateImage: (e: any) => void }) => {
  const imageRef: any = useRef();
  const [selectedImage, setSelectedImage] = useState();
  const [type, setType] = useState();
  const [images, setImages] = useState<any>();
  const inputRef: any = useRef();

  const fetchImages = async () => {
    let json = await getJSONSearch(inputRef.current.value);
    setImages(json.results);
  };

  const random = async () => {
    const randomImages = await getJSONRandom();
    setImages(randomImages);
  };

  useEffect(() => {
    random();
  }, []);

  return (
    <main className="w-full">
      <h1 className="text-2xl font-bold">Adding a Picture to your Event</h1>

      <section className="flex h-44 w-full flex-row">
        <button
          onClick={() => imageRef.current.click()}
          className="h-full w-full bg-orange-300 duration-300 hover:bg-slate-200"
        >
          Custom
        </button>
        {images &&
          !images?.errors &&
          Array.isArray(images) &&
          images?.map((e: any) => {
            return (
              <article key={e.id} className="group flex h-full w-full flex-col">
                <button
                  onClick={() => {
                    setSelectedImage(e);
                    //@ts-ignore
                    setType("unsplash");
                    updateImage({
                      url: e.urls.regular,
                      creator: e.user.name,
                    });
                  }}
                  className={`relative flex h-full w-full flex-col justify-between`}
                >
                  <Image
                    src={e.urls.regular}
                    objectFit="cover"
                    loading="lazy"
                    fill={true}
                    alt={e.alt_description}
                  />
                  <div
                    className={`relative h-full w-full bg-black opacity-0 duration-300 group-hover:opacity-25 ${
                      e === selectedImage && "bg-green-400 opacity-30"
                    }`}
                  />
                  <h1
                    className={`relative bg-white p-1 text-right font-eudoxus text-sm opacity-0 duration-300 group-hover:opacity-100 ${
                      e === selectedImage && "opacity-100"
                    }`}
                  >
                    Image from Unsplash / Photo by {e.user.name}
                  </h1>
                </button>{" "}
              </article>
            );
          })}
      </section>
      <input type="file" ref={imageRef} hidden />
      <section className="flex h-12 w-full flex-row rounded-b-xl bg-white shadow-lg">
        <input
          placeholder="Search Unsplash..."
          className="h-full w-full rounded-b-xl px-5 font-geist"
          ref={inputRef}
          contentEditable
        />
        <button
          onClick={() => {
            fetchImages();
          }}
          className={`h-full w-24 rounded-br-xl bg-slate-200 duration-700 hover:bg-slate-500 hover:text-white`}
        >
          Search
        </button>
      </section>
    </main>
  );
};

export default UnsplashSearch;
