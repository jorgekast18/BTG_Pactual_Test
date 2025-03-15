import { useContext } from 'react';
import { BalanceContext } from '../context/BalanceContext';
import { BalanceContextType } from '../models';

export const useBalance = (): BalanceContextType => {
    const context = useContext(BalanceContext);
    if (!context) {
      throw new Error('useBalance must be used within a BalanceProvider');
    }
    return context;
  };
  