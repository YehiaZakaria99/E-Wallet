import React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function LoginPage() {
  return (
    <>
      <section className="py-36 px-5">
        <Card className="w-full max-w-sm mx-auto shadow-lg shadow-stone-700 ">
          <CardHeader>
            <CardTitle className="text-stone-900 text-center">
              Login to your account
            </CardTitle>
            {/* <CardDescription className="text-stone-600 text-center">
              Enter your email below to login to your account
            </CardDescription> */}
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label className="text-stone-900" htmlFor="email">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label className="text-stone-900" htmlFor="password">
                      Password
                    </Label>
                    <Link
                      href="#"
                      className=" text-blue-950 ml-auto inline-block text-sm underline-offset-4 transition-all duration-300 hover:underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <Input id="password" type="password" required />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button
              type="submit"
              className="w-full cursor-pointer bg-stone-900 transition-all duration-300 hover:bg-stone-700"
            >
              Login
            </Button>

            <CardAction className="py-4 mx-auto">
              Dont't Have An Account ?{" "}
              <Link
                className="text-blue-950 underline-offset-4 transition-all duration-300 hover:underline"
                href={"/signup"}
              >
                Sign Up
              </Link>
            </CardAction>
            {/* <Button variant="outline" className="w-full">
                Login with Google
              </Button> */}
          </CardFooter>
        </Card>
      </section>
    </>
  );
}
