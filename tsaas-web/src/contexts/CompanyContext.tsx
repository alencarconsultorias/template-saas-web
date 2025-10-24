"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "./AuthContext";

interface CompanyContextType {
  companyLogo: string | null;
  companyName: string | null;
  companyCnpj: string | null;
  isLoadingLogo: boolean;
  logoError: string | null;
  updateCompanyLogo: (logoUrl: string) => void;
  uploadCompanyLogo: (file: File) => Promise<void>;
  updateCompanyInfo: (name: string, cnpj: string) => void;
  clearLogo: () => void;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

interface CompanyProviderProps {
  children: ReactNode;
}

export function CompanyProvider({ children }: CompanyProviderProps) {
  const [companyLogo, setCompanyLogo] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState<string | null>(null);
  const [companyCnpj, setCompanyCnpj] = useState<string | null>(null);
  const [isLoadingLogo, setIsLoadingLogo] = useState(false);
  const [logoError, setLogoError] = useState<string | null>(null);
  const { user } = useAuth();

  // Carregar dados salvos ao inicializar
  useEffect(() => {
    const loadSavedData = () => {
      if (typeof window !== 'undefined' && user?.uid) {
        const savedLogo = localStorage.getItem(`company_logo_${user.uid}`);
        const savedName = localStorage.getItem(`company_name_${user.uid}`);
        const savedCnpj = localStorage.getItem(`company_cnpj_${user.uid}`);
        
        if (savedLogo) {
          console.log('Carregando logotipo do localStorage:', savedLogo);
          setCompanyLogo(savedLogo);
        }
        if (savedName) {
          setCompanyName(savedName);
        }
        if (savedCnpj) {
          setCompanyCnpj(savedCnpj);
        }
      }
    };

    loadSavedData();
  }, [user]);

  // Função para atualizar o logotipo
  const updateCompanyLogo = (logoUrl: string) => {
    if (!user) return;

    setCompanyLogo(logoUrl);
    setLogoError(null);
    
    // Salvar no localStorage
    localStorage.setItem(`company_logo_${user.uid}`, logoUrl);
    console.log('Logotipo salvo no localStorage:', logoUrl);
  };

  // Função para fazer upload do logotipo para Firebase
  const uploadCompanyLogo = async (file: File) => {
    if (!user) throw new Error('Usuário não autenticado');

    setIsLoadingLogo(true);
    setLogoError(null);

    try {
      // Import dinâmico do StorageService
      const { StorageService } = await import("@/services/storageService");
      
      // Upload para Firebase Storage
      const result = await StorageService.uploadCompanyLogo(file, user.uid);
      
      // Atualizar estado e cache
      console.log('🔄 Atualizando logo no contexto:', result.url);
      
      // Forçar atualização do estado
      setCompanyLogo(result.url);
      
      // Salvar no localStorage
      localStorage.setItem(`company_logo_${user.uid}`, result.url);
      localStorage.setItem(`company_logo_path_${user.uid}`, result.path);
      
      console.log('✅ Upload concluído e salvo:', result);
      console.log('📦 Estado do logo após upload:', result.url);
      console.log('💾 LocalStorage atualizado para user:', user.uid);
    } catch (error: any) {
      console.error('Erro no upload:', error);
      setLogoError(error.message);
      throw error;
    } finally {
      setIsLoadingLogo(false);
    }
  };

  // Função para atualizar informações da empresa
  const updateCompanyInfo = (name: string, cnpj: string) => {
    if (!user) return;

    setCompanyName(name);
    setCompanyCnpj(cnpj);
    
    // Salvar no localStorage
    localStorage.setItem(`company_name_${user.uid}`, name);
    localStorage.setItem(`company_cnpj_${user.uid}`, cnpj);
    console.log('Informações da empresa salvas:', { name, cnpj });
  };

  // Função para limpar o logotipo
  const clearLogo = async () => {
    if (!user) return;

    try {
      // Tentar deletar do Firebase se tiver o path
      const logoPath = localStorage.getItem(`company_logo_path_${user.uid}`);
      if (logoPath) {
        const { StorageService } = await import("@/services/storageService");
        await StorageService.deleteCompanyLogo(logoPath);
      }
    } catch (error) {
      console.warn('Erro ao deletar do Firebase:', error);
    }

    // Limpar estado e cache local
    setCompanyLogo(null);
    setLogoError(null);
    localStorage.removeItem(`company_logo_${user.uid}`);
    localStorage.removeItem(`company_logo_path_${user.uid}`);
    console.log('Logotipo removido');
  };

  return (
    <CompanyContext.Provider value={{
      companyLogo,
      companyName,
      companyCnpj,
      isLoadingLogo,
      logoError,
      updateCompanyLogo,
      uploadCompanyLogo,
      updateCompanyInfo,
      clearLogo
    }}>
      {children}
    </CompanyContext.Provider>
  );
}

export function useCompany() {
  const context = useContext(CompanyContext);
  if (context === undefined) {
    throw new Error('useCompany must be used within a CompanyProvider');
  }
  return context;
}
