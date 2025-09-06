import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  // CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import ChooseCountry from "@/app/AppComponents/CountrySelect/ChooseCountry";

export default function SignUpPage() {
  return (
    <>
      <section className="py-34 px-5">
        <Card className="w-full max-w-lg mx-auto shadow-lg shadow-stone-700 ">
          <CardHeader>
            <CardTitle className="text-stone-900 text-center">
              Create Account
            </CardTitle>
            {/* <CardDescription className="text-stone-600 text-center">
              Enter your email below to login to your account
            </CardDescription> */}
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label className="text-stone-900" htmlFor="fullName">
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="your name"
                    required
                  />
                </div>
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
                  <Label className="text-stone-900" htmlFor="password">
                    Password
                  </Label>
                  <Input id="password" type="password" required />
                </div>
                <div className="grid gap-2">
                  <Label className="text-stone-900" htmlFor="rePassword">
                    RePassword
                  </Label>
                  <Input id="rePassword" type="password" required />
                </div>
                <div className="grid gap-2">
                  <Label className="text-stone-900" htmlFor="phone">
                    Phone Number
                  </Label>
                  <Input id="phone" placeholder="phone" type="tel" required />
                </div>
                <div className="grid gap-2">
                  <Label className="text-stone-900" htmlFor="phone">
                    Select Country
                  </Label>
                  <ChooseCountry />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button
              type="submit"
              className="w-full cursor-pointer bg-stone-900 transition-all duration-300 hover:bg-stone-700"
            >
              Sign Up
            </Button>

            <CardAction className="py-4 mx-auto">
              Have An Account ?{" "}
              <Link
                className="text-blue-950 underline-offset-4 transition-all duration-300 hover:underline"
                href={"/login"}
              >
                Login
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
