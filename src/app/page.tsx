"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "./components/Header";
import { useState } from "react";
import Footer from "./components/Footer";
import { projects } from "./data/projectsData";
import ProjectsSection from "./components/ProjectsSection";

export default function HomePage() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  
  return (
    <main>
      <Header />

{/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-start 
  
  pt-0 sm:pb-0 
  h-[100vh] px-4 
 sm:mb-0">


    <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
      <div className="w-[300px] h-[300px] bg-blue-500 rounded-full blur-[100px] opacity-30"></div>
    </div>

          <div className="absolute w-full h-[300px] mb-8"> 
          
          </div>
        
        <div className="mt-34 z-10 max-w-3xl text-center">
        <h1 className="text-2xl font-bold mb-4">Welcome</h1>
        <p className="text-gray-400 max-w-md mb-6">
        
        </p>

        <div className="flex flex-row gap-4 z-10 ">
          <button 
          onClick={() => router.push("#projects")}
          className="bg-white white:bg-blue-700 text-black font-semibold py-2 px-7 rounded-2xl transition hover:scale-102 transform">
            View Projects
          </button>
            <button 
            onClick={() => router.push("/contact")}
            className="text-white font-semibold py-2 px-7 rounded-2xl border border-gray-300 hover:bg-gray-800 transition hover:scale-102">
              Contact Me
            </button>
        </div>
        </div>

        <div className="mt-20 sm:mt-40">

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
      
      
      <section id="about" className="sm:h-screen bg-black-100 flex items-center justify-center">

  <div className="text-start items-center px-4 p-8 max-w-3xl w-full">
    
    <div className="flex items-center gap-4 mb-5">
  <h2 className="text-3xl sm:text-5xl text-gray-500 font-bold whitespace-nowrap">.about me</h2>
  
            </div>

            <p className="text-gray-300 leading-relaxed text-sm md:text-base">
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
            
            <div className="flex flex-col sm:flex-row mt-6 gap-4">
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
  className="  text-sm sm:text-base sm:py-3 sm:px-8 text-white font-semibold py-2 px-6 border border-gray-300 hover:bg-gray-800 transition "
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


    
          </div>
        </section>

<section id="projects" className="bg-black-100 flex justify-center">
  <div className="w-full max-w-6xl px-4 sm:px-10 py-8">

    <div className="flex items-center gap-4 mb-5 w-full">
      <h2 className="text-3xl sm:text-5xl text-gray-500 font-bold">
        .projects
      </h2>
    </div>
    <div className="">  
    <ProjectsSection />
    
    </div>
  </div>
</section>
<section className="w-full py-20 flex flex-col items-center text-center">
  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
    Let’s build something great together.
  </h2>

  <p className="text-white/70 max-w-xl mb-8 text-sm md:text-base">
    Whether it’s a full-stack web application, an API, or a product idea,
    I’d love to help bring it to life.
  </p>

  <a
    href="/contact"
    className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 
               hover:bg-white/20 transition-all text-white flex items-center gap-2"
  >
    <span>Contact Me</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
      />
    </svg>
  </a>
</section>





        <Footer/>
      </main>

    );
  }
