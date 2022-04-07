import React from 'react'

import './styles/EquipmentSlotsLayout.scss';

import AccessoriesSlotsGrid from '../accessories-slots-grid'
import Slot, { SlotItem } from '../slot'

export interface EquipmentSlotsGridProps {
  slots?: EquipmentSlot[],
  onDragStart?: (e: React.DragEvent, slot: EquipmentSlot) => void,
  onDragOver?: (e: React.DragEvent, slot: EquipmentSlot) => boolean,
  onDrop?: (e: React.DragEvent, slot: EquipmentSlot) => void,
  onDragEnd?: (e: React.DragEvent, slot: EquipmentSlot) => void,
  onContextMenu?: (e: React.MouseEvent, slot: EquipmentSlot) => void,
}
export type EquipmentSlotId = "mask" | "cap" | "glasses"
  | "jewerly" | "armour" | "backpack"
  | "gloves" | "trouses" | "boots"
  | "top" | "belt" | "shirt" | "weapon"
  | "indexed1" | "indexed2" | "indexed3" | "indexed4" | "indexed5";

export interface EquipmentSlot {
  slotId: EquipmentSlotId,
  item?: SlotItem
}

const EquipmentSlotsGrid = (props: EquipmentSlotsGridProps) => {

  const constructSlotObject = (slotId: EquipmentSlotId) => {
    const existingSlotData = props.slots?.filter(slot => slot.slotId === slotId)?.[0];
    const slotObject: EquipmentSlot = {
      ...existingSlotData,
      slotId
    }
    return slotObject;
  }

  const getItemFromSlotById = (slotId: EquipmentSlotId) => {
    return props.slots?.filter(slot => slot.slotId === slotId)?.[0]?.item;
  }

  let indexedSlotsElements: React.ReactElement[] = [];
  for (let i = 1; i <= 5; i++) {
    indexedSlotsElements.push(
      <div className='equipment-slots-layout__indexed-slot-wrapper'>
        <Slot
          index={`${i}`}
          key={i}
          item={getItemFromSlotById(`indexed${i}` as EquipmentSlotId)}
          onDragStart={(e) => props.onDragStart?.(e, constructSlotObject(`indexed${i}` as EquipmentSlotId))}
          onDragOver={(e) => props.onDragOver?.(e, constructSlotObject(`indexed${i}` as EquipmentSlotId)) ?? false}
          onDrop={(e) => props.onDrop?.(e, constructSlotObject(`indexed${i}` as EquipmentSlotId))}
          onDragEnd={(e) => props.onDragEnd?.(e, constructSlotObject(`indexed${i}` as EquipmentSlotId))}
          onContextMenu={(e) => props.onContextMenu?.(e, constructSlotObject(`indexed${i}` as EquipmentSlotId))}
        />
      </div>
    )
  }

  return (
    <div className='equipment-slots-layout'>
      <div className='equipment-slots-layout__accessories-and-weapons'>
        <AccessoriesSlotsGrid
          slots={props.slots}
          onDragStart={(e, slotId) => props.onDragStart?.(e, constructSlotObject(slotId))}
          onDragOver={(e, slotId) => props.onDragOver?.(e, constructSlotObject(slotId)) ?? false}
          onDrop={(e, slotId) => props.onDrop?.(e, constructSlotObject(slotId))}
          onDragEnd={(e, slotId) => props.onDragEnd?.(e, constructSlotObject(slotId))}
          onContextMenu={(e, slotId) => props.onContextMenu?.(e, constructSlotObject(slotId))}
        />
        <Slot className='equipment-slots-layout__weapon-slot'
          item={getItemFromSlotById('weapon')}
          onDragStart={(e) => props.onDragStart?.(e, constructSlotObject('weapon'))}
          onDragOver={(e) => props.onDragOver?.(e, constructSlotObject('weapon')) ?? false}
          onDrop={(e) => props.onDrop?.(e, constructSlotObject('weapon'))}
          onDragEnd={(e) => props.onDragEnd?.(e, constructSlotObject('weapon'))}
          onContextMenu={(e) => props.onContextMenu?.(e, constructSlotObject('weapon'))}
        />
      </div>
      <div className='equipment-slots-layout__indexed-slots'>
        {indexedSlotsElements}
      </div>
    </div>
  )
}

export default EquipmentSlotsGrid