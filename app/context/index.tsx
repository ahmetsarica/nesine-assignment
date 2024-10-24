'use client';
import { createContext, useState, useContext } from 'react';

export interface betType {
  ocgId: string;
  ocId: string;
}

export interface Bet {
  mbs: number;
  code: string;
  match: string;
  rate: number;
  betType: betType;
}

const AppContext = createContext<any>(undefined);

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [selectedBets, setSelectedBets] = useState<Bet[]>([]);

  return (
    <AppContext.Provider value={{ selectedBets, setSelectedBets }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
