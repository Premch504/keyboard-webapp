import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KeyboardTrans - Thai-English Keyboard Fixer",
  description: "Fix text typed on the wrong Thai-English keyboard layout instantly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
