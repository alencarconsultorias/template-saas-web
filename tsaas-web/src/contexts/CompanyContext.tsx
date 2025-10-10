"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "./AuthContext";

interface CompanyContextType {
  companyLogo: string | null;
  isLoadingLogo: boolean;
  logoError: string | null;
  updateCompanyLogo: (logoUrl: string) => void;
  uploadCompanyLogo: (file: File) => Promise<void>;
  clearLogo: () => void;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

interface CompanyProviderProps {
  children: ReactNode;
}

export function CompanyProvider({ children }: CompanyProviderProps) {
  const [companyLogo, setCompanyLogo] = useState<string | null>(null);
  const [isLoadingLogo, setIsLoadingLogo] = useState(false);
  const [logoError, setLogoError] = useState<string | null>(null);
  const { user } = useAuth();

  // Carregar logotipo salvo ao inicializar
  useEffect(() => {
    const loadSavedLogo = () => {
      if (typeof window !== 'undefined' && user?.uid) {
        const savedLogo = localStorage.getItem(`company_logo_${user.uid}`);
        if (savedLogo) {
          console.log('Carregando logotipo do localStorage:', savedLogo);
          setCompanyLogo(savedLogo);
        }
      }
    };

    loadSavedLogo();
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
      setCompanyLogo(result.url);
      localStorage.setItem(`company_logo_${user.uid}`, result.url);
      localStorage.setItem(`company_logo_path_${user.uid}`, result.path);
      
      console.log('Upload concluído e salvo:', result);
    } catch (error: any) {
      console.error('Erro no upload:', error);
      setLogoError(error.message);
      throw error;
    } finally {
      setIsLoadingLogo(false);
    }
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
      isLoadingLogo,
      logoError,
      updateCompanyLogo,
      uploadCompanyLogo,
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
