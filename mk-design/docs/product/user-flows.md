# Fluxos de usuário

## Fluxo principal — solicitar atendimento
```
Home/Serviços → Wizard
  1. Serviço        instalação de TV | suportes | reparo (+ variação)
  2. Detalhes       instalação: tamanho, marca/modelo, tipo de suporte, local, parede, já tem suporte?, obs., fotos (opc.)
                    reparo: marca, modelo, tamanho, sintomas, obs., foto (opc.)
  3. Localização    CEP, bairro, cidade, endereço, complemento → valida área atendida (config.)
  4. Data/horário   apenas slots reais compatíveis (tipo/duração/área); fuso America/Sao_Paulo
  5. Contato        nome, WhatsApp, aceite de privacidade → resumo completo ("Sob orçamento" se sem preço)
                    CTA: "Solicitar agendamento pelo WhatsApp"
  6. Resultado      pedido salvo (protocolo) → abre wa.me com mensagem pronta
                    "Solicitação recebida. O atendimento será confirmado pela equipe."
```
Regras: progresso visível; "Voltar" sem apagar campos; erros específicos e associados ao campo; foco movido ao título da etapa ao avançar.

## Persistência (fonte da verdade)
1. Validar (Zod no servidor) → 2. checar slot e criar pedido de forma transacional (status `aguardando_confirmacao`, slot retido com expiração) → 3. devolver protocolo → 4. abrir WhatsApp.
O WhatsApp não prova entrega/leitura: se a aba for fechada, a UI explica que o pedido ficou registrado e que ainda depende de confirmação.

## Sem backend (modo demonstrativo)
Não exibir disponibilidade. Mostrar "Solicitar preferência de data e horário" e identificar claramente o modo demonstrativo.

## Admin
Login → dashboard → abrir pedido → confirmar / reagendar / cancelar (histórico auditável) → bloquear intervalos na agenda → ajustar serviços e configurações.

## Estados de falha
Slot ocupado entre a escolha e o envio → mensagem + novos horários; erro de rede → "Tentar novamente" + contato direto; número de WhatsApp ausente → botão desabilitado com explicação (nunca número fictício).
