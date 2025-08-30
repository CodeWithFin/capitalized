import Link from "next/link";
import Logo from "@/components/Logo";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200">
      <div className="mx-auto max-w-6xl px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Logo />
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-700">
          <a href="#why" className="hover:text-blue-700">About</a>
          <a href="#agenda" className="hover:text-blue-700">Agenda</a>
          <a href="#previous" className="hover:text-blue-700">Previous</a>
          <a href="#partners" className="hover:text-blue-700">Partners</a>
        </nav>
      </div>
    </header>
  );
}


