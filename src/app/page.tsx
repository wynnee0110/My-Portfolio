"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "./components/Header";
import { useState } from "react";

export default function HomePage() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  
  return (
    <main>
      <Header />

{/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-start h-[100vh] px-4">
          
    <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
      <div className="w-[300px] h-[300px] bg-blue-500 rounded-full blur-[100px] opacity-30"></div>
    </div>

          <div className="absolute w-full h-[300px] mb-8"> 
          
          </div>
        
        <h1 className="text-2xl font-bold mb-4">Welcome</h1>
        <p className="text-gray-400 max-w-md mb-6">
        
        </p>

        <div className="flex flex-row gap-4 z-10 ">
          <button 
          onClick={() => router.push("/projects")}
          className="bg-white white:bg-blue-700 text-black font-semibold py-2 px-7 rounded-2xl transition">
            View Projects
          </button>
        

            <button 
            onClick={() => router.push("/contact")}
            className="text-white font-semibold py-2 px-7 rounded-2xl border border-gray-300 hover:bg-gray-800 transition">
              Contact Me
            </button>
        
        </div>

        <div className="absolute mt-80">
  <a href="#about" className="absolute cursor-pointer">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="w-6 h-6 animate-bounce text-gray-400 hover:text-white transition"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M19 9l-7 7-7-7"
      />
    </svg>
  </a>
        </div>
      </section>
      
      
      <section id = "about" className="h-screen bg-black-100 flex items-center justify-center">
  
  <div className="text-start items-center px-4 p-8 max-w-2xl">
    
    <div className="flex items-center gap-4 mb-5">
  <h2 className="text-5xl text-gray-500 font-bold whitespace-nowrap">.about me</h2>
  <div className="h-[2px] w-200 bg-gray-500 "></div>
            </div>

            <p className="text-gray-300 leading-relaxed">
              Hi! <b>I’m Wayne</b> — a passionate developer who loves turning ideas into
              real, working projects. I enjoy building things from the ground up —
              whether it’s a login system using PHP and MySQL, a personal portfolio
              website with Next.js and TypeScript, or even a Flappy Bird-style game
              in Android Studio.
              <br />
              <br />
              I like exploring how technology works behind the scenes and improving
              my code structure step by step. My focus is on clean, functional, and
              scalable development, combining both front-end creativity and back-end
              logic.
              <br />
              <br />
              When I’m not coding, I’m usually experimenting with new tools,
              improving designs, or learning how to make apps smarter and smoother —
              because there’s always something new to discover in tech.
            </p>
            
            <div className="flex mt-6">
              <button
              onClick={() => setOpen(!open)}
                className="bg-white text-base text-black font-semibold py-2 px-2 hover:bg-gray-300 transition"
              >
                Learn More
              </button> 

  <button
  onClick={() => {
    const link = document.createElement("a");
    link.href = "/mycv.pdf";
    link.download = "Wayne-CV.pdf";
    link.click();
  }}
  className="ml-4 text-white font-semibold py-2 px-6 border border-gray-300 hover:bg-gray-800 transition"
>
  Download CV
</button>

            </div>

                  {open && (
        <div
          className="
            mt-4 p-4 
            bg-black-100
            shadow-lg 
            rounded-xl 
            border 
            transition-all 
            duration-300
          "
        >
          <h2 className="text-xl font-semibold mb-2">About Me</h2>
          <p className="text-gray-700">
            Hello! I am Wayne. I love programming, building projects, and
            learning new tech.
          </p>
        </div>
      )}







            <div 
            id="LearnMore"
            className="hidden absolute w-full h-[300px] mt-48">
              Hello



              </div>
            
            
          </div>


        </section>


        <section className="h-screen flex items-start justify-center">
          <div className="text-start items-center px-4 p-8 max-w-2xl">
            <h2 className="text-3xl font-bold mb-4">Skills</h2>
            <p className="text-gray-300 leading-relaxed">

            </p>
          </div>
    </section>
      </main>

    );
  }
