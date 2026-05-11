"use client";

import Image from "next/image";
import ProjectsSection from "./components/ProjectsSection";
import Reactdiff from "./components/Reactdiff";
import Lorenz from "./components/Lorenz";
import BubbleSort from "./components/Bubblesort";
import NeuralNetwork from "./components/Neuralnetwork";
import experience from "./data/experience.json";
import connect from "./data/connect.json";
import { Cpu } from "lucide-react";
import { FaReact } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Brain } from "lucide-react";

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
    <main className="portfolio-bg relative isolate min-h-[100svh] text-gray-800 dark:text-gray-300 transition-colors duration-300 overflow-hidden">
      <div className="portfolio-bg__glow portfolio-bg__glow--a"></div>
      <div className="portfolio-bg__glow portfolio-bg__glow--b"></div>
      <div className="portfolio-bg__grid"></div>
      <div className="portfolio-bg__grain"></div>
      <section className="pt-20 pb-6 max-w-5xl mx-auto px-4 lg:px-0 relative z-10">
        <div className="flex flex-col md:flex-row transition-colors duration-300 md:h-[calc(100svh-6.5rem)]">
          <div className="w-full md:w-64 p-5 flex flex-col items-center shrink-0 transition-colors duration-300">
            <div className="font-bold text-lg text-gray-900 dark:text-[#e2e8f0] mb-4 flex items-center gap-2">
              <span className="text-pink-600 dark:text-pink-500 text-sm">[Dev]</span> Wayne
              Obial
            </div>

            <div className="relative w-32 h-32 mb-4">
              <Image
                src="/images/2.jpeg"
                alt="Profile picture"
                fill
                className="rounded-md object-cover"
              />
            </div>

            <div className="text-sm text-green-600 dark:text-green-500 mb-4 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-600 dark:bg-green-500 rounded-full inline-block"></span>
              Online
            </div>

            <div className="w-full text-center text-pink-700 dark:text-[#b8287f] font-bold text-xs py-1.5 uppercase tracking-widest mb-6">
              Software Dev
            </div>

            <div className="w-full flex justify-center gap-4 mb-6">
              <div
                onMouseMove={(e) => handleMouseMove(e, "React Developer")}
                onMouseLeave={handleMouseLeave}
                className="cursor-pointer"
              >
                <FaReact className="text-cyan-500 text-3xl hover:scale-110 transition-transform" />
              </div>

              <div
                onMouseMove={(e) => handleMouseMove(e, "IoT")}
                onMouseLeave={handleMouseLeave}
                className="cursor-pointer"
              >
                <Cpu className="text-green-500 w-7 h-7 hover:scale-110 transition-transform" />
              </div>

              <div
                onMouseMove={(e) => handleMouseMove(e, "AI/ML")}
                onMouseLeave={handleMouseLeave}
                className="cursor-pointer"
              >
                <Brain className="text-purple-400 w-7 h-7 hover:scale-110 transition-transform" />
              </div>
            </div>

            {tooltip.visible && (
              <div
                className="fixed z-50 bg-black text-white text-xs px-2 py-1 rounded pointer-events-none"
                style={{
                  left: tooltip.x,
                  top: tooltip.y,
                }}
              >
                {tooltip.text}
              </div>
            )}

            <div className="w-full text-xs space-y-2 text-gray-600 dark:text-gray-400">
              {connect.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between pb-1"
                >
                  <span>{item.name}:</span>
                  {item.name === "Projects" ? (
                    <button
                      onClick={() => setRightPanelView("projects")}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 hover:underline"
                    >
                      Visit
                    </button>
                  ) : item.name === "Simulations" ? (
                    <button
                      onClick={() => {
                        setSimulationsReady(true);
                        setRightPanelView("simulations");
                      }}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 hover:underline"
                    >
                      Visit
                    </button>
                  ) : (
                    <a
                      href={item.url}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 hover:underline"
                    >
                      Visit
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 flex flex-col min-h-0">
            <div className="px-4 py-2 text-xs text-gray-500 dark:text-gray-500 flex justify-between items-center transition-colors duration-300">
              <span className="flex items-center gap-3">
                <span>
                  Posted just now (This portfolio was last modified recently by
                  WayneObial.)
                </span>
                {rightPanelView !== "home" && (
                  <button
                    onClick={() => setRightPanelView("home")}
                    className="text-pink-600 dark:text-pink-500 hover:underline"
                  >
                    Back to Home
                  </button>
                )}
              </span>
              <span className="font-bold text-gray-600 dark:text-gray-400">
                {rightPanelView === "home"
                  ? "#1"
                  : rightPanelView === "projects"
                    ? "#works"
                    : "#sim"}
              </span>
            </div>

            <div
              className={`p-6 md:p-8 space-y-8 min-h-0 ${
                rightPanelView === "home"
                  ? "overflow-y-hidden max-h-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                  : "overflow-y-auto max-h-[70svh] md:max-h-none"
              }`}
            >
              {rightPanelView === "home" && (
                <>
                  <section className="space-y-6">
                <h1 className="text-xl font-medium text-black dark:text-white mb-2">
                  Hey <span className="font-bold">Viewer</span>.
                </h1>

                <div className="text-sm leading-relaxed text-gray-7n00 dark:text-gray-300 space-y-4">
                <p>Greetings.</p>
                  <p>
                    I&apos;m <span className="font-bold">Wayne</span> a technology-driven learner with a strong
                    interest in building practical and creative digital
                    solutions. I enjoy working on projects that involve software
                    development, automation, and problem-solving, and I&apos;m
                    always curious about how systems work behind the scenes.
                  </p>
                  <p>
                    I actively explore different tools, frameworks, and
                    technologies by creating hands-on projects, from small
                    scripts to full applications. Through these projects, I
                    focus on writing clean, efficient solutions while
                    continuously improving my skills and understanding.
                  </p>
                  <p>
                    I believe in continuous growth, learning beyond the
                    classroom, and turning ideas into real, functional products.
                    This portfolio showcases my journey, projects, and the
                    skills I&apos;m developing as I move forward in the tech
                    field.
                  </p>
                </div>
              </section>

              <section className="mt-8 p-4 transition-colors duration-300">
                <p className="text-red-600 dark:text-red-400 font-mono text-sm mb-4">
                  {"/* System.Experience Logs */"}
                </p>

                <div className="relative pl-4 space-y-6 ml-2">
                  {experience.map((item, index) => (
                    <div key={index} className="relative">
                      <span className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 bg-gray-400 dark:bg-gray-500 rounded-full"></span>

                      <h3 className="font-semibold text-gray-900 dark:text-gray-200">
                        {item.role}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mb-1">
                        {item.period}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                        &quot;{item.description}&quot;
                      </p>
                    </div>
                  ))}
                </div>
              </section>
                </>
              )}

              {rightPanelView === "projects" && (
                <section className="space-y-3">
                <div className="text-sm font-medium tracking-widest uppercase text-gray-400 dark:text-gray-500">
                  Projects
                </div>
                <ProjectsSection />
              </section>
              )}

              {simulationsReady ? (
                <section
                  className={
                    rightPanelView === "simulations" ? "space-y-6" : "hidden"
                  }
                >
                  <div className="text-sm font-medium tracking-widest uppercase text-gray-400 dark:text-gray-500">
                    Simulations
                  </div>

                  <div className="space-y-8">
                    <div className="space-y-3">
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        1. Reaction-Diffusion
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Interactive Gray-Scott pattern simulation based on
                        reaction-diffusion equations.
                      </p>
                      <Reactdiff />
                    </div>

                    <div className="space-y-3">
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        2. The Lorenz Attractor
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        3D chaotic system showing how small changes in initial
                        conditions create different trajectories.
                      </p>
                      <div className="w-full aspect-square cursor-grab active:cursor-grabbing">
                        <Lorenz />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        3. Bubble Sort
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Step-by-step visual demonstration of bubble sort
                        comparisons and swaps.
                      </p>
                      <BubbleSort />
                    </div>

                    <div className="space-y-3 pb-1">
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        4. Neural Network
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Feedforward neural network visualization with weighted
                        layers and activations.
                      </p>
                      <NeuralNetwork />
                    </div>
                  </div>
                </section>
              ) : (
                rightPanelView === "simulations" && (
                  <section className="space-y-2">
                    <div className="text-sm font-medium tracking-widest uppercase text-gray-400 dark:text-gray-500">
                      Simulations
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Preparing simulations...
                    </p>
                  </section>
                )
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
