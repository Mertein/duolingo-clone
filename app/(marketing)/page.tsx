import Image from "next/image";
import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MarketingPage() {
  return (
    <div className="max-w-[988px] mx-auto flex-1 w-full flex flex-col lg:flex-row items-center justify-center p-4 gap-2 h-full">
      <div className="relative w-[240px] h-[240px] lg:w-[424px] lg:h-[424px] mb-8 lg:mb-0">
        <Image src="/sample.png" fill alt="Hero" />
      </div>
      <div className="flex flex-col items-center gap-y-8 ">
        <h1 className="text-xl lg:text-3xl font-medium text-neutral-600 max-w-[480px] text-center">
          Learn, practice, and master new languages with Lingo.
        </h1>
        <ClerkLoading>
          <Loader className="h-w w-5 animate-spin" />
        </ClerkLoading>
        <ClerkLoaded>
          <SignedOut>
            <SignUpButton
              mode="modal"
              fallbackRedirectUrl="/learn"
              signInForceRedirectUrl="/learn"
            >
              <Button variant="secondary" size="lg" className="w-full">
                Get Started
              </Button>
            </SignUpButton>
            <SignInButton
              mode="modal"
              fallbackRedirectUrl="/learn"
              signUpForceRedirectUrl="/learn"
            >
              <Button variant="primaryOutline" size="lg" className="w-full">
                I already have an account
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Button asChild variant="secondary" size="lg">
              <Link href="/learn">Continue Learning</Link>
            </Button>
          </SignedIn>
        </ClerkLoaded>
      </div>
    </div>
  );
}
