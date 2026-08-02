import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-gray-50 dark:bg-[#0a0a0a] text-gray-800 dark:text-gray-200 font-sans">
      <h1 className="text-6xl font-bold font-mono text-pink-600 dark:text-pink-500 mb-4">404</h1>
      <h2 className="text-xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        The requested system route does not exist.
      </p>
      <Link
        href="/"
        className="px-4 py-2 rounded-xl bg-pink-600 text-white font-mono text-xs hover:bg-pink-500 transition-colors shadow-md"
      >
        Return Home
      </Link>
    </div>
  );
}
