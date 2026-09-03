"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

function Page() {
    return (
        <main className="overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] min-h-[100svh] bg-gray-50 dark:bg-[#0a0a0a] text-gray-800 dark:text-gray-300 pb-10 transition-colors duration-300">
            <Header pageTitle="social" />

            <div>
                <section className="pt-25 max-w-5xl mx-auto px-4 lg:px-0">
                    <div className="flex flex-col bg-white dark:bg-[#161618] border border-gray-200 dark:border-[#2d2d2d] rounded-md overflow-hidden shadow-xl dark:shadow-2xl transition-colors duration-300">

                        {/* Post Meta Header */}
                        <div className="bg-gray-100 dark:bg-[#1a1a1c] px-4 py-2 text-xs text-gray-500 dark:text-gray-500 border-b border-gray-200 dark:border-[#2d2d2d] flex justify-between items-center transition-colors duration-300">
                            <span>Social — links & profiles</span>
                            <span className="font-bold text-gray-600 dark:text-gray-400">#social</span>
                        </div>

                        <div className="p-6 md:p-8">
                            {/* Back button */}
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 text-sm text-slate-800 dark:text-slate-200 hover:text-slate-600 dark:hover:text-slate-400 transition-colors mb-6 font-medium"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back
                            </Link>

                            <p className="text-sm text-gray-500 dark:text-gray-400">Content coming soon.</p>
                        </div>

                    </div>
                </section>

                <Footer />
            </div>
        </main>
    );
}

export default Page;
