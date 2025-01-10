"use client";
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { UserResult } from './types/user';
import { userFunctions } from './services/user.service';

interface UserContextType {
  user: UserResult | null;
  loading: boolean;
  error: Error | null;
  refetchUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { getUserByID } = userFunctions();

  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);
      const startTime = Date.now();
      
      const userData = await getUserByID();
      
      // Calculate how long the request took
      const requestTime = Date.now() - startTime;
      
      // If request was faster than 1000ms, wait for the remaining time
      if (requestTime < 1000) {
        await new Promise(resolve => setTimeout(resolve, 1000 - requestTime));
      }
      
      setUser(userData);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch user'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <UserContext.Provider value={{ user, loading, error, refetchUser: fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};