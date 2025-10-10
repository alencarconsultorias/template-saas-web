# 🔥 Configuração do Firebase Storage para Logotipos

## 📋 Passos para Configurar

### 1. **Configurar CORS no Firebase Storage**

Execute este comando no terminal (precisa ter `gsutil` instalado):

```bash
# Configurar CORS
gsutil cors set cors.json gs://tsaas-prod.firebasestorage.app
```

Se não tiver `gsutil`, instale:
```bash
# No macOS
brew install google-cloud-sdk

# No Ubuntu/Debian
curl https://sdk.cloud.google.com | bash
exec -l $SHELL
gcloud init
```

### 2. **Atualizar Regras do Firebase Storage**

No Firebase Console:
1. Vá para **Storage** → **Rules**
2. Substitua as regras pelo conteúdo do arquivo `storage.rules`
3. Clique em **Publish**

### 3. **Verificar Configuração**

As variáveis de ambiente já estão configuradas em `.env.local`:
```
NEXT_PUBLIC_FIREBASE_API_KEY_PROD=AIzaSyAhuiHgq9ldTVsec_e4YD_xvAvWc5wfIBU
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN_PROD=tsaas-prod.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID_PROD=tsaas-prod
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET_PROD=tsaas-prod.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID_PROD=708109876047
NEXT_PUBLIC_FIREBASE_APP_ID_PROD=1:708109876047:web:78bbb35735829c7b6f233a
```

## 🚀 **Como Funciona Agora**

### **Fluxo de Upload:**
1. **Usuário seleciona arquivo** → Validação local (formato + tamanho)
2. **Preview imediato** → FileReader converte para base64
3. **Upload para Firebase** → StorageService.uploadCompanyLogo()
4. **URL de download** → Salva no contexto + localStorage (cache)
5. **Exibição no Header** → Carrega da URL do Firebase

### **Vantagens desta Implementação:**
- ✅ **Performance**: Cache local + Firebase CDN
- ✅ **Confiabilidade**: Backup no Firebase Storage
- ✅ **Escalabilidade**: URLs públicas do Firebase
- ✅ **Segurança**: Regras de acesso por usuário
- ✅ **Offline**: Cache no localStorage funciona offline

### **Estrutura no Firebase:**
```
gs://tsaas-prod.firebasestorage.app/
└── company_logos/
    └── {userId}/
        ├── company_logo_1704123456789.png
        ├── company_logo_1704123567890.jpg
        └── ...
```

## 🔧 **Comandos Úteis**

### **Testar CORS:**
```bash
curl -H "Origin: http://localhost:3001" \
     -H "Access-Control-Request-Method: GET" \
     -H "Access-Control-Request-Headers: X-Requested-With" \
     -X OPTIONS \
     https://firebasestorage.googleapis.com/v0/b/tsaas-prod.firebasestorage.app/o
```

### **Listar arquivos:**
```bash
gsutil ls gs://tsaas-prod.firebasestorage.app/company_logos/
```

### **Verificar regras:**
```bash
firebase storage:rules:get
```

## 🐛 **Troubleshooting**

### **Erro 404:**
- Verificar se o arquivo existe no Firebase Console
- Verificar se as regras de Storage estão corretas

### **Erro CORS:**
- Executar comando `gsutil cors set cors.json`
- Verificar se o domínio está na lista de origens permitidas

### **Erro de Permissão:**
- Verificar se o usuário está autenticado
- Verificar se as regras permitem acesso ao path correto

## 📊 **Monitoramento**

No Firebase Console → Storage → Usage, você pode monitorar:
- Número de uploads
- Bandwidth utilizada
- Erros de acesso
- Performance das operações
