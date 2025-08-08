"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { email, z } from "zod";
import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { CreateUser } from "../../actions/Signup";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
// form validation schema
const formSchema = z.object({
  email: email().refine((value) => value.length > 2, {
    message: "Email must be longer than 2 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 2 characters.",
  }),
  companyName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  phone: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  acceptTerms: z.boolean(),
});

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      companyName: "",
      phone: "",
    },
  });
  const onSubmit = async (data) => {
    console.log(data);
    setLoading(true);
    try {
      const res = await CreateUser(data);
      console.log(res);
      if (res?.ok) {
        setLoading(false);
        console.log("ok");
        toast.success(res?.message);
        router.push("/sign-in");
      } else {
        setLoading(false);
        console.log("error");
        toast.error(res?.message);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(res?.message);
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
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="phone" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
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
        <FormField
          control={form.control}
          name="acceptTerms"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <div className="flex items-center gap-2">
                <FormControl>
                  <Checkbox
                    className=""
                    {...field}
                    checked={field.value}
                    onCheckedChange={(value) => {
                      field.onChange(value);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  I agree to the Terms of Service and Privacy Policy.
                </FormDescription>
              </div>
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
