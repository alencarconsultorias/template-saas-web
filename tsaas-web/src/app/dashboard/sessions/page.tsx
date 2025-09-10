"use client";

import { useState } from "react";
import { useSessions } from "@/contexts/SessionsContext";
import { useLanguage } from "@/contexts/LanguageContext";

export default function SessionsPage() {
  const { sessions, loading, terminateSession, terminateAllOtherSessions, refreshSessions } = useSessions();
  const { t } = useLanguage();
  const [terminating, setTerminating] = useState<string | null>(null);
  const [terminatingAll, setTerminatingAll] = useState(false);

  const handleTerminateSession = async (sessionId: string) => {
    setTerminating(sessionId);
    try {
      await terminateSession(sessionId);
    } catch (error) {
      console.error('Error terminating session:', error);
    } finally {
      setTerminating(null);
    }
  };

  const handleTerminateAllOther = async () => {
    setTerminatingAll(true);
    try {
      await terminateAllOtherSessions();
    } catch (error) {
      console.error('Error terminating all sessions:', error);
    } finally {
      setTerminatingAll(false);
    }
  };

  const formatLastActive = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return 'Agora mesmo';
    if (diffHours < 24) return `${diffHours}h atrás`;
    return `${diffDays}d atrás`;
  };

  const getDeviceIcon = (os: string) => {
    switch (os.toLowerCase()) {
      case 'windows':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-13.051-1.851" />
          </svg>
        );
      case 'macos':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
          </svg>
        );
      case 'android':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.2439 13.8533 7.8508 12 7.8508s-3.5902.3931-5.1367 1.0989L4.841 5.4467a.4161.4161 0 00-.5677-.1521.4157.4157 0 00-.1521.5676l1.9973 3.4592C2.61 10.2718.8995 12.8447.8995 15.8195v.8822c0 .9312.7651 1.6878 1.7 1.6878h18.8c.9349 0 1.7-.7566 1.7-1.6878v-.8822c.0001-2.9748-1.7104-5.5477-5.1211-6.5781" />
          </svg>
        );
      case 'ios':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z"/>
          </svg>
        );
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-8"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Sessões Ativas
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Gerencie e monitore suas sessões ativas em diferentes dispositivos
        </p>
      </div>

      <div className="mb-6 flex justify-between items-center">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {sessions.length} sessão{sessions.length !== 1 ? 'ões' : ''} ativa{sessions.length !== 1 ? 's' : ''}
        </div>
        <div className="flex space-x-3">
          <button
            onClick={refreshSessions}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Atualizar
          </button>
          {sessions.filter(s => !s.isCurrent).length > 0 && (
            <button
              onClick={handleTerminateAllOther}
              disabled={terminatingAll}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 disabled:bg-red-400 rounded-md transition-colors"
            >
              {terminatingAll ? 'Encerrando...' : 'Encerrar Outras Sessões'}
            </button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {sessions.map((session) => (
          <div
            key={session.id}
            className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-6 ${
              session.isCurrent 
                ? 'border-gold-500 bg-gold-50 dark:bg-gold-500/10' 
                : 'border-gray-200 dark:border-gray-700'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg ${
                  session.isCurrent 
                    ? 'bg-gold-100 dark:bg-gold-500/20 text-gold-600 dark:text-gold-400' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}>
                  {getDeviceIcon(session.os)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {session.deviceName}
                    </h3>
                    {session.isCurrent && (
                      <span className="px-2 py-1 text-xs font-medium text-gold-800 dark:text-gold-200 bg-gold-200 dark:bg-gold-500/30 rounded-full">
                        Sessão Atual
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <div className="flex items-center space-x-4">
                      <span>📍 {session.location}</span>
                      <span>🌐 {session.ipAddress}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span>⏰ Última atividade: {formatLastActive(session.lastActive)}</span>
                      <span>📅 Criada em: {session.createdAt.toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {!session.isCurrent && (
                <button
                  onClick={() => handleTerminateSession(session.id)}
                  disabled={terminating === session.id}
                  className="px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-md transition-colors disabled:opacity-50"
                >
                  {terminating === session.id ? 'Encerrando...' : 'Encerrar'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {sessions.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 dark:text-gray-600 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Nenhuma sessão ativa
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Faça login para ver suas sessões ativas
          </p>
        </div>
      )}
    </div>
  );
}
