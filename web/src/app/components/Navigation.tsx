"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Typewriter from "./Typewriter";

export default function Navigation() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const pathname = usePathname();

  useEffect(() => {
    const savedTheme = localStorage.getItem("yogi-theme") as "light" | "dark";
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("yogi-theme", newTheme);
  };

  return (
    <nav
      style={{
        padding: "1.5rem 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid var(--color-border)",
        background: "var(--color-surface-glass)",
        backdropFilter: "blur(10px)",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "var(--shadow-navigation)"
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Link 
          href="/" 
          className="logo-gradient"
          style={{ 
            fontSize: "1.5rem", 
            fontWeight: 900, 
            textDecoration: "none", 
            letterSpacing: "-0.04em" 
          }}
        >
          YOGI NINJA
        </Link>
        <div style={{ height: "1.2rem", overflow: "hidden" }}>
          <Typewriter 
            variant="oracle"
            lines={[
              "Spin. Craft. Repeat.",
              "Your Ninja. Your rules.",
              "Artisan precision.",
              "Mindful mastery."
            ]}
            startDelay={1200}
            className="mono-font"
            style={{ 
              fontSize: "0.65rem", 
              color: "var(--color-primary)", 
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontWeight: 700
            }}
          />
        </div>
      </div>

      <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          {[
            { label: "Discover", path: "/" },
            { label: "The Vault", path: "/#main-tabs" },
            { label: "Community", path: "/community" },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.path}
              style={{
                textDecoration: "none",
                fontSize: "0.875rem",
                fontWeight: 600,
                color: pathname === link.path ? "var(--color-primary)" : "var(--color-text-secondary)",
                transition: "color var(--duration-fast) ease"
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Theme Toggle Switch */}
        <button
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          style={{
            background: "var(--color-accent-soft)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-pill)",
            padding: "0.4rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            transition: "all var(--duration-medium) cubic-bezier(0.2, 1, 0.2, 1)",
            position: "relative",
            width: "3.5rem"
          }}
        >
          <div
            style={{
              width: "1.25rem",
              height: "1.25rem",
              background: "var(--color-primary)",
              borderRadius: "50%",
              transform: theme === "light" ? "translateX(0)" : "translateX(1.4rem)",
              transition: "transform var(--duration-medium) cubic-bezier(0.2, 1, 0.2, 1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.7rem",
              color: "var(--color-text-inverse)",
              boxShadow: "var(--shadow-sm)"
            }}
          >
            {theme === "light" ? "☀️" : "🌙"}
          </div>
        </button>
      </div>
    </nav>
  );
}
