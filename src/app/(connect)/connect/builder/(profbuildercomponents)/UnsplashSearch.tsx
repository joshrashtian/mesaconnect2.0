"use client";
import React, { useEffect, useRef, useState } from "react";
import { getJSONRandom } from "./UnsplashServerSide";
import Image from "next/image";

const UnsplashSearch = () => {
  const imageRef: any = useRef();
  const [images, setImages] = useState<any[]>();

  const fetchImages = async () => {
    let data = await fetch(
      `https://api.unsplash.com/search/collections?page=1&query=office`
    );
  };

  const random = async () => {
    const randomImages = await getJSONRandom();
    setImages(randomImages);
  };

  useEffect(() => {
    random();
  }, []);

  return (
    <main className=" font-bold text-2xl w-full">
      <h1>Adding a Picture to your Event</h1>

      <section className="w-full h-24">
        <button
          onClick={() => imageRef.current.click()}
          className="w-full h-full duration-300 bg-orange-300 hover:bg-slate-200 "
        >
          Custom
        </button>
        {images?.map((e) => {
          console.log(e.urls);
          return (
            <section className="w-full h-24 ">
              <Image src={e.urls.regular} fill={true} alt={e.alt_description} />
            </section>
          );
        })}
      </section>
      <input type="file" ref={imageRef} hidden />
    </main>
  );
};

export default UnsplashSearch;
