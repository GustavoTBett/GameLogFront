"use client";

import { Footer } from "@/components/layout/Footer/Footer";
import { Header } from "@/components/layout/Header/Header";

export default function HomeClient() {
  return (
    <>
    <Header isLoggedIn={true} />
    <div>
      <h1>Página Inicial</h1>
      <p>Teste de renderização com Styled Components</p>
    </div>
    <Footer />
    </>
  );
}
