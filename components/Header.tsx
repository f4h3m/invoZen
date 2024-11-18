import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@/public/logo.svg";

export default function Header() {
  return (
    <header className="py-20 bg-black">
      <div className="container mx-auto">
        <h1 className="text-white text-4xl font-semibold">
          <Link href="/" className="flex items-center">
            <Image className="mr-2" src={logo} alt="logo" /> | Free Invoice
            Generator
          </Link>
        </h1>
      </div>
    </header>
  );
}
