"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "./AuthContext";

interface CompanyContextType {
  companyLogo: string | null;
  isLoadingLogo: boolean;
  logoError: string | null;
  updateCompanyLogo: (logoUrl: string) => void;
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

  // Função para limpar o logotipo
  const clearLogo = () => {
    if (!user) return;

    setCompanyLogo(null);
    setLogoError(null);
    localStorage.removeItem(`company_logo_${user.uid}`);
    console.log('Logotipo removido do localStorage');
  };

  return (
    <CompanyContext.Provider value={{
      companyLogo,
      isLoadingLogo,
      logoError,
      updateCompanyLogo,
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
