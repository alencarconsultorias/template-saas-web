import Header from "@/components/Header";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-secondary-dark text-gray-100">
      <Header />
      {children}
    </div>
  );
} 