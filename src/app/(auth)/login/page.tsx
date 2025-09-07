import React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import SignInForm from "@/app/AppComponents/Auth/SignInForm";

export default function LoginPage() {
  return (
    <>
      <section className="py-36 px-5">
        <Card className="w-full max-w-sm mx-auto shadow-lg shadow-stone-700 ">
          <CardHeader>
            <CardTitle className="text-stone-900 text-center">
              Login to your account
            </CardTitle>
          </CardHeader>
          <SignInForm />
        </Card>
      </section>
    </>
  );
}
