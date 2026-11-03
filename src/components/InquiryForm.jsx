import { useEffect, useRef, useState } from "react";
import { Check, CheckCircle2, ChevronDown, Loader2, Send } from "lucide-react";
import { API_BASE, BRANCHES, GYM_MEMBERSHIP, INQUIRY_PLANS, INQUIRY_SUBJECT_PREFIX, NOT_SURE_PLAN } from "../data/offer";
import { WhatsAppButton } from "./Buttons";
import { withVisitorTracking } from "../crm/fg-crm-tracking";

// Plan cards fire this event so their "Send Enquiry" button pre-selects the plan here.
export const SELECT_PLAN_EVENT = "fwg:select-plan";

const PLAN_OPTIONS = [...INQUIRY_PLANS, NOT_SURE_PLAN];
const EMPTY = { name: "", mobile: "", email: "", plan: "", branch: "", message: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validate = (form) => {
  const errors = {};
  if (form.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!/^[6-9]\d{9}$/.test(form.mobile)) errors.mobile = "Enter a valid 10-digit mobile number.";
  if (!EMAIL_RE.test(form.email.trim())) errors.email = "Enter a valid email address.";
  if (!form.plan) errors.plan = "Choose a plan.";
  if (!form.branch) errors.branch = "Choose a branch.";
  if (form.plan === GYM_MEMBERSHIP.id && form.branch && form.branch !== "adajan") {
    errors.branch = "The Gym Membership is valid only at the Adajan branch.";
  }
  return errors;
};

const Field = ({ label, error, id, children }) => (
  <div>
    <label htmlFor={id} className="mb-1.5 block text-sm font-bold text-slate-700">
      {label}
    </label>
    {children}
    {error && (
      <p id={`${id}-error`} className="mt-1 text-xs font-semibold text-red-600">
        {error}
      </p>
    )}
  </div>
);

// Themed replacement for <select>: the native option list can't be styled, so it showed the
// browser's blue highlight. Keyboard: arrows / Home / End move, Enter or Space picks, Esc closes.
const ThemedSelect = ({ id, value, onChange, options, placeholder, error }) => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const rootRef = useRef(null);
  const listRef = useRef(null);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return undefined;
    const close = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("touchstart", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("touchstart", close);
    };
  }, [open]);

  useEffect(() => {
    if (open) listRef.current?.children[active]?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  const openList = () => {
    setActive(Math.max(options.findIndex((o) => o.value === value), 0));
    setOpen(true);
  };

  const pick = (option) => {
    onChange(option.value);
    setOpen(false);
  };

  const onKeyDown = (e) => {
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        openList();
      }
      return;
    }
    if (e.key === "ArrowDown") setActive((i) => Math.min(i + 1, options.length - 1));
    else if (e.key === "ArrowUp") setActive((i) => Math.max(i - 1, 0));
    else if (e.key === "Home") setActive(0);
    else if (e.key === "End") setActive(options.length - 1);
    else if (e.key === "Enter" || e.key === " ") pick(options[active]);
    else if (e.key === "Escape" || e.key === "Tab") {
      setOpen(false);
      if (e.key === "Tab") return;
    } else return;
    e.preventDefault();
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        id={id}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        aria-activedescendant={open ? `${id}-opt-${active}` : undefined}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
        className={`${inputClass(error)} flex items-center justify-between gap-2 text-left ${open ? "border-brand ring-2 ring-brand/30" : ""}`}>
        <span className={`truncate ${selected ? "text-ink" : "text-slate-400"}`}>{selected ? selected.label : placeholder}</span>
        <ChevronDown size={18} className={`shrink-0 text-brand-dark transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>

      {open && (
        <ul
          ref={listRef}
          id={`${id}-list`}
          role="listbox"
          aria-labelledby={id}
          className="absolute left-0 right-0 z-30 mt-2 max-h-64 overflow-auto rounded-2xl border border-brand/30 bg-white p-1.5 shadow-xl shadow-brand/10">
          {options.map((option, i) => {
            const isSelected = option.value === value;
            const isActive = i === active;
            return (
              <li
                key={option.value}
                id={`${id}-opt-${i}`}
                role="option"
                aria-selected={isSelected}
                onMouseEnter={() => setActive(i)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => pick(option)}
                className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                  isSelected
                    ? "bg-brand font-bold text-white"
                    : isActive
                      ? "bg-brand-soft font-semibold text-brand-dark"
                      : "text-slate-700"
                }`}>
                <span>{option.label}</span>
                {isSelected && <Check size={16} className="shrink-0" aria-hidden="true" />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

const inputClass = (error) =>
  `w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/30 ${
    error ? "border-red-400" : "border-slate-300"
  }`;

const InquiryForm = () => {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    const onSelect = (e) => {
      const planId = e.detail;
      if (!PLAN_OPTIONS.some((p) => p.id === planId)) return;
      setForm((f) => ({ ...f, plan: planId, branch: planId === GYM_MEMBERSHIP.id ? "adajan" : f.branch }));
      setErrors((er) => ({ ...er, plan: undefined, branch: undefined }));
      setStatus((s) => (s === "sent" ? "idle" : s));
    };
    window.addEventListener(SELECT_PLAN_EVENT, onSelect);
    return () => window.removeEventListener(SELECT_PLAN_EVENT, onSelect);
  }, []);

  const setField = (key) => (value) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const update = (key) => (e) => {
    let value = e.target.value;
    if (key === "mobile") {
      value = value.replace(/\D/g, "");
      if (value.length > 10 && value.startsWith("91")) value = value.slice(2); // pasted "+91 98765 43210"
      value = value.slice(0, 10);
    }
    setField(key)(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length) return;

    const plan = PLAN_OPTIONS.find((p) => p.id === form.plan);
    const branch = BRANCHES.find((b) => b.id === form.branch);
    const note = form.message.trim();

    setStatus("sending");
    setServerError("");
    try {
      // withVisitorTracking adds the visitor id (when the visitor agreed), so the enquiry joins their CRM lead
      const payload = await withVisitorTracking({
        name: form.name.trim(),
        mobile: form.mobile,
        email: form.email.trim(),
        // e.g. "FWG Gym Offer - Gym Plan (₹24,000) - Vesu"
        subject: `${INQUIRY_SUBJECT_PREFIX} - ${plan.id === NOT_SURE_PLAN.id ? "Help Choosing a Plan" : plan.label} - ${branch.name}`,
        message: [`Plan: ${plan.label}`, `Preferred branch: ${branch.name}`, `Message: ${note || "-"}`].join("\n"),
        source: window.location.href,
        details: {
          leadType: "fwg_gym_offer",
          plan_id: plan.id,
          plan: plan.label,
          preferred_branch: branch.name,
        },
      });
      const res = await fetch(`${API_BASE}/public/v1/contact-inquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json?.message || "Could not send your enquiry.");
      setStatus("sent");
      setForm(EMPTY);
    } catch (err) {
      setServerError(err.message || "Could not send your enquiry.");
      setStatus("error");
    }
  };

  return (
    <section id="enquire" className="scroll-mt-20 bg-ink py-16 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-brand">Free call back</p>
          <h2 className="mt-2 text-2xl font-extrabold sm:text-4xl">Send an enquiry</h2>
          <p className="mt-3 text-slate-300">
            Tell us which plan and branch you're interested in. Our team will call you back to confirm the details and get you started.
          </p>
          <p className="mt-6 text-sm text-slate-400">Prefer chatting?</p>
          <WhatsAppButton text="Hi, I want to know about the FWG gym access offer." className="mt-2" />
        </div>

        <div className="rounded-3xl bg-white p-6 text-ink shadow-xl sm:p-8">
          {status === "sent" ? (
            <div className="py-10 text-center" role="status">
              <CheckCircle2 size={48} className="mx-auto text-brand" aria-hidden="true" />
              <p className="mt-4 text-xl font-extrabold">Thank you! Your enquiry has been sent.</p>
              <p className="mt-2 text-sm text-slate-600">Our team will call you back shortly.</p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-6 text-sm font-bold text-brand-dark underline underline-offset-4">
                Send another enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="grid gap-4 sm:grid-cols-2">
              <Field label="Full name" id="inq-name" error={errors.name}>
                <input
                  id="inq-name"
                  autoComplete="name"
                  value={form.name}
                  onChange={update("name")}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "inq-name-error" : undefined}
                  className={inputClass(errors.name)}
                />
              </Field>
              <Field label="Mobile number" id="inq-mobile" error={errors.mobile}>
                <input
                  id="inq-mobile"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  placeholder="10-digit number"
                  value={form.mobile}
                  onChange={update("mobile")}
                  aria-invalid={!!errors.mobile}
                  aria-describedby={errors.mobile ? "inq-mobile-error" : undefined}
                  className={inputClass(errors.mobile)}
                />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Email" id="inq-email" error={errors.email}>
                  <input
                    id="inq-email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={update("email")}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "inq-email-error" : undefined}
                    className={inputClass(errors.email)}
                  />
                </Field>
              </div>
              <Field label="Plan" id="inq-plan" error={errors.plan}>
                <ThemedSelect
                  id="inq-plan"
                  value={form.plan}
                  onChange={setField("plan")}
                  options={PLAN_OPTIONS.map((p) => ({ value: p.id, label: p.label }))}
                  placeholder="Select a plan"
                  error={errors.plan}
                />
              </Field>
              <Field label="Preferred branch" id="inq-branch" error={errors.branch}>
                <ThemedSelect
                  id="inq-branch"
                  value={form.branch}
                  onChange={setField("branch")}
                  options={BRANCHES.map((b) => ({ value: b.id, label: b.name }))}
                  placeholder="Select a branch"
                  error={errors.branch}
                />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Message (optional)" id="inq-message">
                  <textarea
                    id="inq-message"
                    rows={3}
                    value={form.message}
                    onChange={update("message")}
                    placeholder="Your goal, preferred time to call, any question…"
                    className={inputClass(false)}
                  />
                </Field>
              </div>

              {status === "error" && (
                <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 sm:col-span-2" role="alert">
                  {serverError} Please try again, or reach us on WhatsApp.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-70 sm:col-span-2">
                {status === "sending" ? (
                  <Loader2 size={18} className="animate-spin" aria-hidden="true" />
                ) : (
                  <Send size={18} aria-hidden="true" />
                )}
                {status === "sending" ? "Sending…" : "Send Enquiry"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default InquiryForm;
