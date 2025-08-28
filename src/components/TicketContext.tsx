"use client";

import React, { createContext, useContext, useState } from 'react';

type TicketType = 'individual' | 'corporate';

interface TicketContextType {
  selectedTicket: TicketType;
  quantity: number;
  total: number;
  isClubMember: boolean;
  clubId: string;
  setSelectedTicket: (ticket: TicketType) => void;
  setQuantity: (quantity: number) => void;
  setIsClubMember: (isClubMember: boolean) => void;
  setClubId: (clubId: string) => void;
  getUnitPrice: () => number;
  getEventType: () => string;
}

const TicketContext = createContext<TicketContextType | undefined>(undefined);

export function TicketProvider({ children }: { children: React.ReactNode }) {
  const [selectedTicket, setSelectedTicket] = useState<TicketType>('individual');
  const [quantity, setQuantity] = useState(1);
  const [isClubMember, setIsClubMember] = useState(false);
  const [clubId, setClubId] = useState('');

  const getUnitPrice = () => {
    if (selectedTicket === 'individual') {
      return isClubMember && clubId.trim() ? 3500 : 5000;
    } else {
      return 50000;
    }
  };

  const getEventType = () => {
    return selectedTicket === 'individual' ? '5000' : '50000';
  };

  const total = getUnitPrice() * quantity;

  return (
    <TicketContext.Provider value={{
      selectedTicket,
      quantity,
      total,
      isClubMember,
      clubId,
      setSelectedTicket,
      setQuantity,
      setIsClubMember,
      setClubId,
      getUnitPrice,
      getEventType
    }}>
      {children}
    </TicketContext.Provider>
  );
}

export function useTicket() {
  const context = useContext(TicketContext);
  if (context === undefined) {
    throw new Error('useTicket must be used within a TicketProvider');
  }
  return context;
}
