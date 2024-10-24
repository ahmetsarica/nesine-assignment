'use client';
import React from 'react';
import { Bet, useAppContext } from '../../context';

interface ClickableCellProps {
  code?: string;
  mbs?: string;
  match?: string;
  value?: string;
  rate?: string;
  ocgId?: string;
  ocId?: string;
}

const ClickableCell = (props: ClickableCellProps) => {
  const { code, mbs, match, value, rate, ocgId, ocId } = props;

  const { selectedBets, setSelectedBets } = useAppContext();

  const selectBet = () => {
    setSelectedBets((prev: Bet[]) => {
      // if the codes are same it means bet is changed. Removes the old bet
      let filteredBets = prev.filter((bet) => bet.code !== code);

      const currentBet: Bet = selectedBets.find(
        (item: Bet) => item.code === code
      );

      // if ocgId and ocId are the same, it means same bet is clicked. Removes the  current bet
      if (
        currentBet &&
        currentBet.betType.ocId === ocId &&
        currentBet.betType.ocgId === ocgId
      ) {
        return filteredBets.filter((item) => item.code != code);
      }

      // Cells withouth data shouldn be selected
      if (!ocgId || !ocId || !value) {
        return filteredBets;
      }

      return [
        ...filteredBets,
        {
          mbs,
          code,
          match,
          value,
          rate,
          betType: { ocgId: ocgId, ocId: ocId },
        },
      ];
    });
  };

  const checkIfSelected = () => {
    if (!ocId || !ocgId) return false;
    const currentBet: Bet = selectedBets.find(
      (item: Bet) => item.code === code
    );
    return (
      currentBet?.betType?.ocgId === ocgId && currentBet?.betType?.ocId === ocId
    );
  };

  return (
    <td
      className={`border border-black text-center cursor-pointer ${
        checkIfSelected() ? 'bg-yellow-300' : ''
      }`}
      onClick={() => selectBet()}
    >
      {value}
    </td>
  );
};

export default ClickableCell;
