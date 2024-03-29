import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./variables.css";
import "./theme.css";
import OverlayWrapper from "@/components/molecules/popupOverlay/overlayWrapper";

const inter = Inter({
  weight: ["400"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mina Names",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
