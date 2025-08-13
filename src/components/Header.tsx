import Link from "next/link";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur border-b border-slate-200 dark:border-slate-800">
      <div className="mx-auto max-w-6xl px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Logo />
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-700 dark:text-slate-300">
          <a href="#why" className="hover:text-blue-700 dark:hover:text-blue-400">Why Attend</a>
          <a href="#agenda" className="hover:text-blue-700 dark:hover:text-blue-400">Agenda</a>
          <a href="#previous" className="hover:text-blue-700 dark:hover:text-blue-400">Previous</a>
          <a href="#partners" className="hover:text-blue-700 dark:hover:text-blue-400">Partners</a>
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link href="/checkout" className="inline-flex items-center gap-2 rounded-lg bg-blue-600 text-white px-4 py-2 text-sm font-semibold shadow-sm hover:bg-blue-700">
            Pay Now!
          </Link>
        </div>
      </div>
    </header>
  );
}


