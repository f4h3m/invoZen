import React from "react";
import { Heart } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="text-center py-4">
      <p className="flex items-center justify-center font-normal">
        <span>Made with</span>
        <span className="px-2">
          <Heart size={16} className="text-red-500" />
        </span>
        <Link href="https://github.com/f4h3m/">F4H3M</Link>
      </p>
    </div>
  );
}
