# 💡 Guia de Contribuição com Integração ao Jira

Obrigado por contribuir com este projeto! Para mantermos um fluxo de trabalho organizado e produtivo, siga estas diretrizes. Nosso processo está integrado ao **Jira** para rastreamento e gestão de tarefas.

---

## 🌐 Branches

- `main`: Versão estável em produção.
- `dev`: Versão de desenvolvimento com recursos em teste.
- `feature/JIRA-123-nome-da-feature`: Para novas funcionalidades.
- `bugfix/JIRA-456-corrigir-erro-x`: Para correções de bugs.
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

- Crie PRs sempre com destino à branch `dev`.
- Use título e descrição claros.
- Relacione PRs a tarefas do Jira:  
  `Fixes JIRA-123`
- Adicione checklist de itens testados ou revisados.
- Aguarde revisão e aprovação antes de fazer o merge.

---

## ✅ Testes

- Adicione **testes automatizados** para novas funcionalidades.
- Rode `npm test` ou o comando equivalente do projeto antes de abrir um PR.
- Documente o que foi testado no Jira e na descrição do PR.

---

## 📌 Integração com Jira

- **Antes de começar qualquer tarefa**, mova o cartão para “Em progresso”.
- Ao criar branches, sempre use o **ID da tarefa do Jira**.
- Marque a tarefa como **“Em Revisão”** ao abrir um Pull Request.
- Após o merge, mova a tarefa para **“Concluído”**.

---

## 📚 Documentação

- Atualize a documentação técnica quando necessário (ex: README, Confluence, etc.).
- Referencie os documentos no comentário da tarefa no Jira ou PR.