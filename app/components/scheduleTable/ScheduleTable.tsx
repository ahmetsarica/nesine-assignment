'use client';
import React, { useEffect, useState } from 'react';
import ClickableCell from '@/app/components/clickableCell/ClickableCell';
import { Match } from '@/app/schedule/page';

interface ScheduleTableProps {
  initialData: Match[];
}

const ScheduleTable = (props: ScheduleTableProps) => {
  const { initialData } = props;

  const [visibleItems, setVisibleItems] = useState<Match[]>(
    initialData.slice(0, 20)
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          loadMoreItems(); // Function to load more items
        }
      },
      { threshold: 1.0 } // Trigger when the element is fully in view
    );

    const target = document.querySelector('#load-more'); // Element to observe
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [visibleItems]);

  const loadMoreItems = () => {
    setVisibleItems((prevItems) => {
      const newCount = prevItems.length + 20; // Load 20 more items
      return initialData.slice(0, newCount);
    });
  };

  return (
    <>
      <table className='table border-collapse border-spacing-2 border'>
        <thead>
          <tr>
            <th>Event Count: {initialData.length}</th>
            <th className='border border-black text-center'> Yorumlar </th>
            <th className='border border-black text-center'></th>
            <th className='border border-black text-center'>1</th>
            <th className='border border-black text-center'>x</th>
            <th className='border border-black text-center'>2</th>
            <th className='border border-black text-center'>Alt</th>
            <th className='border border-black text-center'>Üst</th>
            <th className='border border-black text-center'>H1</th>
            <th className='border border-black text-center'>1</th>
            <th className='border border-black text-center'>x</th>
            <th className='border border-black text-center'>2</th>
            <th className='border border-black text-center'>H2</th>
            <th className='border border-black text-center'>1-X</th>
            <th className='border border-black text-center'>1-2</th>
            <th className='border border-black text-center'>X-2</th>
            <th className='border border-black text-center'>Var</th>
            <th className='border border-black text-center'>Yok</th>
            <th className='border border-black text-center'>+99</th>
          </tr>
        </thead>
        <tbody>
          {visibleItems.map((item) => (
            <React.Fragment key={item.C}>
              <tr>
                <td className='py-0 border border-black'>
                  {item.D} {item.DAY} {item.LN}
                </td>
                <td className='py-0 border border-black text-center'>
                  Yorumlar
                </td>
                <td className='py-0 border border-black text-center'></td>
                <td className='py-0 border border-black text-center'>
                  {item.OCG[1].OC[0].N}
                </td>
                <td className='py-0 border border-black text-center'>
                  {item.OCG[1].OC[1].N}
                </td>
                <td className='py-0 border border-black text-center'>
                  {item.OCG[1].OC[2]?.N || 2}
                </td>
                <td className='py-0 border border-black text-center'>
                  {item.OCG[5].OC[25].N}
                </td>
                <td className='py-0 border border-black text-center'>
                  {item.OCG[5].OC[26].N}
                </td>
                <td className='py-0 border border-black text-center'>H1</td>
                <td className='py-0 border border-black text-center'>
                  {item.OCG[1].OC[0].N}
                </td>
                <td className='py-0 border border-black text-center'>
                  {item.OCG[1].OC[1].N}
                </td>
                <td className='py-0 border border-black text-center'>
                  {item.OCG[1].OC[2]?.N || 2}
                </td>
                <td className='py-0 border border-black text-center'>H2</td>
                <td className='py-0 border border-black text-center'>
                  {item.OCG[2].OC[3].N}
                </td>
                <td className='py-0 border border-black text-center'>
                  {item.OCG[2].OC[4].N}
                </td>
                <td className='py-0 border border-black text-center'>
                  {item.OCG[2].OC[5].N}
                </td>
                <td className='py-0 border border-black text-center'>
                  {item.OCG[5].OC[25].N}
                </td>
                <td className='py-0 border border-black text-center'>
                  {item.OCG[5].OC[26].N}
                </td>
                <td className='py-0 border border-black text-center'></td>
              </tr>
              <tr>
                <td className='border border-black'>
                  <b>{item.C}</b> {item.T} {item.N}
                </td>
                <ClickableCell value='Yorumlar' />
                <ClickableCell value='4' />
                <ClickableCell
                  code={item.C}
                  mbs='4'
                  match={item.N}
                  value={item.OCG[1].OC[0].O}
                  rate={item.OCG[1].OC[0].O}
                  ocgId='1'
                  ocId='0'
                />
                <ClickableCell
                  code={item.C}
                  mbs='4'
                  match={item.N}
                  value={item.OCG[1].OC[1].O}
                  rate={item.OCG[1].OC[1].O}
                  ocgId='1'
                  ocId='1'
                />
                <ClickableCell
                  code={item.C}
                  mbs='4'
                  match={item.N}
                  value={item.OCG[1].OC[2]?.O}
                  rate={item.OCG[1].OC[2]?.O}
                  ocgId='1'
                  ocId='2'
                />
                <ClickableCell
                  code={item.C}
                  mbs='4'
                  match={item.N}
                  value={item.OCG[5].OC[25].O}
                  rate={item.OCG[5].OC[25].O}
                  ocgId='5'
                  ocId='25'
                />
                <ClickableCell
                  code={item.C}
                  mbs='4'
                  match={item.N}
                  value={item.OCG[5].OC[26].O}
                  rate={item.OCG[5].OC[26].O}
                  ocgId='5'
                  ocId='26'
                />
                <ClickableCell />
                <ClickableCell />
                <ClickableCell />
                <ClickableCell />
                <ClickableCell />
                <ClickableCell
                  code={item.C}
                  mbs='4'
                  match={item.N}
                  value={item.OCG[2].OC[3].O}
                  rate={item.OCG[2].OC[3].O}
                  ocgId='2'
                  ocId='3'
                />
                <ClickableCell
                  code={item.C}
                  mbs='4'
                  match={item.N}
                  value={item.OCG[2].OC[4].O}
                  rate={item.OCG[2].OC[4].O}
                  ocgId='2'
                  ocId='4'
                />
                <ClickableCell
                  code={item.C}
                  mbs='4'
                  match={item.N}
                  value={item.OCG[2].OC[5].O}
                  rate={item.OCG[2].OC[5].O}
                  ocgId='2'
                  ocId='5'
                />
                <ClickableCell />
                <ClickableCell />
                <ClickableCell />
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <div id='load-more' style={{ height: '1px' }}></div>
    </>
  );
};

export default ScheduleTable;
