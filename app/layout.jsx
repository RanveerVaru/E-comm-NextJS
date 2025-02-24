import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ProductProvider } from "./context/ProductContext";
import Navbar from "./components/Navbar";
import ToasterProvider from "./components/ToastProvide";

export const metadata = {
  title: "E-comm Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <script src="https://unpkg.com/@tailwindcss/browser@4"></script>
      </head>
      <body>
        <ProductProvider>
          <Navbar />
          <ToasterProvider />
          {children}
          </ProductProvider>
        
      </body>
    </html>
  );
}
