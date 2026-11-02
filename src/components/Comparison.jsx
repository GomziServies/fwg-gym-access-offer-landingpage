import { Check, X } from "lucide-react";
import { COMPARISON } from "../data/offer";

const Cell = ({ value }) => {
  if (value === true) return <Check size={20} className="mx-auto text-brand" aria-label="Included" />;
  if (value === false) return <X size={20} className="mx-auto text-slate-300" aria-label="Not included" />;
  if (value === null) return <span className="text-slate-400" title="Ask us">—</span>;
  return <span className="text-sm font-semibold">{value}</span>;
};

const COLUMNS = [
  { key: "membership", title: "Gym Membership" },
  { key: "guided", title: "Gym Plan" },
  { key: "rtp", title: "RTP Program", sub: "Phase 1 & 2", highlight: true },
];

const Comparison = () => (
  <section className="bg-slate-50 py-16">
    <div className="mx-auto max-w-5xl px-4">
      <h2 className="text-center text-2xl font-extrabold sm:text-3xl">Compare plans</h2>
      <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="w-full min-w-[640px] text-center">
          <thead>
            <tr className="border-b border-slate-200 text-sm">
              <th className="p-4 text-left font-bold">Feature</th>
              {COLUMNS.map((col) => (
                <th key={col.key} className={`p-4 font-bold ${col.highlight ? "bg-brand-soft" : ""}`}>
                  {col.title}
                  {col.sub && <span className="block text-xs font-semibold text-brand-dark">{col.sub}</span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPARISON.map((row) => (
              <tr key={row.feature} className="border-b border-slate-100 last:border-0">
                <th scope="row" className="p-4 text-left text-sm font-semibold">{row.feature}</th>
                {COLUMNS.map((col) => (
                  <td key={col.key} className={`p-4 ${col.highlight ? "bg-brand-soft/60" : ""}`}>
                    <Cell value={row[col.key]} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </section>
);

export default Comparison;
