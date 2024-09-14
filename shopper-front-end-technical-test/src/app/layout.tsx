import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Medição de gás e água",
  description: "Sistema de medição de gás e água",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  );
}
