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

// Helper function to generate a unique session ID based on browser fingerprint
const generateSessionId = (): string => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillText('Session fingerprint', 2, 2);
  }
  
  const fingerprint = [
    navigator.userAgent,
    navigator.language,
    screen.width + 'x' + screen.height,
    new Date().getTimezoneOffset(),
    canvas.toDataURL(),
    navigator.hardwareConcurrency || 'unknown',
    (navigator as any).deviceMemory || 'unknown'
  ].join('|');
  
  // Simple hash function
  let hash = 0;
  for (let i = 0; i < fingerprint.length; i++) {
    const char = fingerprint.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  return Math.abs(hash).toString(16);
};

// Helper function to detect device info
const getDeviceInfo = (): Partial<SessionInfo> => {
  const userAgent = navigator.userAgent;
  
  // Detect browser with more precision
  let browser = 'Unknown';
  let browserVersion = '';
  
  if (userAgent.includes('Edg/')) {
    browser = 'Microsoft Edge';
    browserVersion = userAgent.match(/Edg\/([0-9.]+)/)?.[1] || '';
  } else if (userAgent.includes('Chrome/')) {
    browser = 'Google Chrome';
    browserVersion = userAgent.match(/Chrome\/([0-9.]+)/)?.[1] || '';
  } else if (userAgent.includes('Firefox/')) {
    browser = 'Mozilla Firefox';
    browserVersion = userAgent.match(/Firefox\/([0-9.]+)/)?.[1] || '';
  } else if (userAgent.includes('Safari/') && !userAgent.includes('Chrome')) {
    browser = 'Safari';
    browserVersion = userAgent.match(/Version\/([0-9.]+)/)?.[1] || '';
  }
  
  // Detect OS with more precision
  let os = 'Unknown';
  let osVersion = '';
  
  if (userAgent.includes('Windows NT')) {
    os = 'Windows';
    const version = userAgent.match(/Windows NT ([0-9.]+)/)?.[1];
    switch (version) {
      case '10.0': osVersion = '10/11'; break;
      case '6.3': osVersion = '8.1'; break;
      case '6.2': osVersion = '8'; break;
      case '6.1': osVersion = '7'; break;
      default: osVersion = version || '';
    }
  } else if (userAgent.includes('Mac OS X')) {
    os = 'macOS';
    osVersion = userAgent.match(/Mac OS X ([0-9_]+)/)?.[1]?.replace(/_/g, '.') || '';
  } else if (userAgent.includes('Linux')) {
    os = 'Linux';
  } else if (userAgent.includes('Android')) {
    os = 'Android';
    osVersion = userAgent.match(/Android ([0-9.]+)/)?.[1] || '';
  } else if (userAgent.includes('iPhone') || userAgent.includes('iPad')) {
    os = 'iOS';
    osVersion = userAgent.match(/OS ([0-9_]+)/)?.[1]?.replace(/_/g, '.') || '';
  }
  
  // Generate device name with version info
  const deviceName = browserVersion 
    ? `${browser} ${browserVersion.split('.')[0]} on ${os}${osVersion ? ' ' + osVersion : ''}`
    : `${browser} on ${os}${osVersion ? ' ' + osVersion : ''}`;
  
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

  // Generate current session info with real session ID
  const generateCurrentSession = async (): Promise<SessionInfo> => {
    const deviceInfo = getDeviceInfo();
    const locationInfo = await getLocationInfo();
    const sessionId = generateSessionId();
    
    // Store session ID in localStorage to persist across page reloads
    const storedSessionId = localStorage.getItem('current-session-id');
    const currentSessionId = storedSessionId || sessionId;
    
    if (!storedSessionId) {
      localStorage.setItem('current-session-id', currentSessionId);
      localStorage.setItem('session-created-at', new Date().toISOString());
    }
    
    const createdAt = localStorage.getItem('session-created-at') 
      ? new Date(localStorage.getItem('session-created-at')!)
      : new Date();
    
    return {
      id: currentSessionId,
      deviceName: deviceInfo.deviceName || 'Unknown Device',
      browser: deviceInfo.browser || 'Unknown',
      os: deviceInfo.os || 'Unknown',
      location: locationInfo.location,
      ipAddress: locationInfo.ipAddress,
      lastActive: new Date(),
      isCurrent: true,
      createdAt
    };
  };

  // Function to get stored sessions and merge with current session
  const getStoredSessions = (): SessionInfo[] => {
    try {
      const stored = localStorage.getItem('user-sessions');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error parsing stored sessions:', error);
      return [];
    }
  };

  // Function to store sessions
  const storeSessions = (sessions: SessionInfo[]) => {
    try {
      localStorage.setItem('user-sessions', JSON.stringify(sessions));
    } catch (error) {
      console.error('Error storing sessions:', error);
    }
  };

  // Function to generate sessions with real current session and stored sessions
  const generateRealSessions = async (): Promise<SessionInfo[]> => {
    const currentSession = await generateCurrentSession();
    const storedSessions = getStoredSessions();
    
    // Filter out any existing current session from stored sessions
    const otherSessions = storedSessions.filter(session => 
      session.id !== currentSession.id && !session.isCurrent
    );
    
    // Update last active time for current session
    const updatedSessions = [currentSession, ...otherSessions];
    
    // Store updated sessions
    storeSessions(updatedSessions);
    
    return updatedSessions;
  };

  const refreshSessions = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Use real session identification instead of mock data
      const sessionsData = await generateRealSessions();
      setSessions(sessionsData);
    } catch (error) {
      console.error('Error fetching sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  const terminateSession = async (sessionId: string) => {
    try {
      // Remove session from local storage and state
      const updatedSessions = sessions.filter(session => session.id !== sessionId);
      setSessions(updatedSessions);
      storeSessions(updatedSessions);
      
      // In a real application, you would also call your backend API to terminate the session
      // await api.terminateSession(sessionId);
    } catch (error) {
      console.error('Error terminating session:', error);
      throw error;
    }
  };

  const terminateAllOtherSessions = async () => {
    try {
      // Keep only the current session
      const currentSession = sessions.find(session => session.isCurrent);
      const updatedSessions = currentSession ? [currentSession] : [];
      setSessions(updatedSessions);
      storeSessions(updatedSessions);
      
      // In a real application, you would call your backend API
      // await api.terminateAllOtherSessions();
    } catch (error) {
      console.error('Error terminating all other sessions:', error);
      throw error;
    }
  };

  // Update last active time periodically
  useEffect(() => {
    if (!user) {
      setSessions([]);
      setLoading(false);
      return;
    }

    // Initial load
    refreshSessions();

    // Update last active time every 30 seconds
    const interval = setInterval(async () => {
      try {
        const currentSessionId = localStorage.getItem('current-session-id');
        if (currentSessionId) {
          setSessions(prev => prev.map(session => 
            session.id === currentSessionId 
              ? { ...session, lastActive: new Date() }
              : session
          ));
          
          // Update stored sessions
          const storedSessions = getStoredSessions();
          const updatedStoredSessions = storedSessions.map(session =>
            session.id === currentSessionId
              ? { ...session, lastActive: new Date() }
              : session
          );
          storeSessions(updatedStoredSessions);
        }
      } catch (error) {
        console.error('Error updating session activity:', error);
      }
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [user]);

  // Track user activity to update last active time
  useEffect(() => {
    const updateActivity = () => {
      const currentSessionId = localStorage.getItem('current-session-id');
      if (currentSessionId && user) {
        setSessions(prev => prev.map(session => 
          session.id === currentSessionId 
            ? { ...session, lastActive: new Date() }
            : session
        ));
      }
    };

    // Listen for user activity
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    events.forEach(event => {
      document.addEventListener(event, updateActivity, { passive: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, updateActivity);
      });
    };
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
