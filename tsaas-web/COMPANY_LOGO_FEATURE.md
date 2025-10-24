# Funcionalidade de Logotipo da Empresa (Whitelabel)

Esta funcionalidade permite que cada empresa personalize o logotipo do sistema SaaS, oferecendo uma experiência whitelabel.

## Funcionalidades Implementadas

### ✅ Upload de Logotipo
- Campo para upload de imagem no perfil da empresa
- Formatos aceitos: PNG, JPG, SVG
- Limite de tamanho: 2MB
- Validação de tipo e tamanho de arquivo

### ✅ Armazenamento
- Logotipos armazenados no Firebase Storage
- Organização por empresa (`company_logos/{userId}/`)
- URLs de download geradas automaticamente

### ✅ Exibição Dinâmica
- Logotipo personalizado exibido no Header
- Fallback para logotipo padrão quando não configurado
- Tratamento de erros de carregamento

### ✅ Contexto de Gerenciamento
- `CompanyContext` para gerenciar estado do logotipo
- Cache local para melhor performance
- Funções para atualizar e limpar logotipo

## Arquivos Criados/Modificados

### Novos Arquivos
- `src/contexts/CompanyContext.tsx` - Contexto para gerenciar logotipo
- `src/components/CompanyLogo.tsx` - Componente reutilizável de logotipo
- `.env.example` - Exemplo de variáveis de ambiente

### Arquivos Modificados
- `src/services/storageService.ts` - Adicionadas funções para upload de logotipo
- `src/app/dashboard/profile/page.tsx` - Seção de upload de logotipo
- `src/components/Header.tsx` - Exibição do logotipo personalizado
- `src/app/layout.tsx` - Provider do contexto da empresa

## Como Usar

### 1. Configuração do Firebase
Copie `.env.example` para `.env.local` e configure as variáveis do Firebase:

```bash
cp .env.example .env.local
```

### 2. Upload de Logotipo
1. Acesse o perfil da empresa em `/dashboard/profile`
2. Na seção "Logotipo da Empresa", clique na área de upload
3. Selecione um arquivo PNG, JPG ou SVG (máx. 2MB)
4. O logotipo será carregado automaticamente

### 3. Visualização
- O logotipo aparecerá no Header após o upload
- Se não houver logotipo, o nome padrão do sistema será exibido
- Em caso de erro, o fallback é ativado automaticamente

## Componentes Principais

### CompanyContext
```typescript
const { companyLogo, updateCompanyLogo, logoError, isLoadingLogo } = useCompany();
```

### CompanyLogo Component
```tsx
<CompanyLogo 
  width={128} 
  height={32} 
  showFallbackText={true}
  className="custom-class"
/>
```

### StorageService
```typescript
// Upload de logotipo
const result = await StorageService.uploadCompanyLogo(file, userId);

// Deletar logotipo anterior
await StorageService.deleteCompanyLogo(logoPath);
```

## Critérios de Aceite Atendidos

- ✅ Upload, visualização e salvamento de logotipo
- ✅ Reflexão imediata do novo logotipo na aplicação
- ✅ Exibição do logotipo padrão quando não há personalização
- ✅ Mensagens de erro adequadas para falhas de upload
- ✅ Validação de formato e tamanho de arquivo
- ✅ Fallback visual para erros de carregamento

## Próximos Passos

1. **Configurar Firebase**: Configure as variáveis de ambiente do Firebase
2. **Testar Upload**: Teste o upload de diferentes formatos de arquivo
3. **Personalizar Fallback**: Ajuste o logotipo padrão conforme necessário
4. **Otimizações**: Implementar cache mais avançado se necessário

## Estrutura de Pastas

```
src/
├── contexts/
│   └── CompanyContext.tsx
├── components/
│   ├── CompanyLogo.tsx
│   └── Header.tsx
├── services/
│   └── storageService.ts
└── app/
    ├── dashboard/profile/
    │   └── page.tsx
    └── layout.tsx
```

## Dependências

- Firebase Storage (já configurado)
- Next.js Image component
- React Context API
- Tailwind CSS para estilos
