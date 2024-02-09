"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import * as z from "zod";
import Cookies from "js-cookie";

// import from local

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { RootState } from "@/store/store";
import { setChapterModalOpen } from "@/slices/chapterSlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { toast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";

// form schema

const FormSchema = z.object({
  chapterNumber: z.string({
    required_error: "Chapter Number can't be empty",
  }),
  chapterName: z.string(),
  pages: z.any({ required_error: "Chapter images are required" }),
});

const Modal = ({
  comicID,
  comicTitle,
}: {
  comicID: string;
  comicTitle: string;
}) => {
  const [pages, setPages] = useState<File | null>(null); // state to store the chapter pages
  const [progress, setProgress] = useState<boolean>(false); // to show indicatior while uploading to backend
  const [successLink, setSuccessLink] = useState<string | null>(null); // after successfully uploading use this state to show the link to new chapter

  const open = useSelector((state: RootState) => state.chapter.open); // get state from redux

  const params = useParams()["comic-name"]; // get param

  const dispatch = useDispatch(); // initiate dispatch

  // handle toggle
  const handleToggle = () => {
    setPages(null);
    setProgress(false);
    setSuccessLink(null);
    return dispatch(setChapterModalOpen());
  };

  // initiate form validation with zod and react-hook-forms

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      chapterName: "",
      chapterNumber: "",
    },
  });

  // submit function

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    // get the authToken

    const token = Cookies.get("ds-admin-auth");

    if (!token) {
      return toast({
        variant: "destructive",
        title: "Unauthorised",
        description: "No authorization token present",
        action: <ToastAction altText="close">Close</ToastAction>,
      });
    }

    // toast the data submitted

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });

    // try catch block

    try {
      const formData = new FormData(); // create new formdata

      // append the necessary data to formData

      formData.append("comicTitle", comicTitle); // append comicTitle received through props
      formData.append("comicID", comicID); // append comicID received through props
      formData.append("chapterNumber", JSON.parse(data.chapterNumber)); // append the chapterNumber as a number

      // check if there are pages

      if (pages) {
        formData.append("pages", pages);
      }

      // make a request to backend using axios
    } catch (error: any) {
      console.log(error);

      toast({
        variant: "destructive",
        title: "Error while uploading the chapter",
        description: error.response.data.message,
        action: <ToastAction altText="close">Close</ToastAction>,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleToggle}>
      <DialogContent className="sm:max-w-[800px] dark:bg-black bg-zinc-300">
        <DialogHeader>
          <DialogTitle>
            <p className="text-center">Add new chapter</p>
          </DialogTitle>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-2/3 space-y-6 mx-auto"
            >
              {/* Chapter number */}
              <FormField
                control={form.control}
                name="chapterNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chapter Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="eg: 100"
                        type="number"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Chapter number */}

              <FormField
                control={form.control}
                name="chapterName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chapter Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="eg: Begining of destruction"
                        type="text"
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Chapter pages */}

              <FormField
                control={form.control}
                name="pages"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chapter Name</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="application/octet-stream,application/zip,application/x-zip,application/x-zip-compressed"
                        required
                        {...field}
                        onChange={(e) => {
                          const selectedFile = e.target.files?.[0];
                          if (selectedFile) {
                            setPages(selectedFile);
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">Submit</Button>
                <Button variant="secondary" onClick={handleToggle}>
                  Close
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
