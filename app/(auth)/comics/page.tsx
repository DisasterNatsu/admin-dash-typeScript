import Header from "@/components/shared/Header";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaRegEdit } from "react-icons/fa";
import { Axios } from "@/utils/AxiosConfig";
import Link from "next/link";

async function getData() {
  try {
    const res = await Axios.get("/get-comics/all");

    if (!res.data) {
      // Handle error, for example, log and return a default response
      console.log("Failed to fetch data:", res.status, res.statusText);
      return { message: "No chapters found" };
    }

    // Access the data directly using res.data
    return res.data;
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      console.log(
        "Resource not found:",
        error.response.status,
        error.response.statusText
      );
      // Handle 404 error
      // You can return a default response or throw an error
      return false;
    }

    // Handle other errors
    console.error("An error occurred:", error);
    throw error;
  }
}

const Comics = async () => {
  const data: GetComicsType[] = await getData();

  return (
    <main>
      <Header title="Comics" />
      <div>
        {data && (
          <Table>
            <TableCaption>A list of all comics</TableCaption>
            <TableHeader>
              <TableRow className="cursor-default">
                <TableHead className="w-[200px]">Comic Title</TableHead>
                <TableHead>Genre</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Edit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.reverse().map((comic: GetComicsType) => {
                const showGenre = JSON.parse(comic.Genres).join(" ");

                const link = `/comics/${
                  comic.id
                }-${comic.ComicTitle.toLowerCase().split(" ").join("-")}`;

                console.log(link);

                return (
                  <TableRow key={comic.id} className="cursor-pointer">
                    <TableCell className="font-medium w-[200px] line-clamp-1">
                      {comic.ComicTitle}
                    </TableCell>
                    <TableCell>{showGenre}</TableCell>
                    <TableCell>{comic.Status}</TableCell>
                    <TableCell className="flex justify-end">
                      {/* Replace Link with an interactive element like a button */}
                      <Link href={link}>
                        <FaRegEdit />
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </div>
    </main>
  );
};

export default Comics;
