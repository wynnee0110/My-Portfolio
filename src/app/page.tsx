"use client";

import Image from "next/image";
import ProjectsSection from "./components/ProjectsSection";
import Reactdiff from "./components/Reactdiff";
import Lorenz from "./components/Lorenz";
import BubbleSort from "./components/Bubblesort";
import NeuralNetwork from "./components/Neuralnetwork";
import CoolBackground from "./components/CoolBackground";
import DarkModeToggle from "./components/DarkModeToggle";
import experience from "./data/experience.json";
import connect from "./data/connect.json";
import { Cpu, Brain, Terminal, ArrowUpRight, ChevronDown } from "lucide-react";
import { FaPython, FaReact } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";
import FloatingButton from "./components/FloatingButton";
import MoodBadge from "./components/MoodBadge";


interface Tooltip {
  visible: boolean;
  text: string;
  x: number;
  y: number;
}

type RightPanelView = "home" | "projects" | "simulations";
type IdleCallbackHandle = number;
type IdleCallbackFn = (deadline: { didTimeout: boolean; timeRemaining: () => number }) => void;

type WindowWithIdle = Window & {
  requestIdleCallback?: (cb: IdleCallbackFn, options?: { timeout: number }) => IdleCallbackHandle;
  cancelIdleCallback?: (id: IdleCallbackHandle) => void;
};

export default function HomePage() {
  const [rightPanelView, setRightPanelView] = useState<RightPanelView>("home");
  const [simulationsReady, setSimulationsReady] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>("");
  const [expandedExp, setExpandedExp] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [rightPanelView]);

  const [tooltip, setTooltip] = useState<Tooltip>({
    visible: false,
    text: "",
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const browserWindow = window as WindowWithIdle;
    let cancelled = false;

    const warmSimulations = () => {
      if (!cancelled) setSimulationsReady(true);
    };

    if (typeof browserWindow.requestIdleCallback === "function") {
      const idleId = browserWindow.requestIdleCallback(warmSimulations, {
        timeout: 1500,
      });
      return () => {
        cancelled = true;
        browserWindow.cancelIdleCallback?.(idleId);
      };
    }

    const timer = globalThis.setTimeout(warmSimulations, 600);
    return () => {
      cancelled = true;
      globalThis.clearTimeout(timer);
    };
  }, []);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    text: string
  ) => {
    setTooltip({
      visible: true,
      text,
      x: e.clientX + 15,
      y: e.clientY + 15,
    });
  };

  const handleMouseLeave = () => {
    setTooltip((prev) => ({
      ...prev,
      visible: false,
    }));
  };

  return (
    <main
      className="portfolio-bg relative isolate min-h-[100svh] text-gray-800 dark:text-gray-200 transition-colors duration-300 flex flex-col justify-between"
      style={{ overflowY: 'auto', overflowX: 'hidden' }}
    >
      <FloatingButton />
      {/* Interactive Background Canvas */}
      <CoolBackground />

      {/* Top Embedded Minimalist Header */}
      <header className="fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-7xl flex items-center justify-between px-5 py-2 rounded-full border border-black/10 dark:border-white/10 bg-white/30 dark:bg-black/40 backdrop-blur-md shadow-sm">
        <div className="flex items-center gap-2 font-mono text-xs text-gray-700 dark:text-gray-300">
          <Terminal className="w-3.5 h-3.5 text-pink-500 animate-pulse" />
          <span className="font-semibold text-gray-900 dark:text-white">hexctl</span>
          <span className="text-gray-400 dark:text-gray-500">/</span>

        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <span className="hidden sm:inline-block px-3 py-0.5 rounded-full bg-black/5 dark:bg-white/10 text-gray-600 dark:text-gray-400 border border-black/5 dark:border-white/10">
            {currentTime || "--:--"}
          </span>
          <DarkModeToggle />
        </div>
      </header>

      {/* Main Workspace Layout */}
      <section className="pt-24 pb-12 max-w-7xl mx-auto px-4 lg:px-6 relative z-10 w-full flex-1 flex flex-col md:flex-row gap-8 md:h-[calc(100svh-7rem)] min-h-[600px]">

        {/* LEFT UNTOUCHED SIDEBAR */}
        <aside className="w-full md:w-64 flex flex-col items-center shrink-0 justify-between py-2 border-b md:border-b-0 md:border-r border-black/10 dark:border-white/10 md:pr-8">
          <div className="w-full flex flex-col items-center">
            {/* Identity */}
            <div className="font-bold text-lg text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="cyber-badge text-xs px-2.5 py-0.5 rounded-full font-mono font-medium">
                [Dev]
              </span>
              <span>Wayne Obial</span>
            </div>

            {/* Profile Avatar */}
            <div className="relative w-28 h-28 md:w-36 md:h-36 mb-4 shrink-0 rounded-full md:rounded-2xl overflow-hidden ring-2 ring-pink-500/30 shadow-lg group">
              <Image
                src="/images/2.jpeg"
                alt="Wayne Obial Profile Picture"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Mood Badge — GitHub-style floating status */}
            <div className="mb-3">
              <MoodBadge />
            </div>

            {/* Online Status */}
            <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400 mb-4 flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <span className="w-2 h-2 bg-emerald-500 rounded-full online-dot"></span>
              <span>Online</span>
            </div>

            {/* Role Badge */}
            <div className="w-full text-center text-pink-700 dark:text-pink-400 font-bold text-xs py-1.5 px-3 rounded-xl bg-pink-500/10 border border-pink-500/20 uppercase tracking-widest mb-6">
              Software Dev
            </div>

            {/* Tech Stack Icons */}
            <div className="w-full flex justify-center gap-4 mb-6 py-2 px-4 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 backdrop-blur-sm">
              <div
                onMouseMove={(e) => handleMouseMove(e, "Python")}
                onMouseLeave={handleMouseLeave}
                className="cursor-pointer p-1 rounded hover:bg-cyan-500/10 transition-colors"
              >
                <FaPython className="text-gray text-2xl hover:scale-110 transition-transform" />
              </div>

              <div
                onMouseMove={(e) => handleMouseMove(e, "React / Next.js")}
                onMouseLeave={handleMouseLeave}
                className="cursor-pointer p-1 rounded hover:bg-cyan-500/10 transition-colors"
              >
                <FaReact className="text-gray text-2xl hover:scale-110 transition-transform" />
              </div>

              <div
                onMouseMove={(e) => handleMouseMove(e, "IoT Systems")}
                onMouseLeave={handleMouseLeave}
                className="cursor-pointer p-1 rounded hover:bg-emerald-500/10 transition-colors"
              >
                <Cpu className="text-gray w-6 h-6 hover:scale-110 transition-transform" />
              </div>

              <div
                onMouseMove={(e) => handleMouseMove(e, "AI & Machine Learning")}
                onMouseLeave={handleMouseLeave}
                className="cursor-pointer p-1 rounded hover:bg-purple-500/10 transition-colors"
              >
                <Brain className="text-gray w-6 h-6 hover:scale-110 transition-transform" />
              </div>
            </div>
          </div>

          {/* Custom Tooltip */}
          {tooltip.visible && (
            <div
              className="fixed z-50 bg-gray-900 text-white text-xs font-mono px-2.5 py-1 rounded-md shadow-lg pointer-events-none border border-white/20"
              style={{
                left: tooltip.x,
                top: tooltip.y,
              }}
            >
              {tooltip.text}
            </div>
          )}

          {/* Social Links — Projects & Simulations excluded (shown in top nav) */}
          <div className="w-full text-xs font-mono space-y-1.5 text-gray-600 dark:text-gray-400 pt-4 border-t border-black/10 dark:border-white/10">
            {connect
              .filter((item) => item.name !== "Projects" && item.name !== "Simulations")
              .map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-1 px-2.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  <span className="font-medium text-gray-700 dark:text-gray-300">{item.name}</span>
                  <a
                    href={item.url}
                    target={item.url.startsWith("http") ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    className="text-pink-600 dark:text-pink-400 hover:text-pink-500 dark:hover:text-pink-300 flex items-center gap-0.5 hover:underline"
                  >
                    Visit <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              ))}
          </div>
        </aside>

        {/* REFACTORED MINIMAL MAIN CONTENT AREA */}
        <div className="flex-1 flex flex-col min-h-0">

          {/* Minimalist View Switcher Navigation */}
          <div className="flex items-center justify-between pb-3 mb-6 border-b border-black/10 dark:border-white/10 font-mono text-xs">
            <div className="flex items-center gap-4">
              {rightPanelView !== "home" && (
                <button
                  onClick={() => { setRightPanelView("home"); setExpandedExp(null); }}
                  className="text-pink-600 dark:text-pink-400 hover:underline font-semibold"
                >
                  ← Home
                </button>
              )}
              <span className="text-gray-400 dark:text-gray-500">
                {rightPanelView === "home" ? "/* Overview */" : rightPanelView === "projects" ? "/* Portfolio Builds */" : "/* Math Models */"}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => { setRightPanelView("home"); setExpandedExp(null); }}
                className={`px-2.5 py-1 rounded-md transition-all ${rightPanelView === "home"
                  ? "text-pink-600 dark:text-pink-400 font-bold bg-pink-500/10 border border-pink-500/20"
                  : "text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
                  }`}
              >
                home
              </button>
              <button
                onClick={() => { setRightPanelView("projects"); setExpandedExp(null); }}
                className={`px-2.5 py-1 rounded-md transition-all ${rightPanelView === "projects"
                  ? "text-pink-600 dark:text-pink-400 font-bold bg-pink-500/10 border border-pink-500/20"
                  : "text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
                  }`}
              >
                works
              </button>
              <button
                onClick={() => {
                  setSimulationsReady(true);
                  setRightPanelView("simulations");
                  setExpandedExp(null);
                }}
                className={`px-2.5 py-1 rounded-md transition-all ${rightPanelView === "simulations"
                  ? "text-pink-600 dark:text-pink-400 font-bold bg-pink-500/10 border border-pink-500/20"
                  : "text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
                  }`}
              >
                sim
              </button>
            </div>
          </div>

          {/* Scrollable Main Content Stream */}
          <div
            ref={scrollContainerRef}
            className="flex-1 space-y-8 min-h-0 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden pr-2"
          >
            {/* MINIMAL HOME VIEW */}
            {rightPanelView === "home" && (
              <>
                <article className="space-y-4">
                  <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    Hey <span className="text-pink-600 dark:text-pink-400 font-bold">Viewer</span>.
                  </h1>

                  <div className="text-sm leading-relaxed text-gray-600 dark:text-gray-300 space-y-3 font-normal">
                    <p>Greetings.</p>
                    <p>
                      I&apos;m <span className="font-semibold text-gray-900 dark:text-white">Wayne</span>, a technology-driven learner with a strong
                      interest in building practical and creative digital solutions. I enjoy working on projects that involve software
                      development, automation, and problem-solving, and I&apos;m always curious about how systems work behind the scenes.
                    </p>
                    <p>
                      I actively explore different tools, frameworks, and technologies by creating hands-on projects, from small
                      scripts to full applications. Through these projects, I focus on writing clean, efficient solutions while
                      continuously improving my skills and understanding.
                    </p>
                    <p>
                      I believe in continuous growth, learning beyond the classroom, and turning ideas into real, functional products.
                      This portfolio showcases my journey, projects, and the skills I&apos;m developing as I move forward in the tech field.
                    </p>
                  </div>
                </article>

                {/* MINIMAL EXPERIENCE LOGS */}
                <section className="pt-4 border-t border-black/10 dark:border-white/10 space-y-4">
                  <span className="text-xs font-mono text-pink-600 dark:text-pink-400 font-semibold tracking-wider uppercase">
                    {"/* Experience */"}
                  </span>

                  <div className="space-y-2">
                    {experience.map((item, index) => {
                      const isOpen = expandedExp === index;
                      return (
                        <div
                          key={index}
                          className={`border-l-2 transition-all duration-200 ${isOpen
                            ? "border-pink-500 bg-pink-500/5 rounded-r-xl"
                            : "border-pink-500/30 hover:border-pink-500/70"
                            }`}
                        >
                          {/* Clickable header row */}
                          <button
                            onClick={() => setExpandedExp(isOpen ? null : index)}
                            className="w-full text-left flex items-start justify-between gap-3 pl-4 pr-3 py-2.5 group"
                          >
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                <h3 className={`font-medium text-sm leading-snug transition-colors ${isOpen
                                  ? "text-pink-600 dark:text-pink-400"
                                  : "text-gray-900 dark:text-gray-100 group-hover:text-pink-600 dark:group-hover:text-pink-400"
                                  }`}>
                                  {item.role}
                                </h3>
                                <span className="text-[11px] font-mono text-gray-500 dark:text-gray-400 shrink-0">
                                  {item.period}
                                </span>
                              </div>
                              {!isOpen && (
                                <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5 leading-relaxed line-clamp-1">
                                  {item.description}
                                </p>
                              )}
                            </div>
                            <ChevronDown
                              className={`w-4 h-4 text-gray-400 dark:text-gray-500 shrink-0 mt-0.5 transition-transform duration-300 ${isOpen ? "rotate-180 text-pink-500" : ""
                                }`}
                            />
                          </button>

                          {/* Expandable details */}
                          <div
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                              }`}
                          >
                            <div className="pl-4 pr-3 pb-4 space-y-3">
                              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed italic border-b border-black/8 dark:border-white/8 pb-2">
                                &quot;{item.description}&quot;
                              </p>
                              {(item as { highlights?: string[] }).highlights && (
                                <div className="space-y-2">
                                  <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-pink-500/80">
                                    Highlights
                                  </span>
                                  <div className="relative">
                                    {/* Vertical line — center of 14px node = left-[6px] */}
                                    <div className="absolute left-[6px] top-0 bottom-0 w-px bg-pink-500/30" />
                                    <div className="space-y-3">
                                      {(item as { highlights: string[] }).highlights.map((h, hi) => (
                                        <div key={hi} className="flex items-start gap-3">
                                          {/* Timeline node — 14px, center at 7px matches line */}
                                          <div className="shrink-0 w-3.5 h-3.5 rounded-full border-2 border-pink-500/60 bg-pink-500/10 flex items-center justify-center mt-0.5 z-10 bg-white dark:bg-[#0a0a0a]">
                                            <span className="w-1 h-1 rounded-full bg-pink-500" />
                                          </div>
                                          <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed pt-px">
                                            {h}
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              </>
            )}

            {/* UNTOUCHED PROJECTS COMPONENT */}
            {rightPanelView === "projects" && (
              <section className="space-y-3">
                <div className="text-xs font-mono text-gray-500 dark:text-gray-400 pb-2 border-b border-black/10 dark:border-white/10">
                  {"/* Selected Projects */"}
                </div>
                <ProjectsSection />
              </section>
            )}

            {/* UNTOUCHED SIMULATIONS COMPONENT */}
            {simulationsReady ? (
              <section
                className={
                  rightPanelView === "simulations" ? "space-y-8" : "hidden"
                }
              >
                <div className="text-xs font-mono text-gray-500 dark:text-gray-400 pb-2 border-b border-black/10 dark:border-white/10">
                  {"/* Interactive Math Models */"}
                </div>

                <div className="space-y-8">
                  <div className="space-y-2">
                    <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2 font-mono">
                      <span className="text-pink-500">01.</span> Reaction-Diffusion
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Interactive Gray-Scott pattern simulation based on reaction-diffusion equations.
                    </p>
                    <div className="rounded-xl overflow-hidden border border-black/10 dark:border-white/10">
                      <Reactdiff />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2 font-mono">
                      <span className="text-pink-500">02.</span> The Lorenz Attractor
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      3D chaotic system showing how small changes in initial conditions create different trajectories.
                    </p>
                    <div className="w-full aspect-square cursor-grab active:cursor-grabbing rounded-xl overflow-hidden">
                      <Lorenz />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2 font-mono">
                      <span className="text-pink-500">03.</span> Bubble Sort
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Step-by-step visual demonstration of bubble sort comparisons and swaps.
                    </p>
                    <div className="rounded-xl overflow-hidden border border-black/10 dark:border-white/10">
                      <BubbleSort />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2 font-mono">
                      <span className="text-pink-500">04.</span> Neural Network
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Feedforward neural network visualization with weighted layers and activations.
                    </p>
                    <div className="rounded-xl overflow-hidden border border-black/10 dark:border-white/10">
                      <NeuralNetwork />
                    </div>
                  </div>
                </div>
              </section>
            ) : (
              rightPanelView === "simulations" && (
                <section className="space-y-3">
                  <div className="text-xs font-mono text-gray-500 dark:text-gray-400">
                    {"/* Simulations */"}
                  </div>
                  <p className="text-xs font-mono text-gray-500">
                    Preparing simulations...
                  </p>
                </section>
              )
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
