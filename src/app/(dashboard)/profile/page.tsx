"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";

export default function ProfilePage() {
  const { t } = useLanguage();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    birthDate: "",
    email: "",
    bio: ""
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você implementaria a lógica para salvar as alterações
    console.log("Dados do perfil:", { ...formData, profileImage });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-100 mb-6">{t("profile.title")}</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Seção de Foto de Perfil */}
        <div className="bg-black rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-100 mb-4">{t("profile.photo.title")}</h2>
          <div className="flex items-center gap-6">
            <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-800">
              {profileImage ? (
                <Image
                  src={profileImage}
                  alt={t("profile.photo.alt")}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  {t("profile.photo.noPhoto")}
                </div>
              )}
            </div>
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="profile-image"
              />
              <label
                htmlFor="profile-image"
                className="bg-gold-600 text-white px-4 py-2 rounded-lg hover:bg-gold-700 transition-colors cursor-pointer"
              >
                {t("profile.photo.choose")}
              </label>
            </div>
          </div>
        </div>

        {/* Informações Pessoais */}
        <div className="bg-black rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-100 mb-4">{t("profile.personalInfo.title")}</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">
                {t("profile.personalInfo.name")}
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-800 text-gray-100 focus:outline-none focus:border-gold-600"
              />
            </div>

            <div>
              <label htmlFor="birthDate" className="block text-sm font-medium text-gray-400 mb-1">
                {t("profile.personalInfo.birthDate")}
              </label>
              <input
                type="date"
                id="birthDate"
                value={formData.birthDate}
                onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-800 text-gray-100 focus:outline-none focus:border-gold-600"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                {t("profile.personalInfo.email")}
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-800 text-gray-100 focus:outline-none focus:border-gold-600"
              />
            </div>

            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-400 mb-1">
                {t("profile.personalInfo.bio")}
              </label>
              <textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-800 text-gray-100 focus:outline-none focus:border-gold-600"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-gold-600 text-white px-6 py-2 rounded-lg hover:bg-gold-700 transition-colors"
          >
            {t("profile.save")}
          </button>
        </div>
      </form>
    </div>
  );
} 