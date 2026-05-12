import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import MedicalDisclaimer from "./components/MedicalDisclaimer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yogi Ninja | Pregnancy-Safe Ninja Creami Recipes",
  description:
    "Yogi Ninja helps expecting mothers safely discover and track Ninja Creami Deluxe recipes. Featuring daily nausea check-ins, a virtual freezer timer, and strict prenatal ingredient safety.",
  keywords: ["Ninja Creami", "pregnancy recipes", "first trimester", "vegetarian ice cream", "nausea-friendly"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col"
        style={{ background: "var(--background)", color: "var(--foreground)" }}
      >
        <MedicalDisclaimer variant="banner" />
        <Navigation />
        <main
          id="main-content"
          style={{
            flex: 1,
            maxWidth: "72rem",
            width: "100%",
            margin: "0 auto",
            padding: "2rem 1.5rem 4rem",
          }}
        >
          {children}
        </main>
        <footer
          id="main-footer"
          style={{
            borderTop: "1px solid var(--border-soft)",
            padding: "1.5rem",
            textAlign: "center",
            fontSize: "0.8rem",
            color: "var(--text-muted)",
          }}
        >
          <p style={{ margin: 0 }}>
            🥤 Yogi Ninja — Made with love for expecting mothers.{" "}
            <span style={{ color: "var(--yogi-violet)" }}>Always consult your healthcare provider.</span>
          </p>
        </footer>
      </body>
    </html>
  );
}
