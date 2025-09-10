"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

export interface SessionInfo {
  id: string;
  deviceName: string;
  browser: string;
  os: string;
  location: string;
  ipAddress: string;
  lastActive: Date;
  isCurrent: boolean;
  createdAt: Date;
}

interface SessionsContextType {
  sessions: SessionInfo[];
  loading: boolean;
  refreshSessions: () => Promise<void>;
  terminateSession: (sessionId: string) => Promise<void>;
  terminateAllOtherSessions: () => Promise<void>;
}

const SessionsContext = createContext<SessionsContextType | undefined>(undefined);

// Helper function to detect device info
const getDeviceInfo = (): Partial<SessionInfo> => {
  const userAgent = navigator.userAgent;
  
  // Detect browser
  let browser = 'Unknown';
  if (userAgent.includes('Chrome')) browser = 'Chrome';
  else if (userAgent.includes('Firefox')) browser = 'Firefox';
  else if (userAgent.includes('Safari')) browser = 'Safari';
  else if (userAgent.includes('Edge')) browser = 'Edge';
  
  // Detect OS
  let os = 'Unknown';
  if (userAgent.includes('Windows')) os = 'Windows';
  else if (userAgent.includes('Mac')) os = 'macOS';
  else if (userAgent.includes('Linux')) os = 'Linux';
  else if (userAgent.includes('Android')) os = 'Android';
  else if (userAgent.includes('iOS')) os = 'iOS';
  
  // Generate device name
  const deviceName = `${browser} on ${os}`;
  
  return { browser, os, deviceName };
};

// Mock function to get IP and location (in real app, this would be from your backend)
const getLocationInfo = async (): Promise<{ location: string; ipAddress: string }> => {
  try {
    // In a real application, you would call your backend API
    // For now, we'll use a mock implementation
    return {
      location: 'São Paulo, Brasil',
      ipAddress: '192.168.1.1'
    };
  } catch (error) {
    return {
      location: 'Unknown',
      ipAddress: 'Unknown'
    };
  }
};

export function SessionsProvider({ children }: { children: ReactNode }) {
  const [sessions, setSessions] = useState<SessionInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Generate current session info
  const generateCurrentSession = async (): Promise<SessionInfo> => {
    const deviceInfo = getDeviceInfo();
    const locationInfo = await getLocationInfo();
    
    return {
      id: 'current-session',
      deviceName: deviceInfo.deviceName || 'Unknown Device',
      browser: deviceInfo.browser || 'Unknown',
      os: deviceInfo.os || 'Unknown',
      location: locationInfo.location,
      ipAddress: locationInfo.ipAddress,
      lastActive: new Date(),
      isCurrent: true,
      createdAt: new Date()
    };
  };

  // Mock function to generate sample sessions (in real app, this would fetch from backend)
  const generateMockSessions = async (): Promise<SessionInfo[]> => {
    const currentSession = await generateCurrentSession();
    
    // Mock other sessions
    const mockSessions: SessionInfo[] = [
      {
        id: 'session-1',
        deviceName: 'Chrome on Windows',
        browser: 'Chrome',
        os: 'Windows',
        location: 'Rio de Janeiro, Brasil',
        ipAddress: '192.168.1.2',
        lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        isCurrent: false,
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 day ago
      },
      {
        id: 'session-2',
        deviceName: 'Safari on iPhone',
        browser: 'Safari',
        os: 'iOS',
        location: 'São Paulo, Brasil',
        ipAddress: '10.0.0.1',
        lastActive: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
        isCurrent: false,
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
      }
    ];

    return [currentSession, ...mockSessions];
  };

  const refreshSessions = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // In a real application, you would fetch sessions from your backend
      const sessionsData = await generateMockSessions();
      setSessions(sessionsData);
    } catch (error) {
      console.error('Error fetching sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  const terminateSession = async (sessionId: string) => {
    try {
      // In a real application, you would call your backend API to terminate the session
      setSessions(prev => prev.filter(session => session.id !== sessionId));
    } catch (error) {
      console.error('Error terminating session:', error);
      throw error;
    }
  };

  const terminateAllOtherSessions = async () => {
    try {
      // In a real application, you would call your backend API
      setSessions(prev => prev.filter(session => session.isCurrent));
    } catch (error) {
      console.error('Error terminating all other sessions:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (user) {
      refreshSessions();
    } else {
      setSessions([]);
      setLoading(false);
    }
  }, [user]);

  return (
    <SessionsContext.Provider value={{
      sessions,
      loading,
      refreshSessions,
      terminateSession,
      terminateAllOtherSessions
    }}>
      {children}
    </SessionsContext.Provider>
  );
}

export function useSessions() {
  const context = useContext(SessionsContext);
  if (context === undefined) {
    throw new Error('useSessions must be used within a SessionsProvider');
  }
  return context;
}
