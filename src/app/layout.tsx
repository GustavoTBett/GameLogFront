import type { Metadata } from "next";
import StyleRegistry from "@/lib/StyleRegistry";
import { AppThemeProvider } from "@/lib/ThemeProvider";
import { AuthProvider } from "@/lib/AuthContext";
import ClientLayout from "./ClientLayout";

export const metadata: Metadata = {
  title: "teste",
  description: "teste",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body>
        <StyleRegistry>
          <AuthProvider>
            <AppThemeProvider>
              <ClientLayout>
                <main>{children}</main>
              </ClientLayout>
            </AppThemeProvider>
          </AuthProvider>
        </StyleRegistry>
      </body>
    </html>
  );
}
