"use client";

import { useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";

export default function ProfilePage() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    birthDate: "",
    email: user?.email || "",
    company: "",
    phone: "",
    bio: "",
    location: "",
    website: ""
  });
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    try {
      setErrors({ ...errors, avatar: "" });
      
      // Preview da imagem
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Upload para Firebase Storage
      const { StorageService } = await import("@/services/storageService");
      
      // Redimensionar imagem se necessário
      const resizedFile = await StorageService.resizeImage(file, 400, 400, 0.8);
      
      // Upload
      const result = await StorageService.uploadAvatar(resizedFile, user.uid);
      
      // Atualizar perfil do usuário
      await StorageService.updateUserAvatar(result.url);
      
      setSuccessMessage("Avatar atualizado com sucesso!");
      setTimeout(() => setSuccessMessage(""), 3000);
      
    } catch (error: any) {
      setErrors({ ...errors, avatar: error.message });
      setProfileImage(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    // Aqui você implementaria a lógica para salvar as alterações
    console.log("Dados do perfil:", { ...formData, profileImage });
    setTimeout(() => {
      setSaving(false);
      alert("Perfil atualizado com sucesso!");
    }, 1200);
  };

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">{t("profile.title")}</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">{t("profile.description")}</p>

      {/* Mensagem de sucesso */}
      {successMessage && (
        <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-700 dark:text-green-300">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 rounded-lg shadow-md border border-gray-200 dark:border-gray-800 p-6 space-y-8">
        {/* Foto de perfil */}
        <div className="flex items-center gap-6">
          <div className="relative">
            <div
              className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center overflow-hidden cursor-pointer border-4 border-gold-500 hover:opacity-80 transition"
              onClick={handlePhotoClick}
              title={t("profile.photo.title")}
            >
              {profileImage || user?.photoURL ? (
                <Image
                  src={profileImage || user?.photoURL || ""}
                  alt={t("profile.photo.alt")}
                  fill
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageChange}
            />
          </div>
          <div>
            <div className="font-semibold text-gray-900 dark:text-gray-100 text-lg">{formData.name || user?.displayName || "Nome do usuário"}</div>
            <div className="text-gray-600 dark:text-gray-400 text-sm">{formData.email}</div>
            <div className="text-xs text-gray-400 mt-1">Clique na foto para alterar</div>
            {errors.avatar && (
              <div className="text-xs text-red-500 mt-1">{errors.avatar}</div>
            )}
          </div>
        </div>

        {/* Informações Pessoais */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("profile.personalInfo.name")}</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-gold-500"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("profile.personalInfo.email")}</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-gold-500"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
        </div>

        {/* Nome da Empresa */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("profile.personalInfo.company")}</label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-gold-500"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            placeholder={t("profile.personalInfo.companyPlaceholder")}
          />
        </div>

        {/* Telefone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("profile.personalInfo.phone")}</label>
          <input
            type="tel"
            className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-gold-500"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="(11) 99999-9999"
          />
        </div>

        {/* Data de Aniversário */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("profile.personalInfo.birthDate")}</label>
          <input
            type="date"
            className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-gold-500"
            value={formData.birthDate}
            onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
          />
        </div>

        {/* Biografia */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("profile.personalInfo.bio")}</label>
          <textarea
            rows={4}
            className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-gold-500 resize-none"
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            placeholder={t("profile.personalInfo.bioPlaceholder")}
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 rounded-lg bg-gold-500 text-white font-semibold shadow hover:bg-gold-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 disabled:opacity-60"
          >
            {saving ? "Salvando..." : t("profile.save")}
          </button>
        </div>
      </form>
    </div>
  );
} 