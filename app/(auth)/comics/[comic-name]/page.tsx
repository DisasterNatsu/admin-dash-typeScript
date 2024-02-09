import CardWithDesc from "@/components/comic-details/CardWithDesc";
import Header from "@/components/shared/Header";
import Modal from "@/components/shared/Modal";
import { Axios } from "@/utils/AxiosConfig";
import { usePathname } from "next/navigation";
import React from "react";

const getData = async (url: string) => {
  const chapters = await Axios.get(`/get-chapters/all/${url}`); // chapters

  if (chapters.status === 200) {
    return chapters.data;
  }

  return null;
};

const ChapterPage = async ({
  params,
}: {
  params: { "comic-name": string };
}) => {
  const url = params["comic-name"];

  const data: ChapterResponse = await getData(url);

  // extract the data from the response

  const comicTitle = data.comicDetails.ComicTitle;
  const CoverImage = data.comicDetails.CoverImage;
  const Description = data.comicDetails.Description;
  const id = data.comicDetails.id;

  return (
    <div>
      <Header title={comicTitle} />
      <main className="px-3 pt-2">
        <div>
          <CardWithDesc
            ComicTitle={comicTitle}
            CoverImage={CoverImage}
            Description={Description}
            id={id}
          />
          <Modal comicID={id} comicTitle={comicTitle} />
        </div>
      </main>
    </div>
  );
};

export default ChapterPage;
