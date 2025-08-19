📚 Bifly – E-commerce de Biblioteca

A Bifly é um e-commerce desenvolvido para simular uma biblioteca digital interativa, onde cada usuário pode atuar como cliente ou anunciante.

A proposta é permitir que usuários anunciem livros que desejam vender ou comprem de outros usuários. Assim, o mesmo usuário pode alternar entre os dois papéis dentro da plataforma, tendo uma experiência personalizada conforme sua escolha no menu.

Além disso, a aplicação também foi pensada para suportar empresas, ampliando a variedade de livros disponíveis — desde obras fora de catálogo até lançamentos recentes.

🚀 Funcionalidades

Autenticação via Clerk

Login social (Google, Facebook, etc.).

Dados do usuário são vinculados ao MySQL.

Perfis de usuário

Cliente: pode adicionar livros ao carrinho, ver detalhes e efetuar simulação de compra.

Anunciante: pode cadastrar, editar e remover seus próprios livros.

Layout dinâmico

Interface muda conforme o papel escolhido pelo usuário (cliente ou anunciante).

Carrinho de compras

Lista de produtos adicionados.

Cálculo do valor total.

Simulação de pagamento via QR Code Pix.

Simulação de frete via API externa.

QR Code Pix simulado

O QR Code gerado não leva a um pagamento real.

Ele redireciona para a minha conta do GitHub como forma de demonstração.

🛠️ Tecnologias utilizadas

Frontend: React + TypeScript + TailwindCSS

Backend: Node.js + Prisma ORM

Banco de Dados: MySQL

Autenticação: Clerk

APIs externas:

Frete (simulação)

QR Code Pix (simulação, redireciona ao GitHub)

📂 Estrutura de Pastas
Front-end (/biblioteca)

src/HeaderAndFooter

header/ → Componente principal do cabeçalho.

fromheader/ → Subcomponentes do header:

mensage.tsx → mensagens de erro, sucesso e avisos.

nav.tsx → menu desktop.

navmobile.tsx → menu mobile.

searchLink.tsx → lógica de alternância cliente/anunciante.

src/home

home.tsx → componente principal.

fromhome/ → componentes da home:

banner.tsx → banner desktop.

bannerMobile.tsx → banner mobile.

listDestaque.tsx → lista de autores em destaque.

ULClientOurAniciante/ → listas de livros:

UlCliente.tsx → lista de livros disponíveis para clientes.

UlAnunciante.tsx → lista de livros anunciados pelo próprio usuário (com botão de edição/deleção).

src/pages

ApresProduct/

Apress.tsx → apresenta informações do produto e QR Code Pix.

Cart/ → carrinho com total, frete e simulação de pagamento.

EditeProduct/ → edição de produtos já anunciados.

productClient/Products.tsx → cadastro de novos livros.

todosProdutos/ → exibe todos os produtos da plataforma.

src/setting

Hooks customizados para compartilhamento de informações globais.

Back-end (/Backendbibliotec)

Api.ts → responsável pela lógica de CRUD com Prisma ORM:

Criação/edição/deleção de produtos.

Gerenciamento de carrinho.

Gerenciamento de usuários.

Integração com APIs externas de frete e QR Code Pix.

📌 Observações

🔹 O QR Code Pix é apenas uma simulação e redireciona para o meu GitHub.

🔹 As APIs de frete e QR Code são autoria própria e também podem ser encontradas no meu GitHub.
