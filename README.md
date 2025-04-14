# 📦 Projeto de Entregas

<details>
  <summary>📦 Sobre o Projeto</summary>

  <p>
    Este projeto foi desenvolvido com bastante dedicação, mesmo com o tempo curto ⏳, já que vi a mensagem do desafio um pouco tarde. Embora não esteja exatamente como imaginei inicialmente, ele está funcional ✅ e reflete meu esforço e comprometimento 💪.
  </p>

  <p>
    A ideia era estruturar uma aplicação de entregas 🚚 com backend em Node.js usando Prisma, frontend com React + Vite ⚛️, e banco de dados PostgreSQL rodando em Docker 🐳. Pensei em criar um relacionamento entre entregas, usuários e entregadores — permitindo criar uma entrega e depois vinculá-la ao usuário e entregador — mas com o tempo apertado, foquei no essencial 🎯.
  </p>

  <p>
    Também tive dificuldades ao implementar o JWT 🔐. Depois de finalizar, encontrei uma forma de resolver, mas como já estava perto do prazo final 📆, optei por manter como está. O projeto está preparado para que a autenticação com JWT seja facilmente adicionada futuramente 🧩.
  </p>

  <p>
    Em relação à padronização 🧼, a ideia era usar <code>camelCase</code> para controllers, services e models, e <code>snake_case</code> para rotas e arquivos auxiliares. Por conta da correria, essa padronização não ficou 100% 😅, mas foi algo que pensei desde o início.
  </p>

  <p>
    No geral, me diverti bastante desenvolvendo esse projeto 😄 e aprendi muito durante o processo 📚. Independentemente do resultado, agradeço pela oportunidade 🙏 e por essa experiência.
  </p>

</details>

---

<details>
  <summary>🚀 Como Rodar a Aplicação</summary>

  <p>
    Para rodar a aplicação localmente, é bem simples! Você só precisa garantir que tem o ambiente adequado instalado e depois executar um único comando para subir tudo automaticamente 🙌.
  </p>

  ### ✅ Pré-requisitos

  - <strong>Docker</strong> 🐳  
    👉 <a href="https://www.docker.com/products/docker-desktop" target="_blank">Instalar o Docker</a>
  
  - <strong>Node.js</strong> v18.18 ou superior 🟢  
    👉 <a href="https://nodejs.org/en/download" target="_blank">Instalar o Node.js</a>

  - <strong>PNPM</strong> 📦  
    👉 <a href="https://pnpm.io/installation" target="_blank">Instalar o PNPM</a>  
    ou rode:  
    ```bash
    npm install -g pnpm
    ```

  ### ▶️ Passos para rodar o projeto

  Com os pré-requisitos instalados, siga os passos abaixo:

  ```bash
  pnpm install
  pnpm run start:all


<details>
  <summary>🛠 Tecnologias Utilizadas</summary>

  <p>
    Aqui estão as principais tecnologias que utilizei no projeto, junto com o motivo de cada escolha 👇
  </p>

  - **Node.js** 🟢  
    Usei Node.js no backend pela familiaridade com JavaScript e por ser uma ótima escolha para APIs REST com alto desempenho e boa integração com bancos SQL e bibliotecas modernas.

  - **Prisma** 🔍  
    Escolhi o Prisma como ORM por sua tipagem forte, simplicidade e por agilizar muito o desenvolvimento com migrations automáticas e um cliente bem intuitivo. Me ajudou bastante na organização do acesso ao banco de dados.

  - **React + Vite** ⚛️⚡  
    Optei por React por ser uma biblioteca amplamente usada e com ótima comunidade. E usei o Vite no lugar do tradicional Create React App pela sua performance superior e inicialização instantânea — fez diferença no tempo curto que tive.

  - **PostgreSQL** 🐘  
    Usei PostgreSQL como banco de dados relacional pela robustez e compatibilidade total com Prisma. Também já usei em outros projetos e me sinto confortável com ele.

  - **Docker** 🐳  
    Utilizei o Docker para isolar o ambiente do banco de dados, facilitando o setup local e garantindo que todos possam rodar o projeto da mesma forma, sem precisar instalar o PostgreSQL diretamente na máquina.

  - **PNPM** 📦  
    Foi minha **primeira vez usando o PNPM** e gostei bastante! Achei o gerenciamento de pacotes bem mais rápido e eficiente comparado ao NPM, e ajudou a deixar o projeto mais leve e organizado.

  - **Concurrently** ⏯️  
    Usei o `concurrently` para rodar o backend, frontend e Docker em paralelo com um único comando. Isso facilitou bastante o processo de desenvolvimento e testagem local.

</details>
