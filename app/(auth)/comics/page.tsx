import Header from "@/components/shared/Header";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaRegEdit } from "react-icons/fa";
import { Axios } from "@/utils/AxiosConfig";
import NewComicButton from "@/components/shared/NewComicButton";

const comics = [
  {
    title: "Comic 1",
    genre: "Action",
    status: "Active",
  },
  // Add other comics as needed
];

async function getData() {
  try {
    const res = await Axios.get("/comics/all");

    if (!res.data.ok) {
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
  const data = await getData();

  return (
    <main>
      <Header title="Comics" />
      <div>
        {data ? (
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
              {comics.map((comic) => (
                <TableRow key={comic.title} className="cursor-pointer">
                  <TableCell className="font-medium w-[200px] line-clamp-1">
                    {comic.title}
                  </TableCell>
                  <TableCell>{comic.genre}</TableCell>
                  <TableCell>{comic.status}</TableCell>
                  <TableCell className="flex justify-end">
                    {/* Replace Link with an interactive element like a button */}
                    <FaRegEdit />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="w-full flex p-5 mt-5 items-center justify-center flex-col gap-y-5">
            <h1>No Comics Found</h1>
            <NewComicButton title="Add New" />
          </div>
        )}
      </div>
    </main>
  );
};

export default Comics;
