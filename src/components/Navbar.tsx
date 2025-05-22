"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex w-full h-1/12 border-b shadow-sm px-4 py-2">
      <div className="flex flex-row w-1/2">
        <Link href="/" className="text-xl font-bold">
          <span className="text-blue-600">PC</span>Builder
        </Link>
      </div>

      <div className="flex flex-row w-1/2 justify-end">
        <span>Configure your dream PC with AI assistance</span>
      </div>
    </nav>
  );
}
