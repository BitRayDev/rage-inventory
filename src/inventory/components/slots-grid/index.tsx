import React, { ReactElement } from 'react'
import Slot, { SlotItem } from '../slot'
import './styles/SlotsGrid.scss'

export interface GridSlot {
  slotId: number,
  item?: SlotItem
}

export interface SlotsGridProps {
  rowsAmount: number,
  columnsAmount: number,
  slotWidth: string,
  gap: string,

  slots?: GridSlot[],
  onDragStart?: (e: React.DragEvent, slot: GridSlot) => void,
  onDragOver?: (e: React.DragEvent, slot: GridSlot) => boolean,
  onDrop?: (e: React.DragEvent, slot: GridSlot) => void,
  onDragEnd?: (e: React.DragEvent, slot: GridSlot) => void,
  onContextMenu?: (e: React.MouseEvent, slot: GridSlot) => void,
}

const SlotsGrid = (props: SlotsGridProps) => {
  const gridStyle = {
    gridTemplateRows: `repeat(${props.rowsAmount}, ${props.slotWidth})`,
    gridTemplateColumns: `repeat(${props.columnsAmount}, ${props.slotWidth})`,
    gap: props.gap
  }

  let slotsElements: ReactElement[] = [];
  let slotsProceedIndicators: boolean[] = Array(props.columnsAmount * props.rowsAmount).fill(false);
  for (let row = 0; row < props.rowsAmount; row++) {
    for (let col = 0; col < props.columnsAmount; col++) {
      let slotId = row * props.columnsAmount + col;
      if (slotsProceedIndicators[slotId])
        continue;

      const slotData: GridSlot = {
        ...props.slots?.filter(slot => slot.slotId === slotId)?.[0],
        slotId
      }
      const slotSizeX = slotData.item?.sizeX ?? 1;
      const slotSizeY = slotData.item?.sizeY ?? 1;

      for (let row1 = row; row1 < row + slotSizeY; row1++) {
        for (let col1 = col; col1 < col + slotSizeX; col1++) {
          let slotId1 = row1 * props.columnsAmount + col1;
          slotsProceedIndicators[slotId1] = true;
        }
      }

      const slotStyle: React.CSSProperties = {
        gridArea: `${row + 1} / ${col + 1} / span ${slotSizeY} / span ${slotSizeX}`
      }

      slotsElements.push(
        <Slot
          key={slotId}
          style={slotStyle}
          item={slotData.item}
          onDragStart={(e) => props.onDragStart?.(e, slotData)}
          onDragOver={(e) => props.onDragOver?.(e, slotData) ?? false}
          onDrop={(e) => props.onDrop?.(e, slotData)}
          onDragEnd={(e) => props.onDragEnd?.(e, slotData)}
          onContextMenu={(e) => props.onContextMenu?.(e, slotData)}
        />
      );
    }
  }

  return (
    <div className='slots-grid' style={gridStyle}>
      {slotsElements}
    </div>
  )
}

export default SlotsGrid