import { BadgeCheck, MapPin, Wallet } from "lucide-react";
import { WhatsAppButton } from "./Buttons";

const Hero = () => (
  <section id="top" className="bg-gradient-to-b from-brand-soft to-white">
    <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-14 pt-10 sm:pt-14 lg:grid-cols-2">
      <div className="text-center lg:text-left">
        <p className="mb-3 inline-block rounded-full bg-white px-4 py-1 text-xs font-bold uppercase tracking-wider text-brand-dark shadow-sm">
          Gym Access Offer · Surat
        </p>
        <h1 className="text-3xl font-extrabold leading-tight sm:text-5xl">Pick the plan that fits how you train</h1>
        <p className="mt-4 text-base text-slate-600 sm:text-lg">
          Full-year gym access, a guided plan with diet and exercise support, or our step-by-step RTP Program – all at Fitness With Gomzi.
        </p>
        <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row lg:items-start">
          <a href="#plans" className="inline-flex items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-bold text-white transition hover:bg-slate-700">
            See Plans & Pricing
          </a>
          <a href="#enquire" className="inline-flex items-center justify-center rounded-full border-2 border-ink px-6 py-3 text-sm font-bold text-ink transition hover:bg-ink hover:text-white">
            Get a Call Back
          </a>
          <WhatsAppButton text="Hi, I want to know about the FWG gym access offer." />
        </div>
      </div>

      <div className="relative">
        <img
          src="/images/gym-1.webp"
          alt="Strength training floor at the Fitness With Gomzi gym"
          width="1500"
          height="1500"
          fetchpriority="high"
          className="aspect-[4/3] w-full rounded-3xl object-cover shadow-xl"
        />
        <div className="absolute -bottom-5 left-4 rounded-2xl bg-white px-5 py-3 shadow-lg sm:left-6">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Plans from</p>
          <p className="text-2xl font-extrabold text-brand-dark">₹12,000</p>
        </div>
        <div className="absolute -top-4 right-4 rounded-2xl bg-ink px-4 py-2 text-white shadow-lg sm:right-6">
          <p className="text-sm font-bold">No-cost EMI</p>
          <p className="text-xs text-slate-300">on RTP Phase 2</p>
        </div>
      </div>
    </div>

    <ul className="mx-auto grid max-w-6xl gap-3 px-4 pb-14 text-left sm:grid-cols-3">
      {[
        { icon: MapPin, title: "3 branches", text: "Adajan, Vesu & Katargam" },
        { icon: BadgeCheck, title: "Plans from ₹12,000", text: "21-day RTP Phase 1 to full-year access" },
        { icon: Wallet, title: "No-cost EMI", text: "On RTP Phase 2 (3 & 6 months)" },
      ].map(({ icon: Icon, title, text }) => (
        <li key={title} className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm">
          <Icon size={22} className="mt-0.5 shrink-0 text-brand" aria-hidden="true" />
          <span>
            <span className="block font-bold">{title}</span>
            <span className="text-sm text-slate-600">{text}</span>
          </span>
        </li>
      ))}
    </ul>
  </section>
);

export default Hero;
