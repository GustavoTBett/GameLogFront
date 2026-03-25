import type { Metadata } from "next";
import StyleRegistry from "@/lib/StyleRegistry";

import { AppThemeProvider } from "@/lib/ThemeProvider";

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
          
          <AppThemeProvider>
            
            <main>{children}</main>
            
          </AppThemeProvider>
          
        </StyleRegistry>
      </body>
    </html>
  );
}
