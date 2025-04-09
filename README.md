# template-saas

**README.md**

# Projeto SaaS & Mobile

Este projeto fornece uma base reutilizável para o desenvolvimento de aplicações SaaS e Mobile, com funcionalidades essenciais como autenticação de usuários, navegação por guias, abas, perfil do usuário, busca e muito mais.

## 💡 Funcionalidades
- Autenticação JWT
- Interface responsiva
- Navegação por abas e menus
- Componentes reutilizáveis

## ⚙️ Tecnologias Utilizadas
- Front-end: React Native + Expo
- Back-end: Node.js + Express
- Banco de Dados: PostgreSQL

## ⚡ Instalação
```bash
# Clone o repositório
git clone https://github.com/sua-org/nome-do-projeto.git

# Instale dependências do back-end
cd backend
npm install

# Instale dependências do front-end
cd ../mobile
npm install
```

## 🌐 Executando o Projeto
```bash
# Back-end
cd backend
npm run dev

# Front-end (em outro terminal)
cd mobile
npm start
```

## 🚩 Contribuindo
Consulte o arquivo [CONTRIBUTING.md](CONTRIBUTING.md) para instruções.

## ❤️ Código de Conduta
Ao interagir, siga nosso [Code of Conduct](CODE_OF_CONDUCT.md).

---

**CONTRIBUTING.md**

# Guia de Contribuição

Obrigado por querer contribuir! Siga estas diretrizes:

## 🌐 Branches
- `main`: Produção
- `dev`: Desenvolvimento
- `feature/nome-da-feature`: Novas funcionalidades

## 📋 Commits
- Use convenções do [Conventional Commits](https://www.conventionalcommits.org/pt-br/v1.0.0/)
- Exemplo: `feat(login): adicionar autenticação com JWT`

## 📦 Pull Requests
- Crie PRs para `dev`
- Relacione com issues usando `Fixes #id`
- Aguarde aprovação antes de merge

## ✅ Testes
- Adicione testes automatizados para novas funcionalidades
- Rode `npm test` antes de abrir PR

⚠️ Este projeto está licenciado sob uma Licença Proprietária. Para mais detalhes, consulte o arquivo [Clique aqui](LICENSE.txt).
