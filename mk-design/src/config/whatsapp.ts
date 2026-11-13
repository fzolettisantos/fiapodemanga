import { businessConfig } from "./business";

export interface WhatsAppMessageInput {
  protocolo: string;
  servico: string;
  detalhes: string;
  localidade: string;
  data: string;
  hora: string;
  nome: string;
}

/** Modelo de mensagem do guia (§7). */
export function buildWhatsAppMessage(i: WhatsAppMessageInput): string {
  return [
    "Olá! Gostaria de solicitar um atendimento com a MK Design.",
    "",
    `Protocolo: ${i.protocolo}`,
    `Serviço: ${i.servico}`,
    `Detalhes: ${i.detalhes}`,
    `Bairro/Cidade: ${i.localidade}`,
    `Data desejada: ${i.data}`,
    `Horário desejado: ${i.hora}`,
    `Nome: ${i.nome}`,
    "",
    "Podem confirmar a disponibilidade e orientar sobre o orçamento?",
  ].join("\n");
}

/** Retorna null enquanto o número real não estiver configurado (nunca usar número fictício). */
export function buildWhatsAppUrl(message: string, number = businessConfig.whatsappNumber): string | null {
  if (!number || !/^\d{12,13}$/.test(number)) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
