import TanstackQueryProvider from "@/components/partials/providers/TanstackQueryProvider";
import "./globals.css";
import Header from "@/components/templates/header";
import Footer from "@/components/templates/footer";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "تورینو",
  description: "سایت گردشگری تورینو",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl" >
      <body >
        <TanstackQueryProvider>
          <Header />
          <main className="min-h-svh">{children}</main>
          <Footer />
        </TanstackQueryProvider>
        <Toaster/>
      </body>
    </html>
  );
}
