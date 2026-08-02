"use client";

import 'katex/dist/katex.min.css';
// @ts-expect-error react-katex has no type declarations
import { BlockMath } from 'react-katex';
import Link from 'next/link';
import React, { useState } from 'react';
import Reactdiff from '../components/Reactdiff';
import Lorenz from '../components/Lorenz';
import BubbleSort from '../components/Bubblesort';
import NeuralNetwork from '../components/Neuralnetwork';
import CoolBackground from '../components/CoolBackground';
import DarkModeToggle from '../components/DarkModeToggle';
import PageTransition from '../components/PageTransition';
import { ArrowLeft, Terminal, FlaskConical, Infinity, ArrowDownUp, Network } from 'lucide-react';
import { useEffect } from 'react';

type Sim = {
  id: number;
  icon: React.ReactNode;
  label: string;
  slug: string;
  description: string;
  equations: string[];
  equationNote: string;
  color: string;
};

const sims: Sim[] = [
  {
    id: 1,
    icon: <FlaskConical className="w-5 h-5" />,
    label: "Reaction-Diffusion",
    slug: "reaction-diffusion",
    description: "Visualizing the Gray-Scott equations: a mathematical model of complex Turing patterns where diffusion rates, feed rate (f), and kill rate (k) determine structural evolution.",
    equations: [
      "\\frac{\\partial A}{\\partial t} = D_A \\nabla^2 A - AB^2 + f(1 - A)",
      "\\frac{\\partial B}{\\partial t} = D_B \\nabla^2 B + AB^2 - (k + f)B",
    ],
    equationNote: "Gray-Scott model:",
    color: "from-cyan-500/20 to-blue-500/20",
  },
  {
    id: 2,
    icon: <Infinity className="w-5 h-5" />,
    label: "Lorenz Attractor",
    slug: "lorenz",
    description: "A 3D visualization of deterministic chaos first studied by Edward Lorenz. Tiny changes in initial conditions result in drastically different, completely unpredictable outcomes — the butterfly effect.",
    equations: [
      "\\frac{dx}{dt} = \\sigma(y - x)",
      "\\frac{dy}{dt} = x(\\rho - z) - y",
      "\\frac{dz}{dt} = xy - \\beta z",
    ],
    equationNote: "Lorenz system:",
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    id: 3,
    icon: <ArrowDownUp className="w-5 h-5" />,
    label: "Bubble Sort",
    slug: "bubble-sort",
    description: "Step-by-step visualization of bubble sort. Adjacent elements are repeatedly compared and swapped until the array is fully sorted — a classic O(n²) algorithm.",
    equations: [
      "T(n)=O(n^2)",
      "\\text{swap if } A[j] > A[j+1]",
    ],
    equationNote: "Time complexity:",
    color: "from-orange-500/20 to-yellow-500/20",
  },
  {
    id: 4,
    icon: <Network className="w-5 h-5" />,
    label: "Neural Network",
    slug: "neural-network",
    description: "A feedforward neural network visualization. Values propagate through weighted layers and activation functions, demonstrating the core mechanics of deep learning.",
    equations: [
      "a^{(l)} = \\sigma(W^{(l)}a^{(l-1)} + b^{(l)})",
      "\\text{ReLU}(x)=\\max(0,x)",
    ],
    equationNote: "Forward propagation:",
    color: "from-emerald-500/20 to-teal-500/20",
  },
];

function SimCard({ sim, index, active, onClick }: { sim: Sim; index: number; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`
        stagger-item w-full text-left rounded-2xl border transition-all duration-300 p-4 group
        ${active
          ? "border-pink-500/40 bg-pink-500/8 shadow-lg shadow-pink-500/10"
          : "border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:border-pink-500/30 hover:bg-pink-500/5"
        }
      `}
    >
      <div className="flex items-center gap-3">
        <div className={`
          p-2 rounded-xl bg-gradient-to-br ${sim.color}
          text-gray-700 dark:text-gray-300 transition-transform duration-300 group-hover:scale-110
          ${active ? "scale-110" : ""}
        `}>
          {sim.icon}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-gray-400 dark:text-gray-500">{String(index + 1).padStart(2, "0")}</span>
            <h3 className={`text-sm font-semibold ${active ? "text-pink-600 dark:text-pink-400" : "text-gray-900 dark:text-gray-100"}`}>
              {sim.label}
            </h3>
          </div>
          <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 leading-tight line-clamp-1 max-w-[200px]">
            {sim.description.split(".")[0]}.
          </p>
        </div>
        <div className={`ml-auto w-1.5 h-1.5 rounded-full transition-all ${active ? "bg-pink-500 shadow-sm shadow-pink-500/50" : "bg-transparent"}`} />
      </div>
    </button>
  );
}

function SimViewer({ sim }: { sim: Sim }) {
  return (
    <div className="space-y-6 animate-[fadeIn_400ms_ease_forwards]" key={sim.id}>
      {/* Sim Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl bg-gradient-to-br ${sim.color} text-gray-700 dark:text-gray-300`}>
            {sim.icon}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{sim.label}</h2>
            <span className="text-[10px] font-mono text-gray-400 dark:text-gray-500">simulation.{sim.slug}</span>
          </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
          {sim.description}
        </p>
      </div>

      {/* Equations */}
      <div className="p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 space-y-1">
        <p className="text-[10px] font-mono text-gray-400 dark:text-gray-500 mb-2">{sim.equationNote}</p>
        {sim.equations.map((eq, i) => (
          <div key={i} className="text-base overflow-x-auto max-w-full">
            <BlockMath math={eq} />
          </div>
        ))}
      </div>

      {/* The interactive component */}
      <div className="rounded-xl overflow-hidden border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
        {sim.id === 1 && <Reactdiff />}
        {sim.id === 2 && (
          <div className="w-full aspect-square cursor-grab active:cursor-grabbing">
            <Lorenz />
          </div>
        )}
        {sim.id === 3 && <BubbleSort />}
        {sim.id === 4 && <NeuralNetwork />}
      </div>
    </div>
  );
}

export default function SimulationPage() {
  const [activeSimId, setActiveSimId] = useState<number>(1);
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const activeSim = sims.find((s) => s.id === activeSimId) ?? sims[0];

  return (
    <main className="portfolio-bg relative isolate min-h-[100svh] text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <CoolBackground />

      {/* Top Header */}
      <header className="fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-7xl flex items-center justify-between px-5 py-2 rounded-full border border-black/10 dark:border-white/10 bg-white/30 dark:bg-black/40 backdrop-blur-md shadow-sm">
        <div className="flex items-center gap-2 font-mono text-xs text-gray-700 dark:text-gray-300">
          <Terminal className="w-3.5 h-3.5 text-pink-500 animate-pulse" />
          <span className="font-semibold text-gray-900 dark:text-white">hexctl</span>
          <span className="text-gray-400 dark:text-gray-500">/</span>
          <Link href="/" className="text-gray-500 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400 transition-colors">portfolio</Link>
          <span className="text-gray-400 dark:text-gray-500">/</span>
          <span className="text-pink-600 dark:text-pink-400 font-medium">simulation</span>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono">
          <span className="hidden sm:inline-block px-3 py-0.5 rounded-full bg-black/5 dark:bg-white/10 text-gray-600 dark:text-gray-400 border border-black/5 dark:border-white/10">
            {currentTime || "--:--"}
          </span>
          <DarkModeToggle />
        </div>
      </header>

      <PageTransition>
        <div className="relative z-10 pt-24 pb-16 max-w-7xl mx-auto px-4 lg:px-8">

          {/* Page Header */}
          <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-black/10 dark:border-white/10 pb-8">
            <div className="space-y-2">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-pink-600 dark:text-pink-400 hover:text-pink-500 dark:hover:text-pink-300 transition-colors mb-3"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                back
              </Link>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                Interactive<br />
                <span className="text-pink-600 dark:text-pink-400">Simulations.</span>
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-mono max-w-sm mt-2">
                Math models, algorithms, and systems — visualized live in the browser.
              </p>
            </div>
            <span className="text-xs font-mono px-3 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-gray-500 dark:text-gray-400 h-fit">
              {sims.length} simulations
            </span>
          </div>

          {/* Two-column layout: sidebar + viewer */}
          <div className="flex flex-col lg:flex-row gap-8">

            {/* Left: sim selector */}
            <aside className="lg:w-72 shrink-0 space-y-2">
              {sims.map((sim, index) => (
                <SimCard
                  key={sim.id}
                  sim={sim}
                  index={index}
                  active={activeSimId === sim.id}
                  onClick={() => setActiveSimId(sim.id)}
                />
              ))}
            </aside>

            {/* Right: viewer */}
            <div className="flex-1 min-w-0">
              <SimViewer sim={activeSim} />
            </div>

          </div>

          {/* Footer */}
          <div className="mt-16 pt-6 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-500 dark:text-gray-400">
            <span>wayne.obial — interactive simulations</span>
            <Link href="/" className="inline-flex items-center gap-1.5 text-pink-600 dark:text-pink-400 hover:underline">
              <ArrowLeft className="w-3 h-3" /> back to home
            </Link>
          </div>

        </div>
      </PageTransition>
    </main>
  );
}
