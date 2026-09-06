"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import connect from "../data/connect.json";
import { FiGithub, FiLinkedin, FiMail, FiTwitter, FiFileText } from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";
import { IconType } from "react-icons";

const ICON_MAP: Record<string, IconType> = {
  github: FiGithub,
  leetcode: SiLeetcode,
  linkedin: FiLinkedin,
  email: FiMail,
  twitter: FiTwitter,
  cv: FiFileText,
};

function Page() {
  return (
    <main className="overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] min-h-[100svh] bg-gray-50 dark:bg-[#0a0a0a] text-gray-800 dark:text-gray-300 pb-10 transition-colors duration-300">
      <Header pageTitle="social & profiles" />

      <div>
        <section className="pt-24 max-w-5xl mx-auto px-4 lg:px-0">
          <div className="flex flex-col bg-white dark:bg-[#161618] border border-gray-200 dark:border-[#2d2d2d] rounded-2xl overflow-hidden shadow-xl dark:shadow-2xl transition-colors duration-300">
            {/* Post Meta Header */}
            <div className="bg-gray-100 dark:bg-[#1a1a1c] px-6 py-3 text-xs text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-[#2d2d2d] flex justify-between items-center transition-colors duration-300 font-mono">
              <span>Social Links & Profiles</span>
              <span className="font-bold text-gray-600 dark:text-gray-300">#social</span>
            </div>

            <div className="p-6 md:p-8 space-y-6">
              {/* Back button & Title */}
              <div>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-sm text-slate-800 dark:text-slate-200 hover:text-slate-600 dark:hover:text-slate-400 transition-colors mb-4 font-medium"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Workspace
                </Link>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Social Links & Profiles
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-mono mt-1">
                  Connect across developer networks and platforms
                </p>
              </div>

              {/* Social Profiles Chips */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {connect.map((item, idx) => {
                  const Icon = ICON_MAP[item.icon] || FiGithub;
                  return (
                    <a
                      key={idx}
                      href={item.url}
                      target={item.url.startsWith("http") ? "_blank" : "_self"}
                      rel="noopener noreferrer"
                      className="p-4 rounded-xl bg-gray-50 dark:bg-[#1a1a1d] border border-gray-200 dark:border-white/5 hover:border-slate-400/40 dark:hover:border-white/20 transition-all flex flex-col items-center justify-center gap-2 group text-center"
                    >
                      <Icon className="w-6 h-6 text-slate-700 dark:text-slate-300 group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-mono font-medium text-gray-800 dark:text-gray-200 group-hover:text-blue-500 dark:group-hover:text-cyan-400 transition-colors flex items-center gap-0.5">
                        {item.name} <ArrowUpRight className="w-3 h-3 opacity-60" />
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}

export default Page;
