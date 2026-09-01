"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import ProjectsSection from "./components/ProjectsSection";

// Lazy Load Heavy WebGL & Simulation Components (No SSR)
const Reactdiff = dynamic(() => import("./components/Reactdiff"), { ssr: false });
const Lissajous = dynamic(() => import("./components/Lissajous"), { ssr: false });
const BubbleSort = dynamic(() => import("./components/Bubblesort"), { ssr: false });
const NeuralNetwork = dynamic(() => import("./components/Neuralnetwork"), { ssr: false });

import CoolBackground from "./components/CoolBackground";
import DarkModeToggle from "./components/DarkModeToggle";
import experience from "./data/experience.json";
import connect from "./data/connect.json";
import { Cpu, Brain, Terminal, ArrowUpRight, ChevronDown } from "lucide-react";
import { FaPython, FaReact } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";
import FloatingButton from "./components/FloatingButton";
import BackToTop from "./components/BackToTop";

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
  const [expandedExp, setExpandedExp] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
      className="portfolio-bg relative isolate min-h-[100svh] text-gray-800 dark:text-gray-200 transition-colors duration-300 flex flex-col items-center justify-start"
      style={{ overflowY: 'auto', overflowX: 'hidden' }}
    >
      <FloatingButton />
      {/* Interactive Background Canvas */}
      <CoolBackground />

      {/* Top Embedded Minimalist Header */}
      <header className="fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-4xl flex items-center justify-between px-5 py-2 rounded-full border border-black/10 dark:border-white/10 bg-white/50 dark:bg-black/50 backdrop-blur-md shadow-sm">
        <div className="flex items-center gap-2 font-mono text-xs text-gray-700 dark:text-gray-300">
          <Terminal className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300 animate-pulse" />
          <span className="font-semibold text-gray-900 dark:text-white">hexctl</span>
          <span className="text-gray-400 dark:text-gray-500">/</span>

        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <DarkModeToggle />
        </div>
      </header>

      {/* Main Workspace Layout */}
      <section className="pt-20 pb-12 max-w-4xl mx-auto px-4 lg:px-6 relative z-10 w-full flex-1 flex flex-col md:flex-row gap-6 items-start justify-start">

        {/* LEFT UNTOUCHED SIDEBAR - Shown only on Home view */}
        {rightPanelView === "home" && (
          <aside className="w-full md:w-60 flex flex-col items-center shrink-0 justify-start py-2 border-b md:border-b-0 md:border-r border-black/10 dark:border-white/10 md:pr-6">
            <div className="w-full flex flex-col items-center">
              {/* Identity */}
              <div className="font-bold text-lg text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="cyber-badge text-xs px-2.5 py-0.5 rounded-full font-mono font-medium">
                  [Dev]
                </span>
                <span>Wayne Obial</span>
              </div>

              {/* Profile Avatar */}
              <div className="relative w-28 h-28 md:w-36 md:h-36 mb-4 shrink-0 rounded-full overflow-hidden ring-2 ring-slate-400/30 shadow-lg">
                <Image
                  src="/images/Me.jpg"
                  alt="Wayne Obial Profile Picture"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Role Badge */}
              <div className="w-full text-center text-slate-800 dark:text-slate-200 font-bold text-xs py-1.5 px-3 rounded-xl bg-slate-500/10 dark:bg-white/10 border border-slate-500/20 dark:border-white/15 uppercase tracking-widest mb-6">
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
                      className="text-slate-800 dark:text-slate-200 hover:text-slate-600 dark:hover:text-slate-400 flex items-center gap-0.5 hover:underline"
                    >
                      Visit <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                ))}
            </div>
          </aside>
        )}

        {/* REFACTORED MINIMAL MAIN CONTENT AREA */}
        <div className="flex-1 flex flex-col min-h-0 min-w-0 w-full">

          {/* Minimalist View Switcher Navigation */}
          <div className="flex items-center justify-between pb-3 mb-6 border-b border-black/10 dark:border-white/10 font-mono text-xs">
            <div className="flex items-center gap-4">
              {rightPanelView !== "home" && (
                <button
                  onClick={() => { setRightPanelView("home"); setExpandedExp(null); }}
                  className="text-slate-800 dark:text-slate-200 hover:underline font-semibold"
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
                  ? "text-slate-900 dark:text-slate-100 font-bold bg-slate-500/15 border border-slate-500/30"
                  : "text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
                  }`}
              >
                home
              </button>
              <button
                onClick={() => { setRightPanelView("projects"); setExpandedExp(null); }}
                className={`px-2.5 py-1 rounded-md transition-all ${rightPanelView === "projects"
                  ? "text-slate-900 dark:text-slate-100 font-bold bg-slate-500/15 border border-slate-500/30"
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
                  ? "text-slate-900 dark:text-slate-100 font-bold bg-slate-500/15 border border-slate-500/30"
                  : "text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
                  }`}
              >
                simulations
              </button>
            </div>
          </div>

          {/* Scrollable Main Content Stream */}
          <div
            ref={scrollContainerRef}
            className="flex-1 space-y-8 min-h-0 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden pr-2"
          >
            <div key={rightPanelView} className="animate-basic-fade space-y-8">
              {/* MINIMAL HOME VIEW */}
              {rightPanelView === "home" && (
                <>
                  <article className="space-y-4">
                    <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                      Hey <span className="text-slate-800 dark:text-slate-200 font-bold">Viewer</span>.
                    </h1>

                    <div className="text-sm leading-relaxed text-gray-600 dark:text-gray-300 space-y-3 font-normal">
                      <p>Greetings.</p>
                      <p>
                        I&apos;m <span className="font-semibold text-gray-900 dark:text-white">Wayne</span>, a technology-driven learner with a strong
                        interest in building practical and creative digital solutions. I enjoy working on projects that involve software
                        development, automation, and problem-solving, and I&apos;m always curious about how systems work behind the scenes.
                      </p>
                      <p>
                        I believe in continuous growth, learning beyond the classroom, and turning ideas into real, functional products.
                        This portfolio showcases my journey, projects, and the skills I&apos;m developing as I move forward in the tech field.
                      </p>
                    </div>
                  </article>

                  {/* MINIMAL EXPERIENCE LOGS */}
                  <section className="pt-4 border-t border-black/10 dark:border-white/10 space-y-4">
                    <span className="text-xs font-mono text-slate-700 dark:text-slate-300 font-semibold tracking-wider uppercase">
                      {"/* Experience */"}
                    </span>

                    <div className="space-y-2">
                      {experience.map((item, index) => {
                        const isOpen = expandedExp === index;
                        return (
                          <div
                            key={index}
                            className={`border-l-2 transition-all duration-200 ${isOpen
                              ? "border-slate-600 dark:border-slate-400 bg-slate-500/10 dark:bg-slate-400/10 rounded-r-xl"
                              : "border-slate-400/30 dark:border-slate-600/30 hover:border-slate-600 dark:hover:border-slate-400"
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
                                    ? "text-slate-900 dark:text-slate-100"
                                    : "text-gray-900 dark:text-gray-100 group-hover:text-slate-700 dark:group-hover:text-slate-300"
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
                                className={`w-4 h-4 text-gray-400 dark:text-gray-500 shrink-0 mt-0.5 transition-transform duration-300 ${isOpen ? "rotate-180 text-slate-700 dark:text-slate-300" : ""
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
                                    <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                                      Highlights
                                    </span>
                                    <div className="relative">
                                      {/* Vertical line — center of 14px node = left-[6px] */}
                                      <div className="absolute left-[6px] top-0 bottom-0 w-px bg-slate-500/30" />
                                      <div className="space-y-3">
                                        {(item as { highlights: string[] }).highlights.map((h, hi) => (
                                          <div key={hi} className="flex items-start gap-3">
                                            {/* Timeline node — 14px, center at 7px matches line */}
                                            <div className="shrink-0 w-3.5 h-3.5 rounded-full border-2 border-slate-500/60 bg-slate-500/10 flex items-center justify-center mt-0.5 z-10 bg-white dark:bg-[#0a0a0a]">
                                              <span className="w-1 h-1 rounded-full bg-slate-600 dark:bg-slate-300" />
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
                <section className="space-y-4">
                  <div className="space-y-2">
                    <div className="text-xs font-mono text-gray-500 dark:text-gray-400 pb-2 border-b border-black/10 dark:border-white/10">
                      {"/* Selected Projects */"}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 font-sans leading-relaxed">
                      A curated collection of full-stack web applications, developer utilities, CLI tools, and interactive software. Click on any project card to reveal detailed specifications, tech stack tags, and live demo links.
                    </p>
                  </div>
                  <ProjectsSection />
                </section>
              )}

              {/* UNTOUCHED SIMULATIONS COMPONENT */}
              {simulationsReady ? (
                <section
                  className={
                    rightPanelView === "simulations" ? "space-y-4 w-full min-w-0 max-w-full" : "hidden"
                  }
                >
                  <div className="space-y-2">
                    <div className="text-xs font-mono text-gray-500 dark:text-gray-400 pb-2 border-b border-black/10 dark:border-white/10">
                      {"/* Abstract Math Models & Simulations */"}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 font-sans leading-relaxed">
                      Interactive visualizations of mathematical differential equations, chaotic attractors, sorting algorithms, and neural networks.
                    </p>
                  </div>

                  {/* Pure CSS Masonry Grid Layout with Sharp Edges */}
                  <div className="columns-1 sm:columns-2 gap-4 space-y-4 w-full min-w-0 max-w-full">

                    {/* MASONRY ITEM 1: Lissajous Curve (Column 1 Top) */}
                    <div className="break-inside-avoid space-y-2.5 p-4 rounded-none border border-black/15 dark:border-white/15 bg-black/2 dark:bg-white/3 backdrop-blur-md w-full min-w-0 max-w-full overflow-hidden">
                      <div className="flex items-center justify-between font-mono text-xs">
                        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 font-sans">
                          Lissajous Curve
                        </h2>
                        <span className="text-gray-400 text-[10px]">Harmonics</span>
                      </div>
                      <div className="w-full h-[260px] rounded-none overflow-hidden border border-black/10 dark:border-white/10">
                        <Lissajous />
                      </div>
                    </div>

                    {/* MASONRY ITEM 2: Reaction Diffusion (Column 2 Top) */}
                    <div className="break-inside-avoid space-y-2.5 p-4 rounded-none border border-black/15 dark:border-white/15 bg-black/2 dark:bg-white/3 backdrop-blur-md w-full min-w-0 max-w-full overflow-hidden">
                      <div className="flex items-center justify-between font-mono text-xs">
                        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 font-sans">
                          Reaction-Diffusion
                        </h2>
                        <span className="text-gray-400 text-[10px]">Pattern</span>
                      </div>
                      <div className="rounded-none overflow-hidden border border-black/10 dark:border-white/10 w-full min-w-0 max-w-full">
                        <Reactdiff />
                      </div>
                    </div>

                    {/* MASONRY ITEM 3: Bubble Sort (Column 1 Bottom) */}
                    <div className="break-inside-avoid space-y-2.5 p-4 rounded-none border border-black/15 dark:border-white/15 bg-black/2 dark:bg-white/3 backdrop-blur-md w-full min-w-0 max-w-full overflow-hidden">
                      <div className="flex items-center justify-between font-mono text-xs">
                        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 font-sans">
                          Bubble Sort
                        </h2>
                        <span className="text-gray-400 text-[10px]">Algorithm</span>
                      </div>
                      <div className="rounded-none overflow-hidden border border-black/10 dark:border-white/10 w-full min-w-0 max-w-full">
                        <BubbleSort />
                      </div>
                    </div>

                    {/* MASONRY ITEM 4: Neural Network (Column 2 Bottom) */}
                    <div className="break-inside-avoid space-y-2.5 p-4 rounded-none border border-black/15 dark:border-white/15 bg-black/2 dark:bg-white/3 backdrop-blur-md w-full min-w-0 max-w-full overflow-hidden">
                      <div className="flex items-center justify-between font-mono text-xs">
                        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 font-sans">
                          Neural Network
                        </h2>
                        <span className="text-gray-400 text-[10px]">Deep Learning</span>
                      </div>
                      <div className="rounded-none overflow-hidden border border-black/10 dark:border-white/10 w-full min-w-0 max-w-full">
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
        </div>
      </section>
      <BackToTop containerRef={scrollContainerRef} />
    </main>
  );
}
