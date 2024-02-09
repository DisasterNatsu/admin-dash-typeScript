"use client";

import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { setChapterModalOpen } from "@/slices/chapterSlice";

const CardWithDesc = ({
  ComicTitle,
  CoverImage,
  id,
  Description,
}: ComicDetailsProps) => {
  const dispatch = useDispatch();

  const handleToggle = () => {
    return dispatch(setChapterModalOpen());
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-start items-center dark:bg-zinc-800 bg-slate-300 shadow-lg p-5 justify-between space-x-3 max-w-[1920px] mx-auto rounded-md">
      {/* Change with dynamic image */}
      <Image
        src={"/cover.webp"}
        alt="Cover Image"
        width={300}
        height={400}
        className="w-[300px] h-[420px] object-cover"
        priority
      />
      <div className="flex flex-col sm:justify-between justify-center h-[26rem]">
        <div>
          <h1 className="text-2xl font-semibold mb-2 sm:text-left text-center">
            Description
          </h1>
          <p className="text-lg sm:text-left text-center">{Description}</p>
        </div>
        <div className="space-x-3">
          <Button className="font-semibold" variant="secondary">
            Edit details
          </Button>
          <Button className="font-semibold" onClick={handleToggle}>
            New chapter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CardWithDesc;
