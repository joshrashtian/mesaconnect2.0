import { useUser } from "@/app/AuthContext";
import { supabase } from "../../../../../../config/mesa-config";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { IoExpand, IoList } from "react-icons/io5";
import Link from "next/link";

const CollegeTop = () => {
  const [college, setCollege] = useState<any>(null);
  const [image, setImage] = useState<any>(null);
  const { user, userData } = useUser();
  useEffect(() => {
    async function getCollege() {
      const { data: imageData, error: imageError } = await supabase.storage
        .from(`college`)
        .download(`${userData?.college || ""}/image.png`);

      if (imageError) {
        console.error(imageError);
      } else {
        const fr = new FileReader();
        fr.readAsDataURL(imageData);
        fr.onload = () => {
          setImage(fr.result as string);
        };
      }

      const { data: collegeData, error } = await supabase
        .from("colleges")
        .select("*")
        .eq("id", userData?.college || "")
        .single();
      if (error) {
        console.log(error);
      }
      setCollege(collegeData);
    }
    getCollege();
  }, [userData?.college]);

  if (!college) return <div>Loading...</div>;
  return (
    <div className="flex flex-col gap-2 rounded-3xl bg-zinc-200/40 p-5">
      {image && (
        <Image
          src={image}
          alt={college?.name}
          width={400}
          height={400}
          className="rounded-3xl"
        />
      )}

      <div className="flex flex-col gap-2">
        <div>
          <h2 className="text-xl font-bold text-gray-500">Your College</h2>
          <h1 className="text-4xl font-black">{college?.id}</h1>
        </div>
        <p className="text-sm text-gray-500">
          {college?.location?.address}, {college?.location?.room}
        </p>
        <div className="flex flex-row items-center gap-2">
          <Link
            href={college?.website}
            className="flex flex-row items-center gap-2 rounded-full bg-orange-500 px-4 py-2 text-white"
          >
            <IoExpand />
            <p>View College</p>
          </Link>
          <Link
            href={college?.mesa_website}
            className="flex flex-row items-center gap-2 rounded-full bg-orange-500 px-4 py-2 text-white"
          >
            <IoExpand />
            <p>View MESA Website</p>
          </Link>
        </div>
      </div>
      <div className="flex flex-row items-center gap-2">
        <Link
          href={`/connect/classes?college=${college?.id}`}
          className="flex flex-col items-start rounded-xl bg-white p-5 text-black shadow-md transition-all duration-300 hover:bg-orange-500 hover:text-white"
        >
          <IoList size={30} />
          <p className="text-lg font-bold">View Classes</p>
        </Link>
      </div>
    </div>
  );
};

export default CollegeTop;
