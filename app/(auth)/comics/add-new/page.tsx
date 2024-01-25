"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCheck, Copy } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Header from "@/components/shared/Header";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Cookies from "js-cookie";
import { Axios } from "@/utils/AxiosConfig";
import { useEffect, useState } from "react";
import { GenreData } from "@/static/genre";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { ToastAction } from "@/components/ui/toast";

// Zod schema for form validation
const formSchema = z.object({
  comicTitle: z.string({ required_error: "Comic Name must be provided" }),
  desc: z.string({ required_error: "Description must be provided" }),
  author: z.string(),
  artist: z.string(),
  status: z.enum(["ongoing", "completed", "dropped"], {
    required_error: "You need to select a notification type.",
  }),
  badge: z.enum(["HOT", "NEW", ""]),
  genres: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
  origin: z.string({ required_error: "Please the origin of the Comic" }),
  coverImage: z.any({ required_error: "Cover Image must be provided" }),
});

const AddNewComic = () => {
  const [image, setImage] = useState<File | undefined>(undefined);
  const [resLink, setResLink] = useState("");
  const [resMessage, setResMessage] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // initialize form with default values (default value is necessary for genres)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comicTitle: "",
      desc: "",
      author: "",
      artist: "",
      status: "ongoing",
      badge: "",
      coverImage: undefined,
      genres: [],
    },
  });

  // Submit function

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // Do something with the form values.

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });

    const token = Cookies.get("ds-admin-auth");

    try {
      const formData = new FormData(); // create new formdata

      // append the properties to formdata

      formData.append("comicTitle", data.comicTitle);
      formData.append("desc", data.desc);
      formData.append("author", data.author);
      formData.append("artist", data.artist);
      formData.append("status", data.status);
      formData.append("badge", data.badge);
      formData.append("genres", JSON.stringify(data.genres));
      formData.append("origin", data.origin);

      // if image then append the image to formData just for type issues just didn't want to use ts ignore

      if (image) {
        formData.append("coverImage", image);
      }

      // making a request to api using Axios

      const postComic = await Axios.post("/post-comic/add-new", formData, {
        headers: {
          "ds-admin-token": token,
        },
      });

      // check the response status

      if (postComic.status === 201) {
        // getting the data from postComic Variable

        const res: ComicPostResponse = await postComic.data;

        setResLink(res.link);
        setResMessage(res.message);

        return setDialogOpen(true);
      }
    } catch (error: any) {
      console.log(error.response.data.message);
      toast({
        variant: "destructive",
        title: error.response.data.message,
        description: "Maybe the comic Already Exists in database",
        action: <ToastAction altText="close">Close</ToastAction>,
      });
    }
  };

  // handle copy click

  const handleCopyClick = () => {
    // Create a temporary textarea element
    const textArea = document.createElement("textarea");
    textArea.value = resLink;

    // Append the textarea to the DOM
    document.body.appendChild(textArea);

    // Select the text inside the textarea
    textArea.select();
    document.execCommand("copy");

    // Remove the textarea from the DOM
    document.body.removeChild(textArea);

    // Update state to indicate that the content is copied
    setIsCopied(true);

    // Reset the copied state after a short delay
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <>
      <Header title="Add New Comic" />
      <div className="max-w-[750px] mt-5 mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Comic Name */}

            <FormField
              control={form.control}
              name="comicTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comic Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Comic Name" {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Comic Desc */}

            <FormField
              control={form.control}
              name="desc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Description" {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* author and artist */}

            <div className="flex justify-between gap-x-3">
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="author"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Author</FormLabel>
                      <FormControl>
                        <Input placeholder="Author" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="artist"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Artist</FormLabel>
                      <FormControl>
                        <Input placeholder="Artist" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex gap-x-28">
              {/* Status */}

              <div>
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="ongoing" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Ongoing
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="completed" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Completed
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="dropped" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Dropped
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Badges */}

              <div>
                <FormField
                  control={form.control}
                  name="badge"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Badge</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="HOT" />
                            </FormControl>
                            <FormLabel className="font-normal">HOT</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="NEW" />
                            </FormControl>
                            <FormLabel className="font-normal">NEW</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="" />
                            </FormControl>
                            <FormLabel className="font-normal">None</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Genres */}

            <div>
              <FormField
                control={form.control}
                name="genres"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">Genres</FormLabel>
                    </div>
                    <div className="flex items-center space-x-3">
                      {GenreData?.map((genre) => (
                        <FormField
                          key={genre.id}
                          control={form.control}
                          name="genres"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={genre.id}
                                className="flex space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(genre.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...field.value,
                                            genre.id,
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== genre.id
                                            )
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {genre.label}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                  </FormItem>
                )}
              />
            </div>

            {/* Cover Image and Origin */}

            <div className="grid w-full items-center grid-cols-2 gap-4">
              {/* Cover Image */}

              <FormField
                control={form.control}
                name="coverImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="coverImage">Cover Image</FormLabel>
                    <FormControl>
                      <Input
                        id="coverImage"
                        type="file"
                        accept="image/*"
                        {...field}
                        required
                        onChange={(e) => {
                          const selectedFile = e.target.files?.[0];
                          if (selectedFile) {
                            setImage(selectedFile);
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Origin */}

              <FormField
                control={form.control}
                name="origin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select the Origin" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Korea">Korea</SelectItem>
                        <SelectItem value="China">China</SelectItem>
                        <SelectItem value="Japan">Japan</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </Form>

        {/* The popup file */}

        <Dialog open={dialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{resMessage}</DialogTitle>
              <DialogDescription>
                Anyone who has this link will be able to view this.
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="link" className="sr-only">
                  Link
                </Label>
                <Input id="link" defaultValue={resLink} readOnly />
              </div>
              <Button
                type="submit"
                size="sm"
                className="px-3"
                onClick={handleCopyClick}
              >
                <span className="sr-only">Copy</span>
                {isCopied ? (
                  <CheckCheck className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setDialogOpen(!dialogOpen)}
                >
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default AddNewComic;
