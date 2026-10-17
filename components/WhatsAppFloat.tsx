import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/923246262754?text=Hi%20I%20want%20to%20book%20a%20profile"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-[99999] flex h-20 w-20 items-center justify-center rounded-full border border-[#c49a52]/30 bg-[#25D366] text-white shadow-[0_10px_30px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-105 hover:shadow-[0_15px_35px_rgba(37,211,102,0.5)]"
    >
      <FaWhatsapp className="h-10 w-10 text-white" />
    </a>
  );
}
