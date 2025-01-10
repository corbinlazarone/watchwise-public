import "./globals.css";
import React from "react";
import { UserProvider } from "./utils/user-context";
import BuyMeCoffeeButton from "./components/butMeACoffee";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <UserProvider>{children}</UserProvider>
        <BuyMeCoffeeButton />
      </body>
    </html>
  );
}
