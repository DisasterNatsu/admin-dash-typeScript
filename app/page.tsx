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
import { Input } from "@/components/ui/input";
import { Axios } from "@/utils/AxiosConfig";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/components/shared/hooks/useAuth";
import { useEffect } from "react";

interface Response {
  authToken: string;
  email: string;
  UserName: string;
}

const FormSchema = z.object({
  email: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(5, {
    message: "Password must be at least 5 characters.",
  }),
});

const LongInPage = () => {
  // initialize the form using useForm

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // define router

  const Router = useRouter();
  const { toast } = useToast();

  // see if token in there and authenticated

  const isLoggedIn = async () => {
    // calling use auth

    const isAuth = await useAuth();

    if (isAuth.verified) {
      return Router.push("/dashboard");
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  // on submit function

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    // try catch block

    try {
      // sending the login request
      const logInRequest = await Axios.post("admin/sign-in", data);

      if (logInRequest.status === 200) {
        // getting response

        const response: Response = await logInRequest.data;

        // Dispatch the setAuthToken action to update the Redux store

        Cookies.set("ds-admin-auth", response.authToken);

        Router.replace("/dashboard");
      }
    } catch (error: any) {
      // Use the error message directly, instead of the 'err' state
      toast({
        variant: "destructive",
        title: error.response.data.message,
        description: "Email or Password is incorrect",
        action: <ToastAction altText="close">Close</ToastAction>,
      });
    }
  };

  return (
    <main className="w-screen h-screen bg-gradient-to-t from-slate-700 via-slate-700 to-slate-900 flex items-center">
      <div className="m-auto max-w-5xl flex justify-center h-[500px] w-[700px] text-white rounded-lg items-center bg-gradient-to-b from-slate-700 via-slate-300 to-slate-700">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="md:w-[400px] w-full space-y-6 flex flex-col justify-center"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email"
                      {...field}
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Password"
                      {...field}
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="hover:bg-slate-400 hover:text-black font-sans text-xl font-semibold"
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
};

export default LongInPage;
