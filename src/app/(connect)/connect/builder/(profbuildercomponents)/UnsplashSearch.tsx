"use client";
import React, {
  useEffect,
  useRef,
  useState,
} from "react";
import { getJSONRandom } from "./UnsplashServerSide";
import Image from "next/image";

const UnsplashSearch = ({ updateImage }: { updateImage: (e: any) => void }) => {
  const imageRef: any = useRef();
  const [selectedImage, setSelectedImage] = useState();
  const [type, setType] = useState();
  const [images, setImages] = useState<any[]>();
  const inputRef: any = useRef();

  const fetchImages = async () => {
    console.log("Fetching images ", inputRef.current.value);
    let data = await fetch(
      `https://api.unsplash.com/search/photos?client_id=TrAEUL7ymv6F-R8MPkbo5aGj68vq5EmfCIvf81MokyY&per_page=4&query=${inputRef.current.value}`
    );
    let json = await data.json();
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
    <main className="  w-full">
      <h1 className="font-bold text-2xl">Adding a Picture to your Event</h1>

      <section className="w-full h-44 flex flex-row">
        <button
          onClick={() => imageRef.current.click()}
          className="w-full h-full duration-300 bg-orange-300 hover:bg-slate-200 "
        >
          Custom
        </button>
        {images?.map((e) => {
          return (
            <article key={e.id} className="flex flex-col w-full group h-full">
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
                className={`w-full h-full relative flex flex-col justify-between`}
              >
                <Image
                  src={e.urls.regular}
                  objectFit="cover"
                  loading="lazy"
                  fill={true}
                  alt={e.alt_description}
                />
                <div
                  className={`opacity-0 w-full h-full relative duration-300 group-hover:opacity-25 bg-black ${
                    e === selectedImage && "opacity-30 bg-green-400"
                  }`}
                />
                <h1
                  className={`font-eudoxus relative bg-white duration-300 group-hover:opacity-100 opacity-0 p-1 text-right text-sm ${
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
      <section className="w-full flex flex-row h-12 bg-white shadow-lg rounded-b-xl">
        <input
          placeholder="Search Unsplash..."
          className="font-geist rounded-b-xl px-5 w-full h-full"
          ref={inputRef}
          contentEditable
        />
        <button
          onClick={() => {
            fetchImages();
          }}
          className={`bg-slate-200 hover:bg-slate-500 hover:text-white duration-700 rounded-br-xl w-24 h-full`}
        >
          Search
        </button>
      </section>
    </main>
  );
};

export default UnsplashSearch;
