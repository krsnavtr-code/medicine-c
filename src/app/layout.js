import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: "Medicine",
  description: "Medicine Selling Platform",
  keywords: ["medicine", "selling", "platform", "medicine selling", "medicine platform"],
  author: "Krishna Avtar",
};

// This is a server component that wraps the client LayoutWrapper
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-bg text-text transition-colors duration-200 min-h-screen" suppressHydrationWarning>
        <AuthProvider>
          <ThemeProvider>
            <LayoutWrapper>{children}</LayoutWrapper>
            <Toaster 
              position="top-center"
              toastOptions={{
                style: {
                  background: 'var(--container-color)',
                  color: 'var(--text-color)',
                  border: '1px solid var(--border-color)',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                }
              }}
            />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
