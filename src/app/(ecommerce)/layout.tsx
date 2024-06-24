import Footer from "@/components/common/Footer";
import { Navbar } from "@/components/common/Navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "E-commerce app",
  description: "Achetez et vendez en ligne gratuitement",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-7xl container">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
