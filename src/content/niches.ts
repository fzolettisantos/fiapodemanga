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
];

export function getNiche(slug: string): Niche | undefined {
  return niches.find((n) => n.slug === slug);
}
