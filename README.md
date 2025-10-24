# template saas web

## ⚙️ Configuração do Ambiente 
Para executar o projeto independente do ambiente:
```bash
# para rodar em dev
cd /tsaas-web
npm run dev 

# para rodar em prod
cd /tsaas-web
npm run build
npm start
```

## 🚀 Deploy no Railway

Com a branch `feature/TSAAS-213-deploywaylwaytest` configurada, o deploy pode ser feito utilizando o arquivo [`railway.json`](railway.json), que já aponta o diretório `tsaas-web`, os comandos de build e de start e configura uma verificação de saúde padrão.

1. Configure as variáveis de ambiente no Railway usando o arquivo [`tsaas-web/.env.example`](tsaas-web/.env.example) como referência.
2. Autentique-se na CLI do Railway (`npm install -g @railway/cli` e `railway login`).
3. Execute `railway init` para vincular o repositório ao projeto desejado.
4. Realize o deploy com `railway up` ou configure um deploy automático pelo painel utilizando as definições presentes no `railway.json`.

Durante o build em produção será utilizado `npm ci --legacy-peer-deps && npm run build` e a aplicação será iniciada com `npm run start` na porta configurada pelo Railway.

🚨 Atenção: requisito necessario para rodar o projeto
```bash
# instalar dependencias do node
npm install 
```

## 📚 Confluence  
Acesse o hub da empresa para identificar documentaçōes tecnicas do projeto [Hub no Confluence](https://alencar-consultorias.atlassian.net/wiki/company-hub)

## 📋 Changelog
Acesse o historico de versoes e seus detalhamentos das releases deste projeto: **[CHANGELOG.md](CHANGELOG.md)**

## 🚩 Contribuindo
Consulte o arquivo [CONTRIBUTING.md](CONTRIBUTING.md) para instruções.

## ❤️ Código de Conduta
Ao interagir, siga nosso [Code of Conduct](CODE_OF_CONDUCT.md).

⚠️ Este projeto está licenciado sob uma Licença Proprietária. Para mais detalhes, consulte o arquivo [Clique aqui](LICENSE.txt).