'use client'
import { Geist, Geist_Mono, Nunito } from "next/font/google"; // Ensure Nunito is imported
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

// Instantiate Geist Sans
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Instantiate Geist Mono
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// --- Instantiate Nunito ---
const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito", // Define a CSS variable name
  // Optional: Add weights if needed, e.g., weight: ['400', '700']
  // Optional: Add display strategy
  // display: 'swap',
});

export default function RootLayout({ children }) {
  return (
    // Ensure the html tag has the Nunito variable if you want fallbacks at the root
    // Or just apply directly to body as below
    <html lang="en" className={`${nunito.variable} ${geistSans.variable} ${geistMono.variable}`}>
      <body
        // Add the nunito variable alongside the others
        // The actual font application happens in CSS using these variables
        className={`font-sans antialiased`} // Use a base Tailwind class like font-sans which we'll define in CSS
      >
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {children}
            <Toaster />
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}