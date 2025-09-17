import React from "react";

import {
  Card,
  CardAction,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SignUpForm from "@/app/AppComponents/Auth/SignUpForm/SignUpForm";
import Link from "next/link";


export default function SignUpPage() {
  return (
    <>
      <section className="py-34 px-5">
        <Card className="w-full max-w-lg mx-auto shadow-lg shadow-stone-700 ">

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
