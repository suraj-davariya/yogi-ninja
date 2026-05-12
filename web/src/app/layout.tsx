import type { Metadata } from "next";
import "./globals.css";
import Navigation from "./components/Navigation";
import MedicalDisclaimer from "./components/MedicalDisclaimer";

export const metadata: Metadata = {
  title: "Yogi Ninja | Seek Your Signature Scoop",
  description:
    "Yogi Ninja helps expecting mothers safely discover and track Ninja Creami Deluxe recipes. Featuring daily nausea check-ins, a virtual freezer vault, and strict prenatal ingredient safety.",
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
      className="h-full antialiased"
    >
      <body
        className="min-h-full flex flex-col"
        style={{ 
          background: "var(--gradient-soft)", 
          color: "var(--color-text-primary)",
          backgroundAttachment: "fixed"
        }}
      >
        <MedicalDisclaimer variant="banner" />
        <Navigation />
        <main
          id="main-content"
          style={{
            flex: 1,
            width: "100%",
            margin: "0 auto",
          }}
        >
          {children}
        </main>
        <footer
          id="main-footer"
          style={{
            borderTop: "1px solid var(--color-border)",
            padding: "3rem 1.5rem",
            textAlign: "center",
            background: "var(--color-background)"
          }}
        >
          <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
            <p style={{ margin: "0 0 0.5rem", fontSize: "0.875rem", color: "var(--color-text-secondary)", fontWeight: 600 }}>
              Yogi Ninja — Mindful Precision. Unapologetic Indulgence.
            </p>
            <p style={{ margin: 0, fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
              Always consult your healthcare provider. Crafted with love for expecting mothers.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
