/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Configuração otimizada para Vercel
  images: {
    domains: ['localhost'],
    unoptimized: false, // Vercel otimiza imagens automaticamente
  },
  webpack(config) {
    // Importa a configuração padrão de regra de módulo de arquivos
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg')
    );

    // Exclui arquivos SVG do loader padrão do Next.js
    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/;
    }

    // Adiciona o svgr/webpack para lidar com SVGs como componentes React
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgoConfig: {
              plugins: [{
                name: "removeDimensions",
                active: true
              }],
            },
          },
        },
      ],
    });

    return config;
  },
};

export default nextConfig; 