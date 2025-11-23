"use client";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useForm, ValidationError } from "@formspree/react";


export default function Contact() {
 
  const [state, handleSubmit] = useForm("myzbrgvd");

  if (state.succeeded) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black text-white">
        <Header />
        <h1 className="text-2xl font-bold">Thanks for reaching out!</h1>
      </main>
    );
  }

  return (
    <main className="overflow-hidden">
      <Header />

      <div className="flex bg-gray-660 min-h-screen items-center justify-center px-4 overflow-hidden">
        <div className="transform scale-[0.8] flex flex-col w-full sm:w-[90%] md:w-[90%] lg:w-[500px] p-6 rounded-2xl">
          {/* Header */}
          <section className="mb-8 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Contact Me
            </h1>
            <p className="text-gray-400 max-w-md mx-auto md:mx-0">
              Feel free to reach out to me using the form below.
            </p>
          </section>

          
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <label className="text-white font-semibold">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              required
              className="p-2 border-b border-gray-500 bg-transparent text-white focus:outline-none"
              placeholder="Your Name"
            />

            <ValidationError prefix="Name" field="name" errors={state.errors} />

            <label className="text-white font-semibold">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              required
              className="p-2 border-b border-gray-500 bg-transparent text-white focus:outline-none"
              placeholder="Your Email"
            />

            <ValidationError prefix="Email" field="email" errors={state.errors} />

            <label className="text-white font-semibold">Message</label>
            <textarea
              id="message"
              name="message"
              required
              className="p-2 border-b border-gray-500 bg-transparent text-white focus:outline-none resize-none"
              placeholder="Your Message"
              rows={5}
            ></textarea>

            <ValidationError prefix="Message" field="message" errors={state.errors} />

            {/* Submit + Socials */}
            <div className="flex flex-col sm:flex-row justify-start items-center sm:items-end gap-4 mt-6">
              <button
                type="submit"
                disabled={state.submitting}
                className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-2xl hover:bg-blue-700 transition w-full sm:w-auto"
              >
                {state.submitting ? "Sending..." : "Submit"}
              </button>

              <div className="flex gap-4 text-white text-2xl mb-2">
                <a
                  href="https://github.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-400 transition"
                >
                  <FaGithub />
                </a>
                <a
                  href="https://linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition"
                >
                  <FaLinkedin />
                </a>
                <a
                  href="https://twitter.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sky-400 transition"
                >
                  <FaTwitter />
                </a>
              </div>
            </div>
          </form>
        </div>

      </div>

<Footer/>
    </main>
  );
}
