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

      <footer id="partners">
        <Partners />
        <div className="bg-white pb-6 text-center text-slate-600 text-sm border-t border-slate-200">© {new Date().getFullYear()} Capitalized</div>
      </footer>
      <StickyBar />
    </div>
  );
}
