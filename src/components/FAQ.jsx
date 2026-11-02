import { ChevronDown } from "lucide-react";
import { FAQS } from "../data/offer";

const FAQ = () => (
  <section className="bg-slate-50 py-16">
    <div className="mx-auto max-w-3xl px-4">
      <h2 className="text-center text-2xl font-extrabold sm:text-3xl">Questions</h2>
      <div className="mt-8 space-y-3">
        {FAQS.map(({ q, a }) => (
          <details key={q} className="group rounded-2xl border border-slate-200 bg-white p-5 open:shadow-sm">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold">
              {q}
              <ChevronDown size={20} className="shrink-0 transition group-open:rotate-180" aria-hidden="true" />
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{a}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
);

export default FAQ;
