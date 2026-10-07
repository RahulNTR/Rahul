import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Script Sahayak",
  description: "The AI development room for Indian storytellers. From idea to screenplay.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
