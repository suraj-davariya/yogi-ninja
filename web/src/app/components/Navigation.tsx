"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/recipes", label: "Recipes" },
  { href: "/freezer", label: "My Freezer" },
  { href: "/grocery", label: "Grocery List" },
];

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      id="main-navigation"
      className="japandi-bg"
      style={{
        background: "var(--surface-1)",
        borderBottom: "1px solid var(--border-subtle)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: "72rem",
          margin: "0 auto",
          padding: "0 2rem",
          height: "5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          id="nav-logo"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.875rem",
            textDecoration: "none",
          }}
        >
          <div style={{ 
            width: "2.75rem", 
            height: "2.75rem", 
            background: "var(--brand-primary)", 
            borderRadius: "0.875rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.25rem",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
          }}>
            <span style={{ filter: "grayscale(1) brightness(2)" }}>🥤</span>
          </div>
          <span
            className="display-font"
            style={{
              fontSize: "1.5rem",
              color: "var(--text-primary)",
              letterSpacing: "-0.04em"
            }}
          >
            Yogi Ninja
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          aria-label="Primary navigation"
          style={{ display: "flex", gap: "1rem", alignItems: "center" }}
          className="hidden sm:flex"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
              style={{
                color: "var(--text-secondary)",
                textDecoration: "none",
                fontSize: "0.9rem",
                fontWeight: 500,
                padding: "0.5rem 1rem",
                borderRadius: "9999px",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLAnchorElement).style.color = "var(--text-primary)";
                (e.target as HTMLAnchorElement).style.background = "var(--stone-200)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLAnchorElement).style.color = "var(--text-secondary)";
                (e.target as HTMLAnchorElement).style.background = "transparent";
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/check-in"
            id="nav-cta"
            className="yogi-btn-primary"
            style={{ fontSize: "0.875rem", textDecoration: "none", marginLeft: "1rem" }}
          >
            Check-In
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          id="nav-mobile-menu-btn"
          aria-label="Toggle mobile menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex sm:hidden"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "0.5rem",
            color: "var(--text-secondary)",
            fontSize: "1.4rem",
          }}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          id="nav-mobile-menu"
          style={{
            background: "var(--surface-card)",
            borderTop: "1px solid var(--border-soft)",
            padding: "1rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.25rem",
          }}
          className="animate-fade-slide sm:hidden"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                color: "var(--text-secondary)",
                textDecoration: "none",
                fontSize: "0.95rem",
                fontWeight: 500,
                padding: "0.6rem 0.75rem",
                borderRadius: "0.75rem",
                transition: "background 0.2s ease",
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/check-in"
            onClick={() => setMenuOpen(false)}
            className="yogi-btn-primary"
            style={{
              textDecoration: "none",
              textAlign: "center",
              marginTop: "0.5rem",
              display: "block",
            }}
          >
            Daily Check-In
          </Link>
        </div>
      )}
    </header>
  );
}
