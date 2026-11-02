import { MapPin } from "lucide-react";
import { BRANCHES } from "../data/offer";

const Branches = () => (
  <section id="branches" className="mx-auto max-w-6xl px-4 py-16">
    <h2 className="text-center text-2xl font-extrabold sm:text-3xl">Our branches in Surat</h2>
    <p className="mx-auto mt-3 max-w-xl text-center text-slate-600">
      The Gym Membership is valid only at Adajan. All other plans are available across our branches.
    </p>
    <div className="mt-8 grid gap-4 md:grid-cols-3">
      {BRANCHES.map((branch) => (
        <a
          key={branch.id}
          href={branch.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-brand hover:shadow-md">
          <span className="flex items-center gap-2 text-lg font-extrabold">
            <MapPin size={20} className="text-brand" aria-hidden="true" />
            {branch.name}
            {branch.id === "adajan" && (
              <span className="rounded-full bg-amber-50 px-2 py-0.5 text-xs font-bold text-amber-800">Gym Membership</span>
            )}
          </span>
          <span className="mt-2 block text-sm text-slate-600">{branch.address}</span>
          <span className="mt-3 block text-sm font-bold text-brand-dark group-hover:underline">Open in Maps →</span>
        </a>
      ))}
    </div>
  </section>
);

export default Branches;
