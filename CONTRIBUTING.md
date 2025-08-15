# 💡 Guia de Contribuição com Integração ao Jira

Obrigado por contribuir com este projeto! Para mantermos um fluxo de trabalho organizado e produtivo, siga estas diretrizes. Nosso processo está integrado ao **Jira** para rastreamento e gestão de tarefas.

---

## 🌐 Branches

- `main`: Versão estável em produção; 
- `dev`: Versão de desenvolvimento com recursos em teste; 
- `hml`: Versão semelhante ao produção para testes a/b reais;
- `release/vX.X.X`: Rastreamento de versões;   
- `feature/JIRA-123-nome-da-feature`: Para novas funcionalidades;
- `bugfix/JIRA-456-corrigir-erro-x`: Para correções de bugs; 
- `hotfix/JIRA-789-ajuste-critico`: Para correções urgentes em produção.

**🔗 Nome das branches deve conter o ID da tarefa no Jira.**

---

## 📌 Commits

- Siga o padrão [Conventional Commits](https://www.conventionalcommits.org/pt-br/v1.0.0/)
- Exemplo:  
  ```bash
  feat(JIRA-123): adicionar autenticação com JWT
  fix(JIRA-456): corrigir erro de validação no formulário
  ```

**💡 Inclua sempre o ID da tarefa do Jira entre parênteses.**

---

## 📦 Pull Requests

- Crie PRs sempre com destino à branch `dev` ou `main`; 
- Use título e descrição claros; 
- Relacione PRs a tarefas do Jira:  
  `Fixes JIRA-123`
- Adicione checklist de itens testados ou revisados; 
- Aguarde revisão e aprovação antes de fazer o merge.

**🚨 Use o template disponivel [PR TEMPLATE](./github/PULL_REQUEST_TEMPLATE.md).**

---

## ✅ Testes

- Adicione **scripts e testes automatizados** para novas funcionalidades; 
- Rode `npm test` ou o comando equivalente do projeto antes de abrir um PR; 
- Documente o que foi testado no Jira e na descrição do PR.

**💡 Crie um docker-compose para garantir dependencia e testes locais.**

---

## 📌 Integração com Jira

- **Antes de começar qualquer tarefa**, mova o cartão para “Em progresso”.
- Ao criar branches, sempre use o **ID da tarefa do Jira**. Ex.: feature/JIRA-123-login. 
- Marque a tarefa como **“Em Revisão”** ao abrir um Pull Request.
- Após o merge, mova a tarefa para **“Concluído”**.

**❌ Em casos de impedimentos na tarefa, mova para `blocked`!** 

---

## 📚 Documentação

- Atualize a documentação técnica quando necessário (ex: README, Confluence, etc.).
- Referencie os documentos no comentário da tarefa no Jira ou PR.

[Espaço de trabalho Confluence](https://alencar-consultorias.atlassian.net/wiki/spaces/tsaas/overview?homepageId=3899698)