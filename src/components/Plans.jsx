import { Check, MapPin, Send, X } from "lucide-react";
import { GYM_MEMBERSHIP, GUIDED_PLAN, RTP_PHASES, formatPrice } from "../data/offer";
import { CallButton, WhatsAppButton } from "./Buttons";
import { SELECT_PLAN_EVENT } from "./InquiryForm";

const PlanCard = ({ plan, badge, highlight, image, children }) => (
  <article
    className={`flex flex-col overflow-hidden rounded-3xl border bg-white p-6 shadow-sm ${
      highlight ? "border-brand ring-2 ring-brand/30" : "border-slate-200"
    }`}>
    {image && (
      <img
        src={image.src}
        alt={image.alt}
        width="1500"
        height="1500"
        loading="lazy"
        className="-mx-6 -mt-6 mb-5 aspect-[16/9] w-[calc(100%+3rem)] max-w-none object-cover"
      />
    )}
    {badge && (
      <span className="mb-3 self-start rounded-full bg-brand-soft px-3 py-1 text-xs font-bold text-brand-dark">{badge}</span>
    )}
    <h3 className="text-xl font-extrabold">{plan.name}</h3>
    {plan.tagline && <p className="mt-1 text-sm text-slate-600">{plan.tagline}</p>}
    <p className="mt-4 text-3xl font-extrabold">
      {formatPrice(plan.price)}
      {plan.period && <span className="text-base font-semibold text-slate-500"> / {plan.period}</span>}
    </p>
    {children}
    <div className="mt-auto flex flex-col gap-2 pt-6">
      <WhatsAppButton text={`Hi, I want to join the ${plan.name} (${formatPrice(plan.price)}) at Fitness With Gomzi.`} label="Join on WhatsApp" />
      <a
        href="#enquire"
        onClick={() => window.dispatchEvent(new CustomEvent(SELECT_PLAN_EVENT, { detail: plan.id }))}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-700">
        <Send size={18} aria-hidden="true" />
        Send Enquiry
      </a>
      <CallButton />
    </div>
  </article>
);

const IncludeList = ({ items, excluded }) => (
  <ul className="mt-5 space-y-2 text-sm">
    {items.map((item) => (
      <li key={item} className="flex gap-2">
        <Check size={18} className="shrink-0 text-brand" aria-hidden="true" />
        {item}
      </li>
    ))}
    {excluded?.map((item) => (
      <li key={item} className="flex gap-2 text-slate-400">
        <X size={18} className="shrink-0" aria-hidden="true" />
        <span>
          <span className="sr-only">Not included: </span>
          {item}
        </span>
      </li>
    ))}
  </ul>
);

const Plans = () => (
  <section id="plans" className="mx-auto max-w-6xl px-4 py-16">
    <h2 className="text-center text-2xl font-extrabold sm:text-4xl">Plans & Pricing</h2>
    <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
      Three ways to train with us – choose how much guidance you want.
    </p>

    <div className="mt-10 grid gap-6 md:grid-cols-2">
      <PlanCard plan={GYM_MEMBERSHIP} badge="Gym access only" image={{ src: "/images/gym-2.webp", alt: "Gym floor at the Adajan branch" }}>
        <p className="mt-3 flex items-center gap-2 rounded-xl bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-800">
          <MapPin size={16} aria-hidden="true" />
          {GYM_MEMBERSHIP.branchNote}
        </p>
        <IncludeList items={GYM_MEMBERSHIP.includes} excluded={GYM_MEMBERSHIP.excludes} />
      </PlanCard>

      <PlanCard plan={GUIDED_PLAN} badge="Guided" highlight image={{ src: "/images/diet.webp", alt: "Healthy meal bowl - diet plan included" }}>
        <IncludeList items={GUIDED_PLAN.includes} />
      </PlanCard>
    </div>

    <div className="mt-14">
      <div className="relative overflow-hidden rounded-3xl">
        <img
          src="/images/gym-3.webp"
          alt="Member training with a barbell"
          width="1500"
          height="1500"
          loading="lazy"
          className="aspect-[21/9] w-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 to-ink/20" />
        <div className="absolute inset-0 flex flex-col justify-center p-6 text-white sm:p-10">
          <p className="text-xs font-bold uppercase tracking-wider text-brand">Phase by phase</p>
          <p className="mt-1 text-2xl font-extrabold sm:text-4xl">RTP Program</p>
          <p className="mt-2 max-w-md text-sm text-slate-200 sm:text-base">Start with 21 days, then keep going with 3 or 6 months.</p>
        </div>
      </div>
      <h3 className="sr-only">RTP Program</h3>
      <p className="mx-auto mt-2 max-w-2xl text-center text-slate-600">
        Our step-by-step transformation program. Start with Phase 1, then continue into Phase 2.
      </p>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {RTP_PHASES.map((phase) => (
          <PlanCard key={phase.id} plan={{ ...phase, period: phase.duration }} badge={phase.phase}>
            {phase.emi ? (
              <p className="mt-3 rounded-xl bg-brand-soft px-3 py-2 text-sm font-semibold text-brand-dark">
                or No-cost EMI: {phase.emi.months} × {formatPrice(phase.emi.amount)}/month
              </p>
            ) : (
              <p className="mt-3 text-sm text-slate-600">The starting phase of the RTP Program.</p>
            )}
          </PlanCard>
        ))}
      </div>
    </div>
  </section>
);

export default Plans;
