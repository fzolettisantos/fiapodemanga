/**
 * Páginas "Site para <tipo de negócio>" (só em português).
 *
 * Cada página responde a uma busca real e específica ("site para salão de beleza") com conteúdo próprio:
 * o que aquele negócio precisa ter no site, como os clientes encontram e qual formato indicamos.
 * Regras: nada de números inventados, depoimentos, clientes ou promessa de posição no Google.
 * Os formatos (siteTypeId) vêm de src/lib/proposals/catalog.ts.
 */
export type Niche = {
  slug: string;
  /** "salão de beleza" */
  name: string;
  /** Título da página (H1) */
  h1: string;
  /** Título para o Google, sem o sufixo da marca */
  title: string;
  description: string;
  siteTypeId: string;
  /** Valor de ?tipo= no formulário de contato */
  contactType: "site" | "ecommerce";
  intro: string[];
  features: { title: string; text: string }[];
  discovery: string;
  format: string;
  faqs: { q: string; a: string }[];
};

export const niches: Niche[] = [
  {
    slug: "salao-de-beleza",
    name: "salão de beleza",
    h1: "Site para salão de beleza com agenda e WhatsApp",
    title: "Site para Salão de Beleza: Agenda e WhatsApp",
    description:
      "Site para salão de beleza que mostra seu trabalho, lista os serviços e deixa o cliente agendar pelo celular. Domínio e hospedagem inclusos, com mensalidade.",
    siteTypeId: "agendamento",
    contactType: "site",
    intro: [
      "Quem procura um salão de beleza quer ver o trabalho, saber o que é oferecido e marcar horário sem complicação. O site do seu salão precisa responder isso em poucos segundos, no celular, que é de onde vem a maior parte das buscas.",
      "O site não substitui o Instagram: ele reúne o que a rede social não organiza bem, como serviços, horários, endereço e um jeito simples de agendar, e aparece quando alguém pesquisa por um salão na sua região.",
    ],
    features: [
      { title: "Galeria de trabalhos", text: "Fotos reais de cortes, coloração, unhas e penteados, tratadas para abrir rápido." },
      { title: "Serviços com descrição", text: "Cada serviço com o que inclui e a duração, para a cliente saber o que esperar." },
      { title: "Agendamento fácil", text: "Agenda on-line (Google Agenda ou Calendly) ou botão direto para o WhatsApp com mensagem pronta." },
      { title: "Mapa e horários", text: "Endereço, como chegar e horário de funcionamento sempre à vista." },
      { title: "Quem atende", text: "Apresentação da equipe, para criar confiança antes da primeira visita." },
      { title: "Perguntas frequentes", text: "Formas de pagamento, tempo de cada serviço e política de cancelamento respondidos no próprio site." },
    ],
    discovery:
      "Quem procura um salão costuma pesquisar o serviço junto com a cidade ou o bairro e olhar o mapa do Google. Por isso o site traz o nome do negócio, os serviços, a localização e os horários escritos de forma clara e no formato que o Google entende. O seu perfil no Google Meu Negócio complementa o site e vale configurar junto.",
    format:
      "Indicamos o site com agendamento: até cinco páginas, agenda on-line integrada, botão de WhatsApp e mapa. Se você também vende produtos, dá para somar um catálogo depois.",
    faqs: [
      { q: "Preciso de agenda on-line ou o WhatsApp basta?", a: "Os dois funcionam. O WhatsApp é o mais simples e o que a maioria já usa; a agenda on-line evita troca de mensagens e mostra só os horários livres. Dá para começar pelo WhatsApp e adicionar a agenda depois." },
      { q: "Posso usar as fotos do meu Instagram?", a: "Sim. Usamos as suas melhores fotos, tratadas para carregar rápido. Fotos com clientes só entram com a autorização delas." },
      { q: "O site mostra o preço dos serviços?", a: "Se você quiser. Alguns salões mostram “a partir de” e outros preferem combinar no atendimento. A escolha é sua e pode ser mudada depois, dentro dos ajustes do plano." },
    ],
  },
  {
    slug: "barbearia",
    name: "barbearia",
    h1: "Site para barbearia: horários, equipe e agendamento",
    title: "Site para Barbearia: Horários e Agendamento",
    description:
      "Site para barbearia com seus cortes, equipe, serviços e agendamento pelo WhatsApp. Rápido no celular, com domínio e hospedagem inclusos e mensalidade.",
    siteTypeId: "agendamento",
    contactType: "site",
    intro: [
      "O cliente de barbearia decide rápido: olha as fotos, vê se o estilo combina, confere o horário e chama. O site da sua barbearia precisa facilitar esse caminho, sem pedir cadastro nem fazer o cliente procurar informação.",
      "Com um site próprio, a barbearia deixa de depender só do perfil nas redes e passa a ter um endereço que aparece nas buscas e que dá para colocar no cartão, na placa e no Google Maps.",
    ],
    features: [
      { title: "Cortes e barbas em fotos", text: "Uma galeria do que a casa faz, com fotos reais da equipe trabalhando." },
      { title: "Serviços e combos", text: "Corte, barba, sobrancelha e pacotes, cada um com descrição e duração." },
      { title: "Agendamento pelo celular", text: "Botão de WhatsApp com mensagem pronta ou agenda on-line para o cliente escolher o horário." },
      { title: "Equipe", text: "Os barbeiros apresentados pelo nome, para o cliente escolher com quem quer cortar." },
      { title: "Planos mensais", text: "Se a barbearia oferece clube ou pacote de cortes, ele ganha uma página clara." },
      { title: "Mapa e horário", text: "Endereço, como chegar e horário de funcionamento sempre atualizados." },
    ],
    discovery:
      "As buscas por barbearia quase sempre vêm com bairro ou cidade e o cliente olha o mapa. O site deixa escritos o nome, os serviços e a localização, e dá ao Google o que ele precisa para entender o negócio. Junto com um bom perfil no Google Meu Negócio, a barbearia fica mais fácil de achar por quem passa por perto.",
    format:
      "Indicamos o site com agendamento: páginas de serviços, equipe e contato, agenda on-line ou WhatsApp e mapa. É leve e fácil de atualizar com os ajustes mensais do plano.",
    faqs: [
      { q: "Posso mostrar a equipe e os preços?", a: "Pode. Muitas barbearias mostram os barbeiros e uma tabela simples de serviços; outras preferem só a lista. Fica ao seu critério." },
      { q: "Quem muda o horário de funcionamento no feriado?", a: "Você pede pelo canal de atendimento e a gente atualiza. Alterações simples como horários e avisos fazem parte dos ajustes mensais do plano." },
      { q: "O site funciona bem no celular?", a: "Sim. Os sites são feitos primeiro para o celular, que é como a maioria dos clientes de barbearia acessa." },
    ],
  },
  {
    slug: "restaurante",
    name: "restaurante",
    h1: "Cardápio digital e site para restaurante",
    title: "Site e Cardápio Digital para Restaurante",
    description:
      "Site para restaurante com cardápio digital, fotos dos pratos, QR Code para as mesas e pedido pelo WhatsApp. Domínio e hospedagem inclusos, com mensalidade.",
    siteTypeId: "cardapio",
    contactType: "site",
    intro: [
      "Quem escolhe onde comer olha o cardápio antes de sair de casa. Se o seu cardápio é um PDF pesado ou uma foto torta no Instagram, muita gente desiste antes de chegar. Um cardápio digital bem feito abre rápido, mostra os pratos com foto e preço e se atualiza em minutos.",
      "O mesmo endereço serve para o QR Code nas mesas, para o link da bio e para o Google, e leva o cliente direto a pedir ou reservar pelo WhatsApp.",
    ],
    features: [
      { title: "Cardápio por categorias", text: "Entradas, pratos, bebidas e sobremesas organizados, com foto, descrição e preço." },
      { title: "QR Code para as mesas", text: "O cliente aponta o celular e vê o cardápio atualizado, sem precisar de menu impresso." },
      { title: "Pedido ou reserva pelo WhatsApp", text: "Botão com mensagem pronta para pedir, reservar mesa ou combinar um evento." },
      { title: "Prato do dia e promoções", text: "Um espaço fácil de atualizar para o que muda toda semana." },
      { title: "Horários e mapa", text: "Dias e horários de funcionamento, endereço e como chegar." },
      { title: "Link para delivery", text: "Se você usa aplicativos de entrega, o site leva o cliente até eles." },
    ],
    discovery:
      "As buscas por restaurante misturam o tipo de comida com a cidade ou o bairro, e o cliente quase sempre abre o mapa. O site deixa escritos o nome, o tipo de cozinha, o endereço e os horários e ajuda o Google a mostrar o restaurante para quem procura perto. Vale combinar o site com um perfil bem preenchido no Google Meu Negócio.",
    format:
      "Indicamos o cardápio digital: cardápio com fotos e preços, QR Code para as mesas e pedido pelo WhatsApp. Quem quiser vender pela internet com pagamento on-line pode evoluir para uma loja virtual.",
    faqs: [
      { q: "Como atualizo os preços do cardápio?", a: "Você envia a mudança e a gente atualiza. Troca de preço, prato e foto entra nos ajustes mensais incluídos no plano." },
      { q: "O QR Code das mesas está incluso?", a: "Sim. Entregamos o QR Code pronto para imprimir e colar, apontando para o seu cardápio." },
      { q: "Dá para receber pedidos pelo site?", a: "O cardápio digital leva o pedido ao WhatsApp. Se você quiser pagamento on-line direto no site, o formato indicado é a loja virtual." },
    ],
  },
  {
    slug: "confeitaria",
    name: "confeitaria",
    h1: "Site para confeitaria e doces por encomenda",
    title: "Site para Confeitaria e Doces por Encomenda",
    description:
      "Site para confeitaria com catálogo de bolos e doces, fotos, informações de encomenda e pedido pelo WhatsApp. Domínio e hospedagem inclusos, com mensalidade.",
    siteTypeId: "catalogo-50",
    contactType: "site",
    intro: [
      "Doce se compra primeiro com os olhos. Quem procura um bolo de aniversário ou doces para uma festa quer ver fotos, entender tamanhos e sabores e saber como encomendar. Um catálogo organizado evita dezenas de mensagens repetidas e deixa a conversa começar já no pedido.",
      "Para quem vende por encomenda, o site também organiza as regras: prazo mínimo, retirada ou entrega e datas especiais, tudo escrito antes de o cliente perguntar.",
    ],
    features: [
      { title: "Catálogo com fotos", text: "Bolos, doces, kits e sobremesas organizados por categoria, com sabores e tamanhos." },
      { title: "Pedido pelo WhatsApp", text: "Cada produto com um botão que abre a conversa com a mensagem do pedido pronta." },
      { title: "Como encomendar", text: "Prazo mínimo, formas de pagamento, retirada ou entrega explicados em uma página." },
      { title: "Galeria de bolos personalizados", text: "Trabalhos já feitos, para o cliente se inspirar e pedir algo parecido." },
      { title: "Datas especiais", text: "Páscoa, Natal e festas juninas com espaço para cardápios de temporada." },
      { title: "Ingredientes e alergênicos", text: "Informações claras sobre ingredientes, para quem tem restrições alimentares." },
    ],
    discovery:
      "Quem procura doces por encomenda costuma pesquisar o tipo de doce com a cidade, e muita gente chega pela indicação de amigos. O site dá a essas pessoas um endereço fácil de repassar, com o nome do negócio e os produtos escritos de forma clara para o Google entender.",
    format:
      "Indicamos o catálogo de produtos: até 50 itens com fotos, categorias e pedido pelo WhatsApp. Se quiser vender com pagamento on-line e entrega por transportadora, o próximo passo é uma loja virtual.",
    faqs: [
      { q: "Quantos produtos cabem no catálogo?", a: "O formato indicado atende até 50 itens. Se a sua linha for maior, avaliamos o formato com filtros ou a loja virtual." },
      { q: "Posso mostrar só fotos e deixar o preço para combinar?", a: "Pode. Cada confeitaria escolhe: preço fixo por tamanho, “a partir de” ou orçamento pelo WhatsApp." },
      { q: "O site recebe pedidos fora do horário?", a: "O cliente escolhe o produto e envia a mensagem a qualquer hora; você responde quando puder, com tudo já descrito no pedido." },
    ],
  },
  {
    slug: "clinica",
    name: "clínica ou consultório",
    h1: "Site para clínica e consultório",
    title: "Site para Clínica e Consultório com Agendamento",
    description:
      "Site para clínica ou consultório com especialidades, equipe, convênios, endereço e agendamento pelo WhatsApp. Domínio e hospedagem inclusos, com mensalidade.",
    siteTypeId: "institucional",
    contactType: "site",
    intro: [
      "Na área da saúde, o paciente pesquisa antes de ligar. Ele quer saber quem atende, quais especialidades e convênios, onde fica e como marcar. Um site claro e sóbrio passa a confiança que a primeira consulta exige.",
      "O conteúdo precisa ser informativo e respeitar as normas de publicidade do conselho da sua profissão. A gente organiza o site; a revisão final dos textos e das informações é sempre sua.",
    ],
    features: [
      { title: "Especialidades e profissionais", text: "Quem atende, com formação e número de registro no conselho, quando você quiser divulgar." },
      { title: "Convênios e atendimento particular", text: "Os planos aceitos e como funciona o atendimento, para evitar dúvida na hora de marcar." },
      { title: "Como agendar", text: "Telefone, WhatsApp ou agenda on-line, o que for mais simples para o seu fluxo." },
      { title: "Endereço e acesso", text: "Mapa, estacionamento, acessibilidade e horários de funcionamento." },
      { title: "Perguntas frequentes", text: "Preparo para exames, documentos para levar e tempo de consulta respondidos em um só lugar." },
      { title: "Privacidade e LGPD", text: "Política de privacidade adequada, já que dados de saúde exigem cuidado redobrado." },
    ],
    discovery:
      "Quem procura um profissional de saúde costuma pesquisar a especialidade com a cidade ou o bairro e confere o mapa e as avaliações. O site entrega as informações básicas em texto claro, no formato que o Google lê, e conversa com o seu perfil no Google Meu Negócio. Sem prometer posição: o que fazemos é deixar a base técnica em ordem.",
    format:
      "Indicamos o site institucional de até cinco páginas: apresentação, especialidades e equipe, convênios, contato e mapa. Se houver agendamento on-line, usamos o formato com agenda.",
    faqs: [
      { q: "O site pode ter fotos e informações dos profissionais?", a: "Pode, desde que você autorize e que o conteúdo respeite as normas do seu conselho profissional. A revisão final dos textos é sua." },
      { q: "Vocês guardam dados dos pacientes?", a: "O site não precisa guardar dados de saúde. O formulário de contato deve pedir só o necessário, e a política de privacidade explica como os dados são tratados." },
      { q: "Dá para ter agendamento on-line?", a: "Dá. Integramos uma agenda como Google Agenda ou Calendly ou deixamos um botão direto para o WhatsApp da recepção." },
    ],
  },
  {
    slug: "psicologo",
    name: "psicólogo",
    h1: "Site para psicólogo: acolhimento e primeiro contato",
    title: "Site para Psicólogo: Primeiro Contato Online",
    description:
      "Site para psicólogo com apresentação, abordagem, atendimento online ou presencial e primeiro contato pelo WhatsApp. Domínio e hospedagem inclusos.",
    siteTypeId: "landing-page",
    contactType: "site",
    intro: [
      "Procurar um psicólogo é uma decisão delicada. A pessoa quer entender como você trabalha, se o atendimento é online ou presencial e como dar o primeiro passo, e quer sentir acolhimento já no site.",
      "Uma página bem escrita, calma e objetiva já cumpre esse papel. Ela reúne quem você é, como é o atendimento e um caminho simples para o primeiro contato, respeitando as normas de publicidade da sua profissão. A revisão final do texto é sua.",
    ],
    features: [
      { title: "Quem é você", text: "Apresentação humana e direta, com formação e número do registro no conselho." },
      { title: "Sua abordagem", text: "Explicação simples de como funciona o atendimento, sem jargão." },
      { title: "Online ou presencial", text: "Como são as sessões, duração, frequência e plataforma usada no atendimento on-line." },
      { title: "Primeiro contato", text: "Botão para o WhatsApp com mensagem pronta, sem formulário longo." },
      { title: "Perguntas frequentes", text: "Sigilo, valores, cancelamento e como começar, respondidos com cuidado." },
      { title: "Visual sóbrio", text: "Cores e imagens calmas, que combinam com o seu jeito de atender." },
    ],
    discovery:
      "Muitas pessoas pesquisam o tipo de atendimento junto com a cidade, ou “psicólogo online”. Uma página com seu nome, sua especialidade, o formato do atendimento e a região escritos de forma clara ajuda o Google a entender para quem ela serve. É a base técnica; o conteúdo do dia a dia, como artigos curtos, fortalece isso com o tempo.",
    format:
      "Indicamos a página única (landing page): uma página só, completa e leve, com as informações essenciais e o botão de contato. Se quiser crescer, dá para evoluir para um site com mais páginas e artigos.",
    faqs: [
      { q: "Posso colocar depoimentos de pacientes?", a: "Recomendamos não colocar. As normas de publicidade da profissão são rígidas e preservar o sigilo é prioridade. Priorize conteúdo informativo." },
      { q: "O site precisa mostrar o valor da sessão?", a: "Não. Muitos profissionais preferem combinar o valor no primeiro contato; outros mostram uma faixa. Você decide." },
      { q: "Posso ter um blog com artigos?", a: "Pode, e ajuda muito a ser encontrado. Os artigos são escritos por você e publicados por aqui, com orientação de SEO." },
    ],
  },
  {
    slug: "advogado",
    name: "advogado",
    h1: "Site para advogado e escritório de advocacia",
    title: "Site para Advogado e Escritório de Advocacia",
    description:
      "Site para advogado e escritórios com áreas de atuação, equipe e contato, em linha com as regras de publicidade da OAB. Domínio e hospedagem inclusos.",
    siteTypeId: "institucional",
    contactType: "site",
    intro: [
      "Quem precisa de um advogado pesquisa antes de ligar: quer saber a área de atuação, a experiência e se o escritório passa seriedade. O site é a primeira impressão e precisa ser sóbrio, claro e fácil de contatar.",
      "A publicidade da advocacia tem regras próprias: o conteúdo deve ser informativo, sem captação agressiva nem promessa de resultado. A gente organiza e publica; a revisão final do conteúdo e a conformidade com a OAB são sempre suas.",
    ],
    features: [
      { title: "Áreas de atuação", text: "Cada área explicada em linguagem simples, para o cliente achar o que procura." },
      { title: "Equipe e registro na OAB", text: "Apresentação dos advogados com formação e número de inscrição, quando você desejar." },
      { title: "Contato direto", text: "Telefone, WhatsApp e formulário, com o horário de atendimento e o endereço." },
      { title: "Artigos informativos", text: "Um espaço para conteúdo educativo sobre dúvidas comuns, que fortalece a presença no Google." },
      { title: "Visual sóbrio", text: "Layout limpo e confiável, sem exageros." },
      { title: "Privacidade", text: "Política de privacidade e aviso de cookies adequados ao tratamento de dados de clientes." },
    ],
    discovery:
      "As buscas jurídicas misturam a área do direito com a cidade, e muita gente procura a resposta para uma dúvida específica antes de contratar. Um site com as áreas de atuação bem descritas e artigos que explicam essas dúvidas aparece para mais perguntas. É um trabalho de constância, e o site entrega a base técnica correta.",
    format:
      "Indicamos o site institucional de até cinco páginas: o escritório, áreas de atuação, equipe e contato. Com o blog, ele passa a receber artigos escritos por você.",
    faqs: [
      { q: "O site respeita as regras de publicidade da OAB?", a: "A gente monta o site de forma sóbria e informativa, sem promessa de resultado. A revisão final do conteúdo e a conformidade com as normas da OAB são responsabilidade do advogado." },
      { q: "Posso publicar artigos sobre minha área?", a: "Pode, e é uma das melhores formas de ser encontrado. O painel de artigos permite escrever, revisar e publicar sem mexer em código." },
      { q: "Preciso de e-mail com o domínio do escritório?", a: "É recomendável. Podemos orientar a configuração de um e-mail com o seu domínio em um serviço de sua escolha." },
    ],
  },
  {
    slug: "personal-trainer",
    name: "personal trainer",
    h1: "Site para personal trainer e estúdio de treino",
    title: "Site para Personal Trainer e Estúdio de Treino",
    description:
      "Site para personal trainer com apresentação, modalidades, horários e aula experimental pelo WhatsApp. Domínio e hospedagem inclusos, com mensalidade.",
    siteTypeId: "landing-page",
    contactType: "site",
    intro: [
      "Quem quer começar a treinar precisa confiar em quem vai orientar. O site do personal trainer apresenta o profissional, o método e como funcionam os treinos, e leva a pessoa a dar o primeiro passo com uma aula experimental.",
      "Uma página única e objetiva costuma ser suficiente para começar: ela conta quem você é, o que oferece e como falar com você.",
    ],
    features: [
      { title: "Quem é você", text: "Apresentação com formação, registro no conselho e a sua forma de trabalhar." },
      { title: "Modalidades", text: "Treino presencial, online, em grupo ou em casa, cada um explicado." },
      { title: "Aula experimental", text: "Botão de WhatsApp com mensagem pronta para marcar a primeira aula." },
      { title: "Horários e local", text: "Onde e quando você atende, com mapa para o estúdio ou academia." },
      { title: "Resultados com autorização", text: "Fotos e relatos só com a permissão do aluno, sem promessas exageradas." },
      { title: "Perguntas frequentes", text: "Frequência, nível de condicionamento, planos e forma de pagamento." },
    ],
    discovery:
      "Quem procura um personal pesquisa o tipo de treino com a cidade ou o bairro. Uma página com o seu nome, a especialidade e a região escritos de forma clara, mais um perfil no Google Meu Negócio, facilita ser encontrado por quem treina perto de você.",
    format:
      "Indicamos a página única (landing page): leve, rápida no celular e com o botão de WhatsApp em destaque. Se quiser crescer, evoluímos para um site com blog e agendamento.",
    faqs: [
      { q: "Posso vender planos de treino online pelo site?", a: "Para começar, o site leva o aluno ao seu WhatsApp. Se quiser vender planos com pagamento on-line, o formato indicado é uma loja virtual de produtos digitais." },
      { q: "Posso mostrar antes e depois dos alunos?", a: "Só com autorização do aluno, e com cuidado para não prometer resultado. Priorize o seu método e a rotina de treino." },
      { q: "A página funciona bem no celular?", a: "Sim, ela é pensada primeiro para o celular, de onde a maioria vai chamar você." },
    ],
  },
  {
    slug: "pet-shop",
    name: "pet shop",
    h1: "Site para pet shop: banho, tosa e produtos",
    title: "Site para Pet Shop: Banho, Tosa e Produtos",
    description:
      "Site para pet shop com serviços de banho e tosa, catálogo de produtos, horários e pedidos pelo WhatsApp. Domínio e hospedagem inclusos, com mensalidade.",
    siteTypeId: "catalogo-50",
    contactType: "site",
    intro: [
      "O dono de pet quer saber onde deixar o bichinho com segurança: quais serviços existem, quanto tempo levam e como agendar. Também quer saber se dá para pedir ração e acessórios sem sair de casa.",
      "Um site para pet shop reúne serviços e produtos em um só endereço e leva o cliente ao WhatsApp com a conversa já encaminhada.",
    ],
    features: [
      { title: "Banho e tosa", text: "Cada serviço com descrição, porte do animal e duração, e botão para agendar." },
      { title: "Catálogo de produtos", text: "Rações, acessórios e higiene organizados por categoria, com fotos e preços." },
      { title: "Pedido e delivery pelo WhatsApp", text: "Mensagem pronta com o produto escolhido e o endereço de entrega." },
      { title: "Planos de banho", text: "Pacotes mensais de banho ganham uma página clara, se você oferece." },
      { title: "Horários e mapa", text: "Endereço, estacionamento e horário de funcionamento." },
      { title: "Cuidados e dicas", text: "Um espaço para avisos de vacinação, campanhas e orientações da casa." },
    ],
    discovery:
      "Quem tem um animal pesquisa “pet shop perto de mim” ou o serviço com o bairro, e olha o mapa. O site escreve o nome, os serviços e a localização no formato que o Google entende e leva as pessoas direto ao agendamento. Junto com o perfil no Google Meu Negócio, ele ajuda quem mora ou passa por perto a encontrar o pet shop.",
    format:
      "Indicamos o catálogo de produtos: serviços, até 50 produtos com fotos e pedido pelo WhatsApp. Para vender com pagamento on-line e entrega, o próximo passo é a loja virtual.",
    faqs: [
      { q: "Dá para agendar banho e tosa pelo site?", a: "O botão leva ao WhatsApp com o serviço escolhido na mensagem. Se você usa uma agenda on-line, podemos integrá-la." },
      { q: "Posso mudar os produtos e preços quando quiser?", a: "Pode. Você envia as mudanças e a gente atualiza dentro dos ajustes mensais do plano." },
      { q: "Vocês fazem o catálogo inicial?", a: "Cadastramos os produtos iniciais até o limite do formato contratado, a partir das fotos e informações que você enviar." },
    ],
  },
  {
    slug: "loja-de-roupas",
    name: "loja de roupas",
    h1: "Loja virtual para moda e loja de roupas",
    title: "Loja Virtual para Loja de Roupas e Moda",
    description:
      "Loja virtual para roupas e moda com catálogo, tamanhos e variações, pagamento por cartão, Pix e boleto, frete e painel de pedidos. Sem comissão sobre as vendas.",
    siteTypeId: "loja-50",
    contactType: "ecommerce",
    intro: [
      "Vender roupa na internet exige mais do que fotos bonitas: o cliente precisa escolher tamanho e cor, entender a troca, calcular o frete e pagar sem fricção. Cada etapa em que ele trava é uma venda perdida.",
      "Uma loja virtual própria, com pagamento pelo Mercado Pago e sem comissão sobre as vendas, deixa a margem com você e centraliza os pedidos em um painel, em vez de espalhados em mensagens.",
    ],
    features: [
      { title: "Catálogo com variações", text: "Cada peça com fotos, tamanhos e cores, para o cliente escolher sem dúvida." },
      { title: "Pagamento pelo Mercado Pago", text: "Cartão, Pix e boleto. As taxas do Mercado Pago ficam na sua própria conta." },
      { title: "Frete", text: "Cálculo de frete no carrinho, para o cliente saber o total antes de pagar." },
      { title: "Painel de pedidos", text: "Acompanhe pedidos, pagamentos e estoque em um só lugar." },
      { title: "Cupons de desconto", text: "Promoções de coleção, primeira compra ou datas comemorativas." },
      { title: "Trocas e devoluções claras", text: "Política escrita de forma simples. Na compra pela internet, o consumidor tem 7 dias para desistir (art. 49 do Código de Defesa do Consumidor)." },
    ],
    discovery:
      "As buscas por roupa misturam o tipo de peça, a marca e, muitas vezes, a cidade. Uma loja virtual com páginas de produto bem descritas, fotos leves e carregamento rápido no celular tem base técnica para ser encontrada. Concorrência em moda é grande, então o resultado vem de constância: bons textos, fotos reais e atualização.",
    format:
      "Indicamos a loja virtual de até 50 produtos: catálogo, pagamento, frete e painel. Para um estoque maior, com variações e cupons, o formato de até 200 produtos.",
    faqs: [
      { q: "Vocês cobram comissão sobre as vendas?", a: "Não. Você paga só a mensalidade. As taxas do Mercado Pago ou de outros meios de pagamento são cobradas direto na sua conta." },
      { q: "A responsabilidade pelas entregas e trocas é de quem?", a: "Da sua loja, que é a vendedora. A gente cuida do site e do painel; produtos, estoque, envio e atendimento ao comprador são seus." },
      { q: "Consigo cadastrar os produtos sozinho?", a: "Os produtos iniciais são cadastrados por nós, até o limite do formato. Depois, mudanças simples entram nos ajustes mensais do plano." },
    ],
  },
  {
    slug: "fotografo",
    name: "fotógrafo",
    h1: "Site de portfólio para fotógrafo",
    title: "Site de Portfólio para Fotógrafo",
    description:
      "Portfólio para fotógrafo com galerias por ensaio, apresentação e pedido de orçamento pelo WhatsApp. Domínio e hospedagem inclusos, com mensalidade.",
    siteTypeId: "portfolio",
    contactType: "site",
    intro: [
      "O portfólio é a vitrine do fotógrafo. O cliente quer ver o estilo, sentir se combina com o que procura e pedir um orçamento. Se as imagens demoram a carregar ou aparecem cortadas no celular, ele fecha e vai ver outro profissional.",
      "Um portfólio próprio mostra as fotos grandes e nítidas, sem pesar, e organiza os ensaios por tipo, como casamento, família, produto e corporativo.",
    ],
    features: [
      { title: "Galerias por ensaio", text: "Casamentos, famílias, gestantes, produtos e eventos em galerias separadas." },
      { title: "Imagens nítidas e leves", text: "Fotos tratadas para abrir rápido no celular sem perder a qualidade." },
      { title: "Sobre você", text: "Uma apresentação curta, que mostra o seu olhar e o seu jeito de trabalhar." },
      { title: "Pedido de orçamento", text: "Botão de WhatsApp e formulário simples, com o tipo de ensaio já escolhido." },
      { title: "Pacotes e como funciona", text: "Como é o ensaio, prazo de entrega das fotos e formas de pagamento." },
      { title: "Blog e bastidores", text: "Um espaço para contar histórias dos ensaios, se você quiser." },
    ],
    discovery:
      "Quem procura fotógrafo pesquisa o tipo de ensaio com a cidade. Uma galeria bem organizada, com títulos e descrições das imagens escritos de forma clara, ajuda o Google a entender o seu trabalho. Perfis nas redes e o Google Meu Negócio completam a presença.",
    format:
      "Indicamos o portfólio: galerias, apresentação e contato, com o visual da sua marca. É um formato leve, ideal para quem vive de mostrar imagens.",
    faqs: [
      { q: "Quantas fotos posso colocar?", a: "O suficiente para mostrar o seu melhor trabalho em galerias organizadas. Recomendamos poucas fotos fortes por ensaio em vez de centenas." },
      { q: "Dá para os clientes baixarem as fotos pelo site?", a: "Esse tipo de galeria privada com download é um serviço à parte. O portfólio é voltado a mostrar o seu trabalho e receber contatos." },
      { q: "As minhas fotos ficam protegidas?", a: "As imagens são suas. Podemos aplicar marca d’água se você quiser e deixamos os arquivos em tamanho de exibição, sem os originais." },
    ],
  },
  {
    slug: "oficina-mecanica",
    name: "oficina mecânica",
    h1: "Site para oficina mecânica: serviços e orçamento pelo WhatsApp",
    title: "Site para Oficina Mecânica com Orçamento",
    description:
      "Site para oficina mecânica com serviços, marcas atendidas, horários e pedido de orçamento pelo WhatsApp. Domínio e hospedagem inclusos, com mensalidade.",
    siteTypeId: "institucional",
    contactType: "site",
    intro: [
      "Quem tem o carro parado ou com um barulho estranho pesquisa rápido: quer saber se a oficina resolve o problema, onde fica e quanto tempo leva para ser atendido. Um site claro dá confiança antes de o cliente ligar.",
      "Para a oficina, o site também reduz o vai e vem de mensagens, porque explica os serviços, as marcas atendidas e como pedir um orçamento já com as informações do carro.",
    ],
    features: [
      { title: "Serviços explicados", text: "Revisão, freios, suspensão, elétrica, ar-condicionado e o que mais a oficina faz, cada um em linguagem simples." },
      { title: "Marcas e modelos atendidos", text: "O cliente descobre logo se a oficina atende o carro dele." },
      { title: "Orçamento pelo WhatsApp", text: "Botão com mensagem pronta para o cliente enviar modelo, ano e o problema." },
      { title: "Fotos da oficina e da equipe", text: "Mostrar o espaço e quem cuida do carro passa segurança." },
      { title: "Horários, mapa e como chegar", text: "Endereço, horário de atendimento e referência de localização." },
      { title: "Perguntas frequentes", text: "Prazo médio, formas de pagamento e garantia do serviço, respondidos em um só lugar." },
    ],
    discovery:
      "Quem procura mecânico pesquisa o serviço com a cidade ou o bairro, e quase sempre olha o mapa do Google. O site escreve o nome da oficina, os serviços e a localização de forma clara e ajuda o Google a mostrar o negócio para quem precisa de atendimento por perto. O perfil no Google Meu Negócio, com fotos e horário, complementa o site.",
    format:
      "Indicamos o site institucional de até cinco páginas: apresentação, serviços, marcas atendidas, contato e mapa, com botão de WhatsApp em destaque.",
    faqs: [
      { q: "O site pode mostrar os preços dos serviços?", a: "Se você quiser. Muitas oficinas preferem orçar caso a caso, porque cada carro é diferente. O botão de orçamento leva o cliente ao WhatsApp com as informações do veículo." },
      { q: "Posso colocar fotos de serviços feitos?", a: "Pode, desde que você tenha a autorização do dono do carro quando a placa ou o rosto aparecerem. Fotos da oficina e da equipe são sempre uma boa escolha." },
      { q: "O cliente consegue agendar horário pelo site?", a: "Pelo WhatsApp, que é o jeito mais simples. Se a oficina usar uma agenda on-line, dá para integrá-la." },
    ],
  },
  {
    slug: "imobiliaria",
    name: "imobiliária",
    h1: "Site para imobiliária e corretor de imóveis",
    title: "Site para Imobiliária e Corretor de Imóveis",
    description:
      "Site para imobiliária ou corretor com vitrine de imóveis, busca por filtros, fotos e contato pelo WhatsApp. Domínio e hospedagem inclusos, com mensalidade.",
    siteTypeId: "vitrine-filtros",
    contactType: "site",
    intro: [
      "Quem procura um imóvel quer comparar rápido: filtra por bairro, tipo e faixa de valor, olha as fotos e só então fala com alguém. Um site com vitrine organizada e filtros simples tira o cliente do emaranhado de anúncios e leva direto ao seu contato.",
      "Ter o próprio site também dá à imobiliária ou ao corretor um endereço que é seu, em vez de depender só de portais e redes sociais.",
    ],
    features: [
      { title: "Vitrine de imóveis", text: "Cada imóvel com fotos, descrição, valor, metragem, quartos e localização." },
      { title: "Busca com filtros", text: "Por tipo, bairro, valor e número de quartos, para o cliente achar o que combina com ele." },
      { title: "Contato em cada imóvel", text: "Botão de WhatsApp que já informa qual imóvel despertou o interesse." },
      { title: "Sobre você e a equipe", text: "Apresentação com foto e o número do CRECI, como as regras da profissão pedem." },
      { title: "Bairros e regiões", text: "Páginas que explicam as regiões onde você atua e ajudam a ser encontrado." },
      { title: "Fotos leves e nítidas", text: "Imagens tratadas para abrir rápido no celular sem perder a qualidade." },
    ],
    discovery:
      "As buscas por imóvel misturam o tipo (casa, apartamento), a ação (comprar, alugar) e a região. Páginas bem descritas por imóvel e por região dão ao Google o que ele precisa para mostrar o seu site nessas buscas, que são muito concorridas. Por isso a vitrine precisa estar sempre atualizada e o endereço do imóvel descrito de forma clara.",
    format:
      "Indicamos a vitrine com filtros, para até 200 imóveis: busca, filtros, fotos e contato direto. Cadastramos os imóveis iniciais e, depois, as atualizações entram nos ajustes do plano.",
    faqs: [
      { q: "Quantos imóveis cabem na vitrine?", a: "O formato indicado atende até 200 itens. Para operações maiores, avaliamos uma solução sob medida." },
      { q: "Como atualizo os imóveis vendidos ou alugados?", a: "Você envia a atualização e a gente ajusta. Retirar um imóvel ou trocar um valor faz parte dos ajustes mensais do plano." },
      { q: "O site precisa mostrar o CRECI?", a: "A divulgação de imóveis segue regras da profissão, e o número do registro costuma ser exigido. A revisão final das informações é sempre sua." },
    ],
  },
  {
    slug: "contador",
    name: "escritório de contabilidade",
    h1: "Site para contador e escritório de contabilidade",
    title: "Site para Contador e Escritório de Contabilidade",
    description:
      "Site para contador e escritórios de contabilidade com serviços, abertura de empresa, blog e contato. Domínio e hospedagem inclusos, com mensalidade.",
    siteTypeId: "institucional",
    contactType: "site",
    intro: [
      "Quem procura um contador quer segurança: saber se o escritório resolve abertura de empresa, impostos e rotina do MEI ou da empresa, e se é fácil falar com alguém. O site é a primeira impressão do escritório e precisa passar organização e clareza.",
      "Contabilidade é uma área em que as pessoas pesquisam dúvidas antes de contratar. Um site com serviços bem explicados e artigos que respondem a essas dúvidas atrai clientes que já estão decidindo.",
    ],
    features: [
      { title: "Serviços por perfil de cliente", text: "MEI, microempresa, profissional liberal e empresas maiores, cada um com o que o escritório oferece." },
      { title: "Abertura de empresa", text: "Uma página que explica como funciona, os documentos e o que o escritório cuida." },
      { title: "Blog com dúvidas comuns", text: "Artigos sobre impostos, obrigações e prazos, que ajudam a ser encontrado e mostram conhecimento." },
      { title: "Contato fácil", text: "WhatsApp, telefone e formulário, com horário de atendimento." },
      { title: "Equipe e registro no CRC", text: "Apresentação dos contadores, com o número do registro profissional." },
      { title: "Perguntas frequentes", text: "Como funciona o atendimento, o que enviar todo mês e como é feita a troca de contador." },
    ],
    discovery:
      "As buscas por contabilidade vêm muito em forma de pergunta, como “como abrir MEI” ou “como trocar de contador”. Artigos claros sobre essas dúvidas, ligados às páginas de serviço, são uma das formas mais confiáveis de ser encontrado. O site entrega a base técnica; o conteúdo, escrito por você, constrói o resultado ao longo do tempo.",
    format:
      "Indicamos o site institucional de até cinco páginas, com espaço para o blog, onde você publica artigos pelo painel.",
    faqs: [
      { q: "Posso publicar artigos sobre impostos e obrigações?", a: "Pode, e é uma das melhores formas de ser encontrado. Você escreve e publica pelo painel, com uma lista de verificação de SEO para cada artigo." },
      { q: "O site pode ter área para o cliente enviar documentos?", a: "Isso é um sistema à parte, não faz parte do site institucional. Podemos avaliar uma área do cliente sob medida, dentro de aplicativos e sistemas." },
      { q: "Preciso colocar o número do CRC?", a: "As normas da profissão pedem identificação do responsável. A revisão final das informações do site é sempre sua." },
    ],
  },
  {
    slug: "arquiteto",
    name: "arquiteto",
    h1: "Site de portfólio para arquiteto e designer de interiores",
    title: "Site de Portfólio para Arquiteto e Interiores",
    description:
      "Portfólio para arquiteto e designer de interiores com projetos em destaque, fotos grandes e pedido de orçamento pelo WhatsApp. Domínio e hospedagem inclusos.",
    siteTypeId: "portfolio",
    contactType: "site",
    intro: [
      "Quem contrata um arquiteto compra confiança e estilo. O portfólio é onde o cliente vê se o seu olhar combina com o que ele imagina para a casa, o escritório ou a loja.",
      "Por isso as fotos precisam aparecer grandes e nítidas, sem pesar, e cada projeto precisa contar o que foi feito, para quem e com que desafio.",
    ],
    features: [
      { title: "Projetos em destaque", text: "Os trabalhos que melhor mostram o seu estilo, com fotos grandes e legendas." },
      { title: "História de cada projeto", text: "O briefing, a solução e o resultado, em texto curto e objetivo." },
      { title: "Tipos de serviço", text: "Residencial, comercial, interiores e reforma, cada um com sua explicação." },
      { title: "Sobre você", text: "Formação, registro no CAU e a sua forma de trabalhar." },
      { title: "Pedido de orçamento", text: "Botão de WhatsApp e formulário simples, com o tipo de projeto já escolhido." },
      { title: "Imagens leves", text: "Fotos tratadas para carregar rápido no celular sem perder qualidade." },
    ],
    discovery:
      "Quem procura arquiteto costuma pesquisar o tipo de projeto com a cidade ou a região. Um portfólio com projetos bem descritos, nomes de ambientes e localizações escritos de forma clara ajuda o Google a entender o seu trabalho. Redes sociais e Google Meu Negócio completam a presença.",
    format:
      "Indicamos o portfólio: galeria de projetos, apresentação e contato, com o visual da sua marca. Se quiser publicar artigos sobre projetos e tendências, o blog entra junto.",
    faqs: [
      { q: "Posso mostrar projetos de clientes?", a: "Pode, com a autorização do cliente e cuidado com informações pessoais, como endereço e fotos de pessoas. A revisão final do que aparece é sua." },
      { q: "Quantos projetos posso colocar?", a: "O suficiente para mostrar o seu melhor trabalho. Recomendamos poucos projetos bem contados em vez de uma lista enorme." },
      { q: "Dá para ter uma página por projeto?", a: "Dá. Cada projeto pode ter a sua página com fotos, texto e ficha técnica, e isso também ajuda nas buscas." },
    ],
  },
  {
    slug: "nutricionista",
    name: "nutricionista",
    h1: "Site para nutricionista: atendimento e primeiro contato",
    title: "Site para Nutricionista: Atendimento Online",
    description:
      "Site para nutricionista com apresentação, forma de atendimento, perguntas frequentes e agendamento pelo WhatsApp. Domínio e hospedagem inclusos.",
    siteTypeId: "landing-page",
    contactType: "site",
    intro: [
      "Quem procura um nutricionista quer entender como é o acompanhamento, se o atendimento é online ou presencial e como dar o primeiro passo. Uma página acolhedora e objetiva já responde a isso.",
      "A publicidade da área tem regras próprias, como evitar promessas de resultado e comparações de antes e depois. A gente organiza o site; a revisão final do conteúdo, de acordo com as normas do seu conselho, é sempre sua.",
    ],
    features: [
      { title: "Quem é você", text: "Apresentação com formação e número do registro no conselho." },
      { title: "Como é o atendimento", text: "Consulta, retorno e acompanhamento, de forma clara e sem jargão." },
      { title: "Online ou presencial", text: "Como funcionam as consultas, plataforma usada e duração." },
      { title: "Agendar a primeira consulta", text: "Botão de WhatsApp com mensagem pronta, sem formulário longo." },
      { title: "Perguntas frequentes", text: "Planos, retornos, formas de pagamento e como se preparar para a primeira consulta." },
      { title: "Conteúdo informativo", text: "Um espaço para artigos curtos sobre alimentação, que ajudam a ser encontrado." },
    ],
    discovery:
      "As buscas por nutricionista misturam a especialidade (esportiva, emagrecimento, infantil) com a cidade ou o atendimento online. Uma página bem escrita, com artigos curtos que respondem a dúvidas comuns, fortalece a presença no Google ao longo do tempo. A base técnica o site entrega; o conteúdo é construído por você.",
    format:
      "Indicamos a página única (landing page): uma página completa, leve e com o botão de contato em destaque. Quando quiser crescer, evoluímos para um site com blog.",
    faqs: [
      { q: "Posso mostrar fotos de antes e depois?", a: "Recomendamos não mostrar. As normas de publicidade da profissão restringem esse tipo de conteúdo. Priorize conteúdo informativo e a sua forma de atender." },
      { q: "O site precisa mostrar o valor da consulta?", a: "Não precisa. Alguns profissionais combinam o valor no primeiro contato; outros mostram. A escolha é sua." },
      { q: "Posso ter um blog?", a: "Pode, e ajuda muito a ser encontrado. Você escreve e publica pelo painel, com orientação de SEO." },
    ],
  },
  {
    slug: "clinica-de-estetica",
    name: "clínica de estética",
    h1: "Site para clínica de estética e espaço de beleza",
    title: "Site para Clínica de Estética com Agenda",
    description:
      "Site para clínica de estética com tratamentos explicados, equipe, perguntas frequentes e agendamento pelo WhatsApp. Domínio e hospedagem inclusos.",
    siteTypeId: "agendamento",
    contactType: "site",
    intro: [
      "Quem procura um tratamento estético pesquisa muito antes de agendar: quer entender o que cada procedimento faz, quem atende e se o ambiente passa segurança. O site é onde a clínica explica com calma e conquista a confiança.",
      "O conteúdo precisa ser informativo e seguir as normas dos conselhos de cada profissional. A gente organiza e publica; a revisão final do texto é sua.",
    ],
    features: [
      { title: "Tratamentos explicados", text: "Cada procedimento com o que é, para quem serve e como funciona, sem promessas exageradas." },
      { title: "Equipe e formação", text: "Quem atende, com formação e registro no conselho, quando você quiser divulgar." },
      { title: "Fotos do espaço", text: "Mostrar o ambiente ajuda a pessoa a se sentir segura antes da primeira visita." },
      { title: "Agendamento", text: "Botão de WhatsApp com mensagem pronta ou agenda on-line." },
      { title: "Cuidados e perguntas frequentes", text: "Preparo, tempo de recuperação e contraindicações, em linguagem simples." },
      { title: "Mapa e horários", text: "Endereço, como chegar e horário de atendimento." },
    ],
    discovery:
      "Quem procura estética pesquisa o tratamento com a cidade ou o bairro e confere o mapa e as avaliações. O site descreve os tratamentos e a localização em texto claro, no formato que o Google entende, e conversa com o perfil no Google Meu Negócio. É a base técnica; a constância de conteúdo faz o resto.",
    format:
      "Indicamos o site com agendamento: páginas de tratamentos, equipe e contato, agenda on-line ou WhatsApp e mapa.",
    faqs: [
      { q: "Posso mostrar fotos de antes e depois?", a: "Depende das normas do conselho de cada profissional e exige autorização por escrito da cliente. Recomendamos confirmar a regra da sua profissão antes de publicar." },
      { q: "O site mostra os preços dos procedimentos?", a: "Se você quiser. Muitas clínicas preferem avaliar cada caso antes de passar o valor." },
      { q: "Dá para vender pacotes e produtos pelo site?", a: "Pacotes podem ser vendidos pelo WhatsApp. Se quiser vender produtos com pagamento on-line, o formato indicado é a loja virtual." },
    ],
  },
  {
    slug: "floricultura",
    name: "floricultura",
    h1: "Site para floricultura: catálogo e pedidos pelo WhatsApp",
    title: "Site para Floricultura: Catálogo e Pedidos",
    description:
      "Site para floricultura com catálogo de arranjos e buquês, datas especiais, entrega e pedido pelo WhatsApp. Domínio e hospedagem inclusos, com mensalidade.",
    siteTypeId: "catalogo-50",
    contactType: "site",
    intro: [
      "Quem compra flores quase sempre tem pressa e uma data para cumprir. Quer ver o arranjo, saber se chega a tempo e resolver tudo em uma conversa. Um catálogo organizado, com fotos e entrega explicada, faz essa venda acontecer mais rápido.",
      "Nas datas fortes, como Dia das Mães e Dia dos Namorados, o site também ajuda a organizar o fluxo de pedidos, em vez de depender de mensagens soltas.",
    ],
    features: [
      { title: "Catálogo de arranjos e buquês", text: "Fotos, nomes e descrição de cada opção, organizadas por ocasião." },
      { title: "Pedido pelo WhatsApp", text: "Cada produto com botão que abre a conversa com o item já escolhido." },
      { title: "Entrega explicada", text: "Regiões atendidas, horários e prazos, antes de o cliente perguntar." },
      { title: "Datas especiais", text: "Páginas de temporada para Dia das Mães, Natal e outras datas." },
      { title: "Cartão e mensagem", text: "Como incluir um recado, para o presente chegar completo." },
      { title: "Mapa e horário da loja", text: "Endereço, horário e retirada na loja, quando existir." },
    ],
    discovery:
      "As buscas por flores vêm quase sempre com a cidade ou o bairro e com a ocasião, como “buquê de rosas” ou “flores para aniversário”. Um catálogo com produtos bem nomeados e descritos, e uma área de entrega clara, ajuda o Google a mostrar a floricultura para quem precisa na sua região.",
    format:
      "Indicamos o catálogo de produtos: até 50 itens com fotos e pedido pelo WhatsApp. Para vender com pagamento on-line e frete, o próximo passo é a loja virtual.",
    faqs: [
      { q: "Posso trocar o catálogo conforme a temporada?", a: "Pode. Você envia as fotos e os itens e a gente atualiza dentro dos ajustes mensais do plano." },
      { q: "O cliente paga pelo site?", a: "No catálogo, o pedido segue pelo WhatsApp e o pagamento é combinado ali. Para pagamento direto no site, o formato indicado é a loja virtual." },
      { q: "Dá para mostrar a área de entrega?", a: "Dá. Descrevemos os bairros ou cidades atendidos e os prazos, e podemos incluir um mapa." },
    ],
  },
  {
    slug: "pousada",
    name: "pousada ou hotel",
    h1: "Site para pousada e hotel com reservas pelo WhatsApp",
    title: "Site para Pousada e Hotel com Reservas",
    description:
      "Site para pousada ou hotel com fotos dos quartos, comodidades, localização e reservas pelo WhatsApp. Domínio e hospedagem inclusos, com mensalidade.",
    siteTypeId: "institucional",
    contactType: "site",
    intro: [
      "Quem planeja uma viagem vê fotos, compara quartos e pesquisa a região antes de decidir. O site da pousada é a vitrine que mostra o ambiente com calma e leva o hóspede a falar direto com você, sem comissão de plataforma.",
      "Reservas diretas ficam com a pousada o valor que, de outra forma, iria para intermediários. O site também reúne o que costuma gerar dúvida: regras, horários de entrada e saída e como chegar.",
    ],
    features: [
      { title: "Fotos dos quartos e áreas", text: "Galeria grande e nítida, para o hóspede imaginar a estadia." },
      { title: "Comodidades", text: "Café da manhã, estacionamento, piscina, Wi-Fi e o que mais a pousada oferece." },
      { title: "Reserva pelo WhatsApp", text: "Botão com mensagem pronta para pedir datas e consultar disponibilidade." },
      { title: "Localização e como chegar", text: "Mapa, pontos de referência e atrações próximas." },
      { title: "Regras e políticas", text: "Entrada e saída, pets, crianças e cancelamento, explicados com clareza." },
      { title: "Perguntas frequentes", text: "Dúvidas comuns respondidas antes de o hóspede perguntar." },
    ],
    discovery:
      "As buscas por hospedagem misturam o destino com o tipo de estadia, como “pousada em [cidade]” ou “hotel perto de [atração]”. Páginas bem descritas, com a região e as comodidades escritas de forma clara, ajudam o Google a mostrar a pousada. As plataformas de reserva têm muita força nas buscas, então o site precisa se destacar pela experiência direta e pelo perfil no Google Meu Negócio.",
    format:
      "Indicamos o site institucional de até cinco páginas: apresentação, quartos, comodidades, localização e contato, com reservas pelo WhatsApp.",
    faqs: [
      { q: "O site faz reserva e cobrança on-line?", a: "O formato indicado leva a reserva ao WhatsApp, onde você confirma as datas e combina o pagamento. Para um sistema de reservas com pagamento, avaliamos uma solução sob medida." },
      { q: "Posso mostrar o valor das diárias?", a: "Pode. Muitas pousadas mostram um valor “a partir de” e confirmam o preço final conforme as datas." },
      { q: "O site funciona em outros idiomas?", a: "Podemos avaliar uma versão em inglês ou espanhol, se o seu público incluir turistas estrangeiros." },
    ],
  },
  {
    slug: "prestador-de-servicos",
    name: "prestador de serviços",
    h1: "Site para prestador de serviços: eletricista, encanador e outros",
    title: "Site para Prestador de Serviços e Autônomo",
    description:
      "Site para prestador de serviços e autônomos, como eletricista, encanador, pintor e diarista, com orçamento pelo WhatsApp. Domínio e hospedagem inclusos.",
    siteTypeId: "landing-page",
    contactType: "site",
    intro: [
      "Quem precisa de um eletricista, encanador, pintor ou diarista quer alguém confiável e perto. Antes de chamar, a pessoa pesquisa, olha o que o profissional faz e confere se atende a região dela.",
      "Uma página simples e profissional, com os serviços, a região atendida e um botão de orçamento pelo WhatsApp, já faz o autônomo parecer mais confiável do que quem depende só de indicação.",
    ],
    features: [
      { title: "Serviços que você faz", text: "Lista clara do que você atende, para o cliente saber se você resolve o problema dele." },
      { title: "Região atendida", text: "Bairros e cidades onde você trabalha, para ser encontrado por quem está perto." },
      { title: "Orçamento pelo WhatsApp", text: "Botão com mensagem pronta para o cliente descrever o serviço." },
      { title: "Fotos de trabalhos feitos", text: "Imagens reais de serviços concluídos, que mostram qualidade e passam confiança." },
      { title: "Como funciona", text: "Visita, orçamento, prazo e forma de pagamento, explicados em poucas linhas." },
      { title: "Perguntas frequentes", text: "Garantia do serviço, emergências e horários de atendimento." },
    ],
    discovery:
      "As buscas por serviços locais vêm com a cidade ou o bairro, como “eletricista em [bairro]”. Uma página com o seu nome, os serviços e a região escritos de forma clara, junto com um perfil bem preenchido no Google Meu Negócio, é o que mais ajuda a aparecer para quem precisa de atendimento por perto.",
    format:
      "Indicamos a página única (landing page): leve, rápida no celular e com o botão de WhatsApp em destaque. É o jeito mais simples e econômico de ter presença profissional.",
    faqs: [
      { q: "Preciso de CNPJ para ter um site?", a: "Para o site em si, não. Para contratar o nosso plano, é necessário um documento do contratante, que pode ser CPF ou CNPJ." },
      { q: "Posso mostrar o antes e depois dos serviços?", a: "Pode, com cuidado para não mostrar o rosto de pessoas nem informações da casa do cliente sem autorização." },
      { q: "Funciona para quem atende em várias cidades?", a: "Sim. Listamos as cidades e bairros atendidos, e o Google entende melhor onde você atua." },
    ],
  },
  {
    slug: "artesanato",
    name: "loja de artesanato",
    h1: "Loja virtual para artesanato e produtos feitos à mão",
    title: "Loja Virtual para Artesanato e Feito à Mão",
    description:
      "Loja virtual para artesanato com catálogo, produtos personalizados, pagamento por cartão, Pix e boleto, frete e painel. Sem comissão sobre as vendas.",
    siteTypeId: "loja-50",
    contactType: "ecommerce",
    intro: [
      "Artesanato vende pela história e pelo cuidado. O cliente quer ver os detalhes da peça, entender o material, saber o prazo de produção e sentir que está comprando de uma pessoa, não de uma prateleira.",
      "Uma loja virtual própria permite contar essa história, vender peças prontas e por encomenda, e receber pelo Mercado Pago sem pagar comissão sobre cada venda.",
    ],
    features: [
      { title: "Catálogo com fotos de detalhe", text: "Cada peça com várias fotos, medidas, materiais e cuidados." },
      { title: "Peças prontas e por encomenda", text: "Prazo de produção e opções de personalização explicados em cada produto." },
      { title: "Pagamento pelo Mercado Pago", text: "Cartão, Pix e boleto. As taxas do Mercado Pago ficam na sua própria conta." },
      { title: "Frete", text: "Cálculo no carrinho, com cuidado de embalagem descrito para peças frágeis." },
      { title: "Sua história", text: "Uma página sobre quem faz, como faz e por que faz, que gera confiança." },
      { title: "Painel de pedidos", text: "Acompanhe pedidos, pagamentos e encomendas em um só lugar." },
    ],
    discovery:
      "As buscas por artesanato misturam o tipo de peça, o material e a ocasião, como “presente personalizado de crochê”. Páginas de produto com bons textos, fotos reais e nomes claros ajudam a loja a ser encontrada. A concorrência com grandes marketplaces é alta, então vale investir na identidade e na história da marca, que é o que o artesanato tem de único.",
    format:
      "Indicamos a loja virtual de até 50 produtos: catálogo, pagamento, frete e painel. Para um catálogo maior, com variações e cupons, o formato de até 200 produtos.",
    faqs: [
      { q: "Vocês cobram comissão sobre as vendas?", a: "Não. Você paga só a mensalidade. As taxas do Mercado Pago são cobradas direto na sua conta." },
      { q: "Consigo vender peças por encomenda?", a: "Consegue. Cada produto pode informar o prazo de produção, e o pedido personalizado pode seguir pelo WhatsApp." },
      { q: "E se eu vender também em marketplaces?", a: "Sem problema. A loja própria complementa os marketplaces, deixa a margem com você e fortalece a sua marca." },
    ],
  },
];

export function getNiche(slug: string): Niche | undefined {
  return niches.find((n) => n.slug === slug);
}
