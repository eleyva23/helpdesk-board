// src/app/layout.jsx
import "./globals.css";

export const metadata = {
  title: "Helpdesk Board",
  description: "Helpdesk ticket board with filters, search, and live updates.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

