import { MessageCircle, Phone } from "lucide-react";
import { CONTACT, whatsappLink } from "../data/offer";

// Always-visible contact bar on phones, where most landing-page traffic comes from.
const StickyBar = () => (
  <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-slate-200 bg-white sm:hidden">
    <a href={`tel:${CONTACT.phone}`} className="flex items-center justify-center gap-2 py-4 text-sm font-bold">
      <Phone size={18} aria-hidden="true" /> Call
    </a>
    <a
      href={whatsappLink("Hi, I want to know about the FWG gym access offer.")}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-2 bg-brand py-4 text-sm font-bold text-white">
      <MessageCircle size={18} aria-hidden="true" /> WhatsApp
    </a>
  </div>
);

export default StickyBar;
