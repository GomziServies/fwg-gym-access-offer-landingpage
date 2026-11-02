import { CONTACT } from "../data/offer";
import { CallButton, WhatsAppButton } from "./Buttons";

const Footer = () => (
  <>
    <section className="mx-auto max-w-6xl px-4 py-16 text-center">
      <h2 className="text-2xl font-extrabold sm:text-3xl">Ready to start?</h2>
      <p className="mx-auto mt-3 max-w-xl text-slate-600">
        Message or call us – we'll help you pick the right plan and branch.
      </p>
      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <WhatsAppButton text="Hi, I want to join Fitness With Gomzi. Please help me pick a plan." />
        <CallButton label={`Call ${CONTACT.phoneDisplay}`} />
      </div>
    </section>
    <footer className="bg-ink px-4 pb-24 pt-8 text-center text-sm text-slate-400 sm:pb-8">
      <img src="/images/fwg-logo.png" alt="Fitness With Gomzi" width="138" height="56" loading="lazy" className="mx-auto mb-3 h-12 w-auto rounded-lg bg-white p-1" />
      <p className="mt-1">Gomzi Consulting Services Private Limited · Surat, Gujarat</p>
      <p className="mt-1">© {new Date().getFullYear()} FG Group. All rights reserved.</p>
    </footer>
  </>
);

export default Footer;
