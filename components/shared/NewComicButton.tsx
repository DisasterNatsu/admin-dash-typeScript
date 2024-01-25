import Link from "next/link";
import React from "react";

const NewComicButton = ({ title }: { title: string }) => {
  return (
    <Link
      href="/comics/add-new"
      className="dark:bg-slate-500 dark:text-black text-white bg-slate-800 px-4 py-2 rounded-md hover:scale-110 duration-300 font-semibold"
    >
      <p>{title}</p>
    </Link>
  );
};

export default NewComicButton;
