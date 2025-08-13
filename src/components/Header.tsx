import Link from "next/link";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200">
      <div className="mx-auto max-w-6xl px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Logo />
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-700">
          <a href="#why" className="hover:text-blue-700">Why Attend</a>
          <a href="#agenda" className="hover:text-blue-700">Agenda</a>
          <a href="#previous" className="hover:text-blue-700">Previous</a>
          <a href="#partners" className="hover:text-blue-700">Partners</a>
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/checkout" className="group inline-flex items-center gap-2 rounded-2xl bg-blue-600 text-white px-6 py-3 text-sm font-bold shadow-lg hover:bg-blue-700 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 animate-pulse-slow">
            <svg className="w-4 h-4 group-hover:animate-bounce transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
            <span className="group-hover:animate-pulse">Pay Now!</span>
          </Link>
        </div>
      </div>
    </header>
  );
}


