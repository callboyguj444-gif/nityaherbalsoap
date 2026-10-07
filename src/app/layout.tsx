import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Nitya Herbal - 100% Organic & Ayurvedic Care",
  description:
    "Pure Ayurveda, 100% Natural. Handmade organic herbal products crafted with love and ancient Ayurvedic wisdom by Nitya Herbal.",
  keywords: [
    "Nitya Herbal",
    "Ayurvedic",
    "Organic",
    "Handmade Soap",
    "Herbal Care",
    "Natural Skincare",
  ],
  icons: {
    icon: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="gu" suppressHydrationWarning>
      <body className={`${poppins.variable} antialiased`}>{children}</body>
    </html>
  );
}
