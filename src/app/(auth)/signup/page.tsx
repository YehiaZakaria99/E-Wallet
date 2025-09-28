import React from "react";

import {
  Card,
  CardAction,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SignUpForm from "@/app/_AppComponents/Auth/SignUpForm/SignUpForm";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { loggedUser } from "@/app/_AppComponents/Guard/loggedUser";


export default async function SignUpPage() {
  const isLoggedUser = await loggedUser();
  if (isLoggedUser) {
    redirect("/dashboard");
  }

  return (
    <>
      <section className="py-34 px-5">
        <Card className="w-full max-w-lg mx-auto shadow-lg shadow-stone-700 ">
          <CardHeader>
            <CardTitle className="text-blue-950 text-center">
              Create account
            </CardTitle>
          </CardHeader>

          <SignUpForm />

          <CardAction className="py-1 mx-auto">
            Have An Account ?{" "}
            <Link
              className="text-blue-950 underline-offset-4 transition-all duration-300 hover:underline"
              href={"/login"}
            >
              Login
            </Link>
          </CardAction>

        </Card>
      </section>
    </>
  );
}
