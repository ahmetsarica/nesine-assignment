'use client';
import React, { useMemo } from 'react';
import { Bet, useAppContext } from '../../context';

const Basket = () => {
  const { selectedBets } = useAppContext();

  const renderedBets = useMemo(() => {
    return selectedBets.map((bet: Bet) => (
      <div key={bet.code} className='flex gap-4 border-b border-black py-4'>
        <div>{bet.mbs}</div>
        <div>Kod: {bet.code}</div>
        <div>Maç: {bet.match}</div>
        <div>
          <b>Oran:</b> {bet.rate}
        </div>
      </div>
    ));
  }, [selectedBets]);

  const calculateTotal = () => {
    return selectedBets
      .reduce((total: number, bet: Bet) => {
        return isNaN(bet.rate) ? total : total * bet.rate;
      }, 1)
      .toFixed(2);
  };

  return (
    <div className='fixed bottom-0 right-0 flex flex-col border-l border-t border-black py-3 px-6 bg-white shadow-l'>
      <div className='overflow-y-auto max-h-96 mb-6'>{renderedBets}</div>
      <div className='text-2xl font-bold'>Toplam Tutar: {calculateTotal()}</div>
    </div>
  );
};

export default Basket;
