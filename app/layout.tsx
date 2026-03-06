import type { Metadata } from "next";
import { Manrope, Sora } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700", "800"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Free AI Caricature Maker",
  description:
    "Turn your photo and text into a hilarious caricature in seconds. Powered by the nano-banana-2 model — free to try.",
  keywords: [
    "AI caricature maker",
    "caricature from photo",
    "cartoon avatar generator",
    "wedding caricature",
    "nano-banana-2",
    "nano banana",
    "free AI caricature",
    "free to try",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sora.variable} ${manrope.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
