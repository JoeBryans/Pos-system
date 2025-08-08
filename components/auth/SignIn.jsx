"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { email, set, z } from "zod";

import { Button } from "../../components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { signIn } from "next-auth/react";
import { Input } from "../../components/ui/input";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: email().refine((value) => value.length > 2, {
    message: "Email must be longer than 2 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 2 characters.",
  }),
});

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      // console.log(data);
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      console.log("res :", res);
      
      if (res?.ok) {
        setLoading(false);
        // console.log("ok");
        toast.success("ok : signed in successfully");
         router.push("/admin");
      } else {
        setLoading(false);
        toast.error("error : invalid credentials");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(" error : something went wrong");
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-[400px] shadow-md rounded-md p-8 dark:bg-gray-900 dark:border dark:border-gray-700 dark:shadow-gray-700/50"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="@Email" {...field} type={"email"} />
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
                <Input type="password" placeholder="password" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full bg-primary rounded-md py-2 px-4 text-sm  text-white shadow-sm hover:bg-primary/90 dark:text-gray-900 font-bold cursor-pointer"
        >
          Submit {loading && <Loader2 className={"ml-2 animate-spin"} />}
        </Button>
      </form>
    </Form>
  );
}
