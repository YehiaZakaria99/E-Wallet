import React from "react";

import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SignUpForm from "@/app/AppComponents/Auth/SignUpForm";


export default function SignUpPage() {
  return (
    <>
      <section className="py-34 px-5">
        <Card className="w-full max-w-lg mx-auto shadow-lg shadow-stone-700 ">
          <CardHeader>
            <CardTitle className="text-stone-900 text-center">
              Create Account
            </CardTitle>
          </CardHeader>
          <SignUpForm />

        </Card>
      </section>
    </>
  );
}
