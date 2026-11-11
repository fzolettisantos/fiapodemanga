/**
 * Perguntas frequentes (só em português), alinhadas ao contrato e às regras comerciais.
 * Sem preços (decisão comercial) e sem promessa de posição no Google.
 */
export type Faq = { q: string; a: string };

export const generalFaqs: Faq[] = [
  {
    q: "Quanto tempo leva para o meu site ficar pronto?",
    a: "O prazo é combinado na proposta e conta a partir do recebimento do seu conteúdo (textos, fotos e logotipo). Para a maioria dos sites, o prazo combinado é de até 15 dias úteis.",
  },
  {
    q: "O domínio está incluso?",
    a: "Sim. Registramos e renovamos o domínio (como seunegocio.com.br) enquanto o plano estiver ativo, em nome da sua empresa. Se um dia você encerrar, depois de quitados os valores devidos, o domínio passa para a sua gestão.",
  },
  {
    q: "Como funciona o pagamento?",
    a: "Você escolhe pagar por mês ou por ano. Pode ser por cartão, Pix ou boleto. No plano anual, o cartão pode ser parcelado em até 12 vezes sem juros. Tudo é combinado antes, em uma proposta clara que você aceita on-line.",
  },
  {
    q: "Existe fidelidade? Posso cancelar?",
    a: "O contrato tem fidelidade de 12 meses. Quem cancela antes paga três mensalidades, limitadas ao que falta para completar o período, e no plano anual não há multa. Você pode desistir em até 7 dias após o aceite, com devolução integral.",
  },
  {
    q: "Quantas alterações posso pedir?",
    a: "Estão incluídos até 3 ajustes por mês, como trocar texto, foto, preço ou banner. Páginas novas e funções novas são orçadas à parte, sempre com a sua aprovação antes.",
  },
  {
    q: "Vocês cobram comissão sobre as vendas da minha loja virtual?",
    a: "Não. Você paga só a mensalidade. As taxas do Mercado Pago ou de outros meios de pagamento são cobradas diretamente na sua conta. A loja é sua: produtos, estoque, entrega e atendimento ao comprador ficam com você.",
  },
  {
    q: "O site é meu?",
    a: "O site é um serviço da Fiapo de Manga, mantido enquanto o plano estiver ativo, e não uma compra do código. Os seus textos, fotos, marca e dados de produtos continuam sendo seus, e o domínio também. Está tudo explicado no contrato, em linguagem simples, antes de você aceitar.",
  },
  {
    q: "Meu site vai aparecer no Google?",
    a: "Entregamos o site com a base técnica certa para o Google: títulos e descrições, mapa do site, rapidez, versão para celular e dados estruturados. A posição nos resultados depende de vários fatores, como concorrência, conteúdo e tempo, e ninguém pode garantir o primeiro lugar. Por isso também ajudamos com conteúdo e orientação para o seu negócio crescer nas buscas.",
  },
  {
    q: "Já tenho um site. Vocês refazem?",
    a: "Sim. Refazemos sites antigos, lentos ou difíceis de usar no celular, aproveitando o conteúdo que já existe. Se o endereço atual já aparece no Google, cuidamos para não perder esse histórico.",
  },
  {
    q: "Vocês usam inteligência artificial?",
    a: "Usamos para criar e publicar mais rápido, e isso ajuda o preço a ser justo. Tudo passa por revisão de gente antes de ir ao ar. Também levamos IA para dentro do seu negócio, como assistente virtual no site e automação de tarefas.",
  },
];

/** Perguntas curtas para a Home (as primeiras da lista geral). */
export const homeFaqs: Faq[] = [0, 1, 2, 5, 7].map((i) => generalFaqs[i]!);

export const serviceFaqs: Record<string, Faq[]> = {
  "criacao-de-sites": [
    { q: "Qual a diferença entre site institucional e landing page?", a: "O site institucional tem várias páginas (início, serviços, sobre, contato) e apresenta o negócio por inteiro. A landing page é uma página única, focada em uma ação, como pedir um orçamento ou chamar no WhatsApp. Para começar, a landing page é a opção mais simples." },
    { q: "Meu site vai funcionar bem no celular?", a: "Sim. Os sites são pensados primeiro para o celular, que é como a maioria dos clientes acessa, e depois adaptados para computador e tablet." },
    { q: "Preciso ter o domínio antes?", a: "Não. Registramos o domínio para você, em nome da sua empresa. Se você já tem um, podemos usar o que existe." },
    { q: "O site já sai preparado para o Google?", a: "Sai com a base técnica correta: títulos e descrições por página, mapa do site, rapidez e dados estruturados. Resultados nas buscas dependem de conteúdo e tempo, e não prometemos posição." },
    { q: "Posso ter botão de WhatsApp e mapa?", a: "Sim, os dois vêm em todos os formatos. O botão abre a conversa com uma mensagem pronta, e o mapa ajuda quem procura o endereço." },
  ],
  ecommerce: [
    { q: "Como recebo o dinheiro das vendas?", a: "O pagamento é feito pelo Mercado Pago, na sua própria conta. O valor cai para você segundo as regras do Mercado Pago, sem passar por nós e sem comissão da Fiapo de Manga sobre as vendas." },
    { q: "Como funciona o frete?", a: "A loja calcula o frete no carrinho, para o cliente ver o total antes de pagar. A forma de envio e o contrato com a transportadora são seus." },
    { q: "Quantos produtos posso ter?", a: "Há dois formatos: loja de até 50 produtos e loja de até 200, com variações de tamanho e cor e cupons. Para estoques maiores, avaliamos caso a caso." },
    { q: "Quem cuida de trocas e devoluções?", a: "A sua loja, que é a vendedora. Ajudamos a escrever uma política simples e clara. Na compra pela internet, o consumidor tem 7 dias para desistir (art. 49 do Código de Defesa do Consumidor)." },
    { q: "Posso vender produtos digitais, como cursos e e-books?", a: "Pode. Existe um formato de loja para produtos digitais, com entrega automática do arquivo ou do acesso depois do pagamento." },
  ],
  "aplicativos-sistemas-plataformas": [
    { q: "Em que um sistema sob medida é diferente de um site?", a: "O site apresenta o negócio. O sistema resolve uma tarefa do dia a dia, como agendamentos, pedidos, uma área para o cliente acompanhar o serviço ou um painel de relatórios." },
    { q: "Por onde começamos?", a: "Pela conversa sobre como o seu negócio funciona hoje e qual tarefa mais dá trabalho. Com isso, definimos uma primeira versão pequena, para testar com clientes reais e evoluir." },
    { q: "O sistema funciona no celular?", a: "Sim. As telas são feitas para funcionar no celular e no computador." },
    { q: "Vocês mexem em sistemas que já existem?", a: "Quando faz sentido, sim: modernizamos telas e fluxos de sistemas antigos sem parar a operação." },
  ],
  "design-tecnologia-ia": [
    { q: "O que um assistente virtual faz no meu site?", a: "Responde às dúvidas mais comuns dos clientes a qualquer hora, com as informações do seu negócio, e encaminha para o seu WhatsApp quando a pessoa precisa de você." },
    { q: "A IA fala em meu nome? Posso revisar?", a: "Você define o que o assistente pode responder, e as respostas são revisadas antes de ir ao ar. Em assuntos fora do que foi combinado, ele chama você." },
    { q: "A IA vai substituir o meu atendimento?", a: "Não. Ela cuida das perguntas repetidas e libera o seu tempo. As conversas que precisam de você continuam com você." },
    { q: "Os dados dos meus clientes ficam seguros?", a: "Tratamos os dados com cuidado e seguindo a LGPD. Antes de usar qualquer ferramenta de IA com informações de clientes, combinamos com você o que entra e o que fica de fora." },
  ],
};
