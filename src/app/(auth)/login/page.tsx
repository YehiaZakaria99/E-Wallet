import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SignInForm from "@/app/_AppComponents/Auth/SignInForm";
import { redirect } from "next/navigation";
import { loggedUser } from "@/app/_AppComponents/Guard/loggedUser";

export default async function LoginPage() {

  const isLoggedUser = await loggedUser();
  if (isLoggedUser) {
    redirect("/dashboard");
  }
  return (
    <>
      <section className="py-36 px-5">
        <Card className="w-full max-w-sm mx-auto shadow-lg shadow-stone-700 ">
          <CardHeader>
            <CardTitle className="text-blue-950 text-center">
              Login to your account
            </CardTitle>
          </CardHeader>
          <SignInForm />
        </Card>
      </section>
    </>
  );
}
