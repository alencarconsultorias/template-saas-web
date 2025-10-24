"use client";

import { useRef, useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useCompany } from "@/contexts/CompanyContext";
import Image from "next/image";

export default function CompanySettingsPage() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { companyLogo, uploadCompanyLogo, logoError, isLoadingLogo, companyName, companyCnpj, updateCompanyInfo } = useCompany();
  const [companyLogoPreview, setCompanyLogoPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    cnpj: ""
  });
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState("");
  const logoInputRef = useRef<HTMLInputElement>(null);

  // Carregar dados salvos
  useEffect(() => {
    setFormData({
      name: companyName || "",
      cnpj: companyCnpj || ""
    });
  }, [companyName, companyCnpj]);

  const handleCompanyLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    try {
      setErrors({ ...errors, companyLogo: "" });
      
      // Preview local imediato
      const reader = new FileReader();
      reader.onloadend = () => {
        setCompanyLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      console.log("Iniciando upload para Firebase Storage...", { 
        fileName: file.name, 
        fileSize: file.size,
        fileType: file.type 
      });
      
      // Upload para Firebase Storage via contexto
      await uploadCompanyLogo(file);
      
      console.log("Upload concluído! Logo deve estar atualizado no contexto.");
      console.log("Logo atual no contexto:", companyLogo);
      
      // Limpar preview local para forçar uso do logo do contexto
      setCompanyLogoPreview(null);
      
      setSuccessMessage("Logotipo da empresa atualizado com sucesso!");
      setTimeout(() => setSuccessMessage(""), 3000);
      
    } catch (error: any) {
      console.error("Erro no upload do logotipo:", error);
      setErrors({ ...errors, companyLogo: error.message });
      setCompanyLogoPreview(null);
    }
  };

  const handleLogoClick = () => {
    logoInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      // Atualizar informações da empresa
      updateCompanyInfo(formData.name, formData.cnpj);
      
      setSuccessMessage("Informações da empresa atualizadas com sucesso!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error: any) {
      setErrors({ ...errors, general: error.message });
    } finally {
      setSaving(false);
    }
  };

  const formatCNPJ = (value: string) => {
    // Remove tudo que não é dígito
    const numbers = value.replace(/\D/g, "");
    
    // Aplica a máscara XX.XXX.XXX/XXXX-XX
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 5) return `${numbers.slice(0, 2)}.${numbers.slice(2)}`;
    if (numbers.length <= 8) return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5)}`;
    if (numbers.length <= 12) return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8)}`;
    return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8, 12)}-${numbers.slice(12, 14)}`;
  };

  const handleCNPJChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCNPJ(e.target.value);
    setFormData({ ...formData, cnpj: formatted });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
        Configurações da Empresa
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Gerencie as informações da sua empresa
      </p>

      {/* Mensagem de sucesso */}
      {successMessage && (
        <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-700 dark:text-green-300">
          {successMessage}
        </div>
      )}

      {/* Mensagem de erro geral */}
      {errors.general && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300">
          {errors.general}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 rounded-lg shadow-md border border-gray-200 dark:border-gray-800 p-6 space-y-8">
        {/* Logotipo da Empresa */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Logotipo da Empresa
          </h3>
          <div className="flex items-center gap-6">
            <div className="relative">
              <div
                className="w-40 h-24 rounded-lg bg-gray-200 dark:bg-gray-800 flex items-center justify-center overflow-hidden cursor-pointer border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-gold-500 dark:hover:border-gold-500 transition"
                onClick={handleLogoClick}
                title="Clique para alterar o logotipo da empresa"
              >
                {companyLogoPreview || companyLogo ? (
                  <Image
                    src={companyLogoPreview || companyLogo || ""}
                    alt="Logotipo da empresa"
                    fill
                    className="object-contain w-full h-full p-2"
                  />
                ) : (
                  <div className="text-center text-gray-400 text-xs p-2">
                    <svg className="w-10 h-10 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    <div>Adicionar Logotipo</div>
                  </div>
                )}
              </div>
              <input
                type="file"
                accept="image/png,image/jpg,image/jpeg,image/svg+xml"
                className="hidden"
                ref={logoInputRef}
                onChange={handleCompanyLogoChange}
              />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-1">
                Logotipo da Empresa
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-xs mb-2">
                Formatos aceitos: PNG, JPG, SVG (máx. 2MB)
              </div>
              <div className="text-xs text-gray-400">
                Clique na área para fazer upload
              </div>
              {errors.companyLogo && (
                <div className="text-xs text-red-500 mt-1">{errors.companyLogo}</div>
              )}
              {logoError && (
                <div className="text-xs text-red-500 mt-1">{logoError}</div>
              )}
              {isLoadingLogo && (
                <div className="text-xs text-blue-500 mt-1">Carregando...</div>
              )}
            </div>
          </div>
        </div>

        {/* Informações da Empresa */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8 space-y-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Informações da Empresa
          </h3>

          {/* Nome da Empresa */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Nome da Empresa
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-gold-500"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Digite o nome da empresa"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Campo opcional
            </p>
          </div>

          {/* CNPJ */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              CNPJ
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-gold-500"
              value={formData.cnpj}
              onChange={handleCNPJChange}
              placeholder="00.000.000/0000-00"
              maxLength={18}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Campo opcional
            </p>
          </div>
        </div>

        {/* Botão Salvar */}
        <div className="flex justify-end border-t border-gray-200 dark:border-gray-700 pt-6">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 rounded-lg bg-gold-500 text-white font-semibold shadow hover:bg-gold-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 disabled:opacity-60"
          >
            {saving ? "Salvando..." : "Salvar Alterações"}
          </button>
        </div>
      </form>
    </div>
  );
}
