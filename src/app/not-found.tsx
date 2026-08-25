import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-white dark:bg-black text-gray-800 dark:text-gray-200 font-sans">
      <h1 className="text-6xl font-bold font-mono text-slate-800 dark:text-slate-200 mb-4">404</h1>
      <h2 className="text-xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        The requested system route does not exist.
      </p>
      <Link
        href="/"
        className="px-4 py-2 rounded-xl bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 font-mono text-xs hover:bg-slate-900 dark:hover:bg-white transition-colors shadow-md"
      >
        Return Home
      </Link>
    </div>
  );
}
