"use client";

import { useState } from "react";
import { useCompany } from "@/contexts/CompanyContext";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";

interface CompanyLogoProps {
  className?: string;
  fallbackText?: string;
  width?: number;
  height?: number;
  showFallbackText?: boolean;
}

export default function CompanyLogo({ 
  className = "", 
  fallbackText,
  width = 128,
  height = 32,
  showFallbackText = true
}: CompanyLogoProps) {
  const { companyLogo, logoError } = useCompany();
  const { t } = useLanguage();
  const [imageError, setImageError] = useState(false);

  const shouldShowLogo = companyLogo && !logoError && !imageError;
  const defaultFallbackText = fallbackText || t("app.name");

  if (shouldShowLogo) {
    return (
      <div className={`relative ${className}`} style={{ width, height }}>
        <Image
          src={companyLogo}
          alt="Company Logo"
          fill
          className="object-contain"
          onError={() => setImageError(true)}
          priority
        />
      </div>
    );
  }

  // Fallback: mostrar texto ou ícone padrão
  if (showFallbackText) {
    return (
      <div className={`flex items-center justify-center text-xl font-bold text-gray-900 dark:text-gold-600 ${className}`}>
        {defaultFallbackText}
      </div>
    );
  }

  // Fallback: ícone padrão
  return (
    <div className={`flex items-center justify-center ${className}`} style={{ width, height }}>
      <svg 
        className="w-8 h-8 text-gray-400" 
        fill="currentColor" 
        viewBox="0 0 24 24"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    </div>
  );
}
