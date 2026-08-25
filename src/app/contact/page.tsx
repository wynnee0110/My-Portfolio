"use client";

import Footer from "../components/Footer";
import Header from "../components/Header";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useForm, ValidationError } from "@formspree/react";

export default function Contact() {
  const [state, handleSubmit] = useForm("myzbrgvd");

  if (state.succeeded) {
    return (
      <main className="overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] min-h-[100svh] bg-white dark:bg-black text-gray-800 dark:text-gray-300 transition-colors duration-300 flex items-center justify-center">
        <Header />
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Thanks for reaching out!</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">I&apos;ll get back to you soon.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] min-h-[100svh] bg-white dark:bg-black text-gray-800 dark:text-gray-300 pb-10 transition-colors duration-300">
      <Header />

      <div>
        <section className="pt-25 max-w-4xl mx-auto px-4 lg:px-0">
          <div className="flex flex-col bg-white dark:bg-[#161618] border border-gray-200 dark:border-[#2d2d2d] rounded-md overflow-hidden shadow-xl dark:shadow-2xl transition-colors duration-300">

            {/* Post Meta Header */}
            <div className="bg-gray-100 dark:bg-[#1a1a1c] px-4 py-2 text-xs text-gray-500 dark:text-gray-500 border-b border-gray-200 dark:border-[#2d2d2d] flex justify-between items-center transition-colors duration-300">
              <span>Contact — get in touch</span>
              <span className="font-bold text-gray-600 dark:text-gray-400">#contact</span>
            </div>

            {/* Page Body */}
            <div className="p-6 md:p-8">

              {/* Back button */}
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-slate-800 dark:text-slate-200 hover:text-slate-600 dark:hover:text-slate-400 transition-colors mb-6 font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Link>

              <div className="max-w-lg">
                {/* Section header */}
                <section className="mb-8">
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                    Contact Me
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Feel free to reach out to me using the form below.
                  </p>
                </section>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Name</label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      required
                      className="p-2 border-b border-gray-300 dark:border-[#333] bg-transparent text-gray-900 dark:text-white focus:outline-none focus:border-slate-500 dark:focus:border-slate-400 transition-colors text-sm"
                      placeholder="Your Name"
                    />
                    <ValidationError prefix="Name" field="name" errors={state.errors} />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Email</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      className="p-2 border-b border-gray-300 dark:border-[#333] bg-transparent text-gray-900 dark:text-white focus:outline-none focus:border-slate-500 dark:focus:border-slate-400 transition-colors text-sm"
                      placeholder="Your Email"
                    />
                    <ValidationError prefix="Email" field="email" errors={state.errors} />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      className="p-2 border-b border-gray-300 dark:border-[#333] bg-transparent text-gray-900 dark:text-white focus:outline-none focus:border-slate-500 dark:focus:border-slate-400 transition-colors resize-none text-sm"
                      placeholder="Your Message"
                      rows={5}
                    />
                    <ValidationError prefix="Message" field="message" errors={state.errors} />
                  </div>

                  {/* Submit + Socials */}
                  <div className="flex flex-col sm:flex-row justify-start items-center sm:items-end gap-4 mt-2">
                    <button
                      type="submit"
                      disabled={state.submitting}
                      className="bg-slate-800 hover:bg-slate-900 dark:bg-slate-200 dark:hover:bg-white dark:text-slate-900 text-white font-semibold py-2 px-6 rounded-md transition-colors w-full sm:w-auto text-sm"
                    >
                      {state.submitting ? "Sending..." : "Submit"}
                    </button>

                    <div className="flex gap-4 text-gray-500 dark:text-gray-400 text-xl">
                      <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
                        <FaGithub />
                      </a>
                      <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">
                        <FaLinkedin />
                      </a>
                      <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 transition-colors">
                        <FaTwitter />
                      </a>
                    </div>
                  </div>
                </form>
              </div>

            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
