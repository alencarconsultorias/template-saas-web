import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { getAuth, updateProfile } from 'firebase/auth';
import { storage } from '@/lib/firebase';

// Storage instance provided by shared Firebase module

export interface UploadResult {
  url: string;
  path: string;
}

export class StorageService {
  /**
   * Upload de logotipo da empresa
   */
  static async uploadCompanyLogo(file: File, userId: string): Promise<UploadResult> {
    try {
      // Validação específica para logotipo
      this.validateLogoFile(file);
      
      // Criar referência única para o logotipo da empresa
      const timestamp = Date.now();
      const fileName = `company_logo_${timestamp}.${file.name.split('.').pop()}`;
      const logoRef = ref(storage, `company_logos/${userId}/${fileName}`);
      
      // Upload do arquivo
      const snapshot = await uploadBytes(logoRef, file);
      
      // Obter URL de download
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      return {
        url: downloadURL,
        path: snapshot.ref.fullPath
      };
    } catch (error) {
      console.error('Erro no upload do logotipo:', error);
      throw new Error('Falha no upload do logotipo. Tente novamente.');
    }
  }

  /**
   * Deletar logotipo da empresa anterior
   */
  static async deleteCompanyLogo(logoPath: string): Promise<void> {
    try {
      const logoRef = ref(storage, logoPath);
      await deleteObject(logoRef);
    } catch (error) {
      console.error('Erro ao deletar logotipo anterior:', error);
      // Não lança erro pois não é crítico
    }
  }

  /**
   * Upload de avatar do usuário
   */
  static async uploadAvatar(file: File, userId: string): Promise<UploadResult> {
    try {
      // Validação do arquivo
      this.validateImageFile(file);
      
      // Criar referência única para o avatar
      const timestamp = Date.now();
      const fileName = `avatar_${timestamp}.${file.name.split('.').pop()}`;
      const avatarRef = ref(storage, `avatars/${userId}/${fileName}`);
      
      // Upload do arquivo
      const snapshot = await uploadBytes(avatarRef, file);
      
      // Obter URL de download
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      return {
        url: downloadURL,
        path: snapshot.ref.fullPath
      };
    } catch (error) {
      console.error('Erro no upload do avatar:', error);
      throw new Error('Falha no upload da imagem. Tente novamente.');
    }
  }

  /**
   * Atualizar avatar no perfil do Firebase Auth
   */
  static async updateUserAvatar(avatarUrl: string): Promise<void> {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      
      if (!user) {
        throw new Error('Usuário não autenticado');
      }
      
      await updateProfile(user, {
        photoURL: avatarUrl
      });
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      throw new Error('Falha ao atualizar o perfil.');
    }
  }

  /**
   * Deletar avatar anterior
   */
  static async deleteAvatar(avatarPath: string): Promise<void> {
    try {
      const avatarRef = ref(storage, avatarPath);
      await deleteObject(avatarRef);
    } catch (error) {
      console.error('Erro ao deletar avatar anterior:', error);
      // Não lança erro pois não é crítico
    }
  }

  /**
   * Validação do arquivo de logotipo da empresa
   */
  private static validateLogoFile(file: File): void {
    // Verificar tipo de arquivo (inclui SVG para logotipos)
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Formato de arquivo não suportado. Use JPEG, PNG ou SVG.');
    }
    
    // Verificar tamanho (máximo 2MB para logotipos)
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      throw new Error('Arquivo muito grande. O tamanho máximo é 2MB.');
    }
  }

  /**
   * Validação do arquivo de imagem
   */
  private static validateImageFile(file: File): void {
    // Verificar tipo de arquivo
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Formato de arquivo não suportado. Use JPEG, PNG ou WebP.');
    }
    
    // Verificar tamanho (máximo 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      throw new Error('Arquivo muito grande. O tamanho máximo é 5MB.');
    }
  }

  /**
   * Redimensionar imagem antes do upload (opcional)
   */
  static async resizeImage(file: File, maxWidth: number = 400, maxHeight: number = 400, quality: number = 0.8): Promise<File> {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      const img = new Image();
      
      img.onload = () => {
        // Calcular novas dimensões mantendo proporção
        let { width, height } = img;
        
        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Desenhar imagem redimensionada
        ctx.drawImage(img, 0, 0, width, height);
        
        // Converter para blob
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const resizedFile = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now()
              });
              resolve(resizedFile);
            }
          },
          file.type,
          quality
        );
      };
      
      img.src = URL.createObjectURL(file);
    });
  }
}
