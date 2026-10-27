import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Choose Your Cover | Insurance Plan Comparison",
  description:
    "Compare Bronze, Silver and Gold health insurance plans side by side.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
