import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export default function SectionPageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-[#090908]">
      <Navbar />
      <WhatsAppFloat />
      {/* Offset for the fixed navbar */}
      <main className="pt-[76px]">{children}</main>
      <Footer />
    </div>
  );
}
