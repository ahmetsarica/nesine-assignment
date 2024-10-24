import React from 'react';
import ScheduleTable from '../components/scheduleTable/ScheduleTable';

export interface Match {
  C: string; // Match code
  N: string; // Match name (teams)
  TYPE: string; // Match type
  NID: string; // Match ID
  D: string; // Match date
  T: string; // Match time
  DAY: string; // Day of the week
  S: string; // Status of the match (e.g., "Open")
  LN: string; // League name
  IMF: boolean; // IMF flag
  OCG: OddsCategory; // Odds category
  HEC: boolean; // HEC flag
}

interface OddsCategory {
  [key: string]: OddsType;
}

interface OddsType {
  ID: string; // Odds ID
  N: string; // Odds name (e.g., "Maç Sonucu")
  MBS: string; // Minimum bet amount or other indicator
  SO: number; // Sorting order
  OC: OddsChoice; // Odds choices
}

interface OddsChoice {
  [key: string]: OddsOption;
}

interface OddsOption {
  ID: string; // Option ID
  O: string; // Odds value
  N: string; // Option name (e.g., "1", "X")
  MBS: string; // Minimum bet amount
  G: string; // Group or other indicator
  OD: number; // Additional data (e.g., odds difference)
  IMF: boolean; // IMF flag
}

const SchedulePage = async () => {
  const response = await fetch('https://nesine-case-study.onrender.com/bets');
  const data: Match[] = await response.json();

  return (
    <>
      <ScheduleTable initialData={data} />
    </>
  );
};

export default SchedulePage;
