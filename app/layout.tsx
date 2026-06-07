import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Momentos — Motor Narrativo Histórico",
  description: "Revive los momentos que cambiaron la historia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
