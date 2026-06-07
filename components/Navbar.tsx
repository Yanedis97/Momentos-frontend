"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, UserCircle } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const pendingMoments = 1;

  return (
    <nav style={{
      position: "sticky",
      top: 0,
      zIndex: 50,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "14px 28px",
      borderBottom: "1px solid rgba(201,168,76,0.12)",
      background: "rgba(10,10,15,0.92)",
      backdropFilter: "blur(12px)",
      fontFamily: "'DM Sans', system-ui, sans-serif",
    }}>

      <span style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: 18,
        letterSpacing: "0.08em",
        color: "#c9a84c",
      }}>
        Momentos
      </span>

      <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
        {[
          { href: "/", label: "Inicio" },
          { href: "/dashboard", label: "Dashboard" },
          { href: "/players/player_001/moments", label: "Mi historial" },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            style={{
              fontSize: 11,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: pathname === link.href ? "#c9a84c" : "#9a9590",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div style={{ position: "relative", cursor: "pointer" }}>
          <Bell size={18} color="#9a9590" />
          {pendingMoments > 0 && (
            <span style={{
              position: "absolute",
              top: -2,
              right: -2,
              width: 7,
              height: 7,
              background: "#c9a84c",
              borderRadius: "50%",
              display: "inline-block",
            }} />
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
          <UserCircle size={26} color="#9a9590" />
          <span style={{ fontSize: 12, color: "#9a9590", letterSpacing: "0.04em" }}>
            Yanedis
          </span>
        </div>
      </div>
    </nav>
  );
}