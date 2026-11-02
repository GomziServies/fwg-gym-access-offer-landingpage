import { Phone } from "lucide-react";
import { CONTACT } from "../data/offer";

const Header = () => (
  <header className="sticky top-0 z-30 border-b border-slate-100 bg-white/90 backdrop-blur">
    <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2">
      <a href="#top" aria-label="Fitness With Gomzi - home">
        <img src="/images/fwg-logo.png" alt="Fitness With Gomzi" width="138" height="56" className="h-12 w-auto sm:h-14" />
      </a>
      <a href={`tel:${CONTACT.phone}`} className="hidden items-center gap-2 text-sm font-semibold sm:flex">
        <Phone size={16} className="text-brand" aria-hidden="true" />
        {CONTACT.phoneDisplay}
      </a>
    </div>
  </header>
);

export default Header;
