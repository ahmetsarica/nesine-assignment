'use client';
import React, { useState, useRef, useContext } from 'react';
import { FixedSizeList, FixedSizeListProps } from 'react-window';
import ClickableCell from '../clickableCell/ClickableCell';
import { Match } from '@/app/schedule/page';

/** Context for managing table state */
const VirtualTableContext = React.createContext<{
  top: number;
  setTop: (top: number) => void;
  header: React.ReactNode;
  footer: React.ReactNode;
}>({
  top: 0,
  setTop: () => {},
  header: <></>,
  footer: <></>,
});

/** Main Virtual Table Component */
function VirtualTable({
  row,
  header,
  footer,
  ...rest
}: {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  row: FixedSizeListProps['children'];
} & Omit<FixedSizeListProps, 'children' | 'innerElementType'>) {
  const listRef = useRef<FixedSizeList | null>(null);
  const [top, setTop] = useState(0);

  return (
    <VirtualTableContext.Provider value={{ top, setTop, header, footer }}>
      <FixedSizeList
        {...rest}
        innerElementType={Inner}
        onItemsRendered={(props) => {
          const style =
            listRef.current &&
            listRef.current._getItemStyle(props.overscanStartIndex);
          setTop((style && style.top) || 0);

          if (rest.onItemsRendered) {
            rest.onItemsRendered(props);
          }
        }}
        ref={(el) => (listRef.current = el)}
      >
        {row}
      </FixedSizeList>
    </VirtualTableContext.Provider>
  );
}

/** The Inner Component that wraps the list inside a table */
const Inner = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
  function Inner({ children, ...rest }, ref) {
    const { header, footer, top } = useContext(VirtualTableContext);
    return (
      <div {...rest} ref={ref}>
        <table style={{ top, position: 'absolute', width: '100%' }}>
          {header}
          <tbody>{children}</tbody>
          {footer}
        </table>
      </div>
    );
  }
);

/** The Row component that renders each item as a table row */
function Row({ index, data }: { index: number; data: Match[] }) {
  const item = data[index];
  return (
    <>
      <tr>
        <td className='py-0 border border-black'>
          {item.D} {item.DAY} {item.LN}
        </td>
        <td className='py-0 border border-black text-center'>Yorumlar</td>
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
    </>
  );
}

/** Render the virtualized table */
export default function ScheduleTable({
  initialData,
}: {
  initialData: Match[];
}) {
  const itemCount = initialData.length;
  const itemSize = 36; // Height of each row

  return (
    <VirtualTable
      height={1000} // Adjust this to the desired table height
      width='100%' // Full width table
      itemCount={itemCount}
      itemSize={itemSize}
      row={({ index }: { index: number }) => (
        <Row index={index} data={initialData} />
      )}
      header={
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
      }
    />
  );
}
