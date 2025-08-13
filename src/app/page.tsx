import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import SidebarOrder from "@/components/SidebarOrder";
import StickyBar from "@/components/StickyBar";
import Header from "@/components/Header";
import InfoGrid from "@/components/InfoGrid";
import WhyAttend from "@/components/WhyAttend";
import Agenda from "@/components/Agenda";
import PreviousEvents from "@/components/PreviousEvents";
import Partners from "@/components/Partners";
import Banner from "@/components/Banner";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="mx-auto max-w-6xl px-6 py-14 grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10">
        <section>
          <Hero />
          <Banner />

          <InfoGrid />
          <WhyAttend />
          <Agenda />
          <PreviousEvents />
        </section>

        <SidebarOrder />
      </main>

      <footer id="partners" className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <Partners />
          <div className="mt-10 text-center text-slate-500 dark:text-slate-400 text-sm">© {new Date().getFullYear()} Capitalized</div>
        </div>
      </footer>
      <StickyBar />
    </div>
  );
}
