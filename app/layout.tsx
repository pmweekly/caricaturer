import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Manrope, Sora } from "next/font/google";
import { Providers } from "@/components/providers";
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
  title: "AI Wedding Caricature Maker",
  description:
    "Turn your photo into a wedding-ready caricature illustration with preset prompts, Google sign-in, and premium upgrades.",
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
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const shouldLoadGa = process.env.NODE_ENV === "production" && Boolean(gaId);

  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="TgMP1zp2GGrnbhH6aTl64lRe_7SAq781duPVwd-6SU0" />
      </head>
      <body className={`${sora.variable} ${manrope.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
      {shouldLoadGa ? <GoogleAnalytics gaId={gaId as string} /> : null}
    </html>
  );
}
