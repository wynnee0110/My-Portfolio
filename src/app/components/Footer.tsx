"use client";

import { useRouter } from "next/navigation";


export default function Footer() {
  const router = useRouter();
  return (
    <footer className="w-full py-4 px-8 bg-black-900 text-gray-400 flex flex-col sm:flex-row items-center justify-between">
      <p className="text-sm">&copy; {new Date().getFullYear()} Wayne.Obial. All rights reserved.</p>
        <div className="flex space-x-4 mt-2 sm:mt-0">
            </div>
      </footer>
    );
}