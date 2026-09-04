"use client";

import Link from 'next/link';
import React from 'react';
import dynamic from 'next/dynamic';

// Lazy Load Lightweight Canvas Simulation Components
const Reactdiff = dynamic(() => import('../components/Reactdiff'), { ssr: false });
const Lissajous = dynamic(() => import('../components/Lissajous'), { ssr: false });
const BubbleSort = dynamic(() => import('../components/Bubblesort'), { ssr: false });
const NeuralNetwork = dynamic(() => import('../components/Neuralnetwork'), { ssr: false });

import CoolBackground from '../components/CoolBackground';
import DarkModeToggle from '../components/DarkModeToggle';
import PageTransition from '../components/PageTransition';
import BackToTop from '../components/BackToTop';
import { ArrowLeft, Terminal } from 'lucide-react';

type Sim = {
  id: number;
  label: string;
  category: string;
  description: string;
  equations: string[];
  equationNote: string;
};

const sims: Sim[] = [
  {
    id: 1,
    label: "Reaction-Diffusion",
    category: "Morphogenesis",
    description: "Visualizing Gray-Scott equations: a mathematical model of complex Turing patterns where diffusion rates, feed rate (f), and kill rate (k) determine structural evolution.",
    equations: [
      "\\frac{\\partial A}{\\partial t} = D_A \\nabla^2 A - AB^2 + f(1 - A)",
      "\\frac{\\partial B}{\\partial t} = D_B \\nabla^2 B + AB^2 - (k + f)B",
    ],
    equationNote: "Gray-Scott differential model:",
  },
  {
    id: 2,
    label: "Lissajous Curve",
    category: "Harmonic Oscillations",
    description: "Ultra-featherweight 2D parametric oscillation visualizer. Plots superposition of orthogonal harmonic signals creating dynamic geometric knots.",
    equations: [
      "x(t) = A \\sin(a t + \\delta)",
      "y(t) = B \\sin(b t)",
    ],
    equationNote: "Parametric equations:",
  },
  {
    id: 3,
    label: "Bubble Sort",
    category: "Sorting & Arrays",
    description: "Step-by-step visualization of bubble sort. Adjacent elements are repeatedly compared and swapped until the array is fully sorted.",
    equations: [
      "T(n) = O(n^2)",
      "\\text{swap if } A[j] > A[j+1]",
    ],
    equationNote: "Time complexity:",
  },
  {
    id: 4,
    label: "Neural Network",
    category: "Artificial Intelligence",
    description: "Feedforward neural network visualization. Values propagate through weighted layers and activation functions.",
    equations: [
      "a^{(l)} = \\sigma(W^{(l)}a^{(l-1)} + b^{(l)})",
      "\\text{ReLU}(x) = \\max(0, x)",
    ],
    equationNote: "Forward propagation:",
  },
];

export default function SimulationPage() {
  const sim1 = sims[0]; // Reaction-Diffusion
  const sim2 = sims[1]; // Lissajous Curve
  const sim3 = sims[2]; // Bubble Sort
  const sim4 = sims[3]; // Neural Network

  return (
    <main className="portfolio-bg relative isolate min-h-[100svh] text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <CoolBackground />

      {/* Top Header */}
      <header className="fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[95%] sm:w-[92%] max-w-4xl flex items-center justify-between px-3.5 sm:px-5 py-2 rounded-full border border-black/10 dark:border-white/10 bg-white/50 dark:bg-[#161618]/70 backdrop-blur-md shadow-sm">
        <div className="flex items-center gap-2 font-mono text-xs text-gray-700 dark:text-gray-300 min-w-0 truncate">
          <Terminal className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300 animate-pulse shrink-0" />
          <span className="font-semibold text-gray-900 dark:text-white shrink-0">hexctl</span>
          <span className="text-gray-400 dark:text-gray-500 shrink-0">/</span>
          <Link href="/" className="text-gray-500 dark:text-gray-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors shrink-0">portfolio</Link>
          <span className="text-gray-400 dark:text-gray-500 shrink-0">/</span>
          <span className="text-slate-800 dark:text-slate-200 font-medium truncate">simulation</span>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono shrink-0">
          <DarkModeToggle />
        </div>
      </header>

      <PageTransition>
        <div className="relative z-10 pt-24 pb-16 max-w-4xl mx-auto px-4 lg:px-6 w-full min-w-0 max-w-full font-mono">

          {/* Page Header */}
          <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-black/10 dark:border-white/10 pb-6">
            <div className="space-y-2 min-w-0 max-w-full">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs text-slate-800 dark:text-slate-200 hover:text-slate-600 dark:hover:text-slate-400 transition-colors mb-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                back
              </Link>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white font-sans">
                Abstract<br />
                <span className="text-slate-800 dark:text-slate-200">Simulations.</span>
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 max-w-md mt-1 font-sans leading-relaxed">
                Masonry grid layout of mathematical models, harmonic oscillations, and algorithm visualizers.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 shrink-0">
              <span className="px-3 py-1.5 rounded-none bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
                {sims.length} models
              </span>
            </div>
          </div>

          {/* Pure CSS Masonry Grid Layout with Sharp Edges */}
          <div className="columns-1 md:columns-2 gap-4 space-y-4 w-full min-w-0 max-w-full">

            {/* MASONRY ITEM 1: Lissajous Curve (Column 1 Top) */}
            <div className="break-inside-avoid rounded-none border border-black/15 dark:border-white/15 bg-black/2 dark:bg-white/3 backdrop-blur-xl p-4 sm:p-5 space-y-3 min-w-0 max-w-full overflow-hidden">
              <div className="flex items-center justify-between gap-2 border-b border-black/10 dark:border-white/10 pb-2 min-w-0 max-w-full">
                <h2 className="text-base font-bold text-gray-900 dark:text-white font-sans truncate">
                  {sim2.label}
                </h2>
                <span className="px-2 py-0.5 rounded-none bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-[10px] text-gray-500 dark:text-gray-400 shrink-0">
                  {sim2.category}
                </span>
              </div>

              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-sans min-w-0 max-w-full break-words">
                {sim2.description}
              </p>

              <div className="w-full h-[280px] rounded-none overflow-hidden border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
                <Lissajous />
              </div>
            </div>

            {/* MASONRY ITEM 2: Reaction-Diffusion (Column 2 Top) */}
            <div className="break-inside-avoid rounded-none border border-black/15 dark:border-white/15 bg-black/2 dark:bg-white/3 backdrop-blur-xl p-4 sm:p-5 space-y-3 min-w-0 max-w-full overflow-hidden">
              <div className="flex items-center justify-between gap-2 border-b border-black/10 dark:border-white/10 pb-2 min-w-0 max-w-full">
                <h2 className="text-base font-bold text-gray-900 dark:text-white font-sans truncate">
                  {sim1.label}
                </h2>
                <span className="px-2 py-0.5 rounded-none bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-[10px] text-gray-500 dark:text-gray-400 shrink-0">
                  {sim1.category}
                </span>
              </div>

              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-sans min-w-0 max-w-full break-words">
                {sim1.description}
              </p>

              <div className="rounded-none overflow-hidden border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 min-w-0 max-w-full">
                <Reactdiff />
              </div>
            </div>

            {/* MASONRY ITEM 3: Bubble Sort (Column 1 Bottom) */}
            <div className="break-inside-avoid rounded-none border border-black/15 dark:border-white/15 bg-black/2 dark:bg-white/3 backdrop-blur-xl p-4 sm:p-5 space-y-3 min-w-0 max-w-full overflow-hidden">
              <div className="flex items-center justify-between gap-2 border-b border-black/10 dark:border-white/10 pb-2 min-w-0 max-w-full">
                <h2 className="text-base font-bold text-gray-900 dark:text-white font-sans truncate">
                  {sim3.label}
                </h2>
                <span className="px-2 py-0.5 rounded-none bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-[10px] text-gray-500 dark:text-gray-400 shrink-0">
                  {sim3.category}
                </span>
              </div>

              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-sans min-w-0 max-w-full break-words">
                {sim3.description}
              </p>

              <div className="rounded-none overflow-hidden border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 min-w-0 max-w-full">
                <BubbleSort />
              </div>
            </div>

            {/* MASONRY ITEM 4: Neural Network (Column 2 Bottom) */}
            <div className="break-inside-avoid rounded-none border border-black/15 dark:border-white/15 bg-black/2 dark:bg-white/3 backdrop-blur-xl p-4 sm:p-5 space-y-3 min-w-0 max-w-full overflow-hidden">
              <div className="flex items-center justify-between gap-2 border-b border-black/10 dark:border-white/10 pb-2 min-w-0 max-w-full">
                <h2 className="text-base font-bold text-gray-900 dark:text-white font-sans truncate">
                  {sim4.label}
                </h2>
                <span className="px-2 py-0.5 rounded-none bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-[10px] text-gray-500 dark:text-gray-400 shrink-0">
                  {sim4.category}
                </span>
              </div>

              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-sans min-w-0 max-w-full break-words">
                {sim4.description}
              </p>

              <div className="rounded-none overflow-hidden border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 min-w-0 max-w-full">
                <NeuralNetwork />
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="mt-16 pt-6 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-500 dark:text-gray-400">
            <span>wayne.obial — masonry simulations</span>
            <Link href="/" className="inline-flex items-center gap-1.5 text-slate-800 dark:text-slate-200 hover:underline">
              <ArrowLeft className="w-3 h-3" /> back to home
            </Link>
          </div>

        </div>
      </PageTransition>
      <BackToTop />
    </main>
  );
}
