import { MessageCircle, Phone } from "lucide-react";
import { CONTACT, whatsappLink } from "../data/offer";

export const WhatsAppButton = ({ text, label = "WhatsApp Us", className = "" }) => (
  <a
    href={whatsappLink(text)}
    target="_blank"
    rel="noopener noreferrer"
    className={`inline-flex items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-brand-dark ${className}`}>
    <MessageCircle size={18} aria-hidden="true" />
    {label}
  </a>
);

export const CallButton = ({ label = "Call Now", className = "" }) => (
  <a
    href={`tel:${CONTACT.phone}`}
    className={`inline-flex items-center justify-center gap-2 rounded-full border-2 border-ink px-5 py-3 text-sm font-bold text-ink transition hover:bg-ink hover:text-white ${className}`}>
    <Phone size={18} aria-hidden="true" />
    {label}
  </a>
);
