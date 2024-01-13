"use client";
import Link from "next/link";
import { SlimLayout } from "./SlimLayout";
import { Button } from "./Button";
import { Logo } from "./Logo";

export const Building = () => {
  return (
    <SlimLayout>
      <div className="flex">
        <Link href="/" aria-label="Home">
          <Logo className="h-10 w-auto" />
        </Link>
      </div>
      {/* <p className="mt-20 text-sm font-medium text-gray-700">404</p> */}
      <h1 className="mt-3 text-lg font-semibold text-gray-900">
        Page under construction
      </h1>
      <p className="mt-3 text-sm text-gray-700">
        This page is currently under construction. Please check back later.
      </p>
      <Button
        href="/"
        className="mt-10"
        blank={false}
        onClick={() => history.back()}
      >
        Go back home
      </Button>
    </SlimLayout>
  );
};
