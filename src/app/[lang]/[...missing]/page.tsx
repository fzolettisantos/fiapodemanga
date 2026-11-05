import { notFound } from "next/navigation";

/** Qualquer URL inexistente cai aqui e mostra a página 404 no idioma da rota. */
export default function CatchAll() {
  notFound();
}
