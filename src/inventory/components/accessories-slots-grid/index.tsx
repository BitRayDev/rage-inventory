import React, { useState } from 'react'

import './styles/AccessoriesSlotsGrid.scss'

import armourPlaceholder from '../../assets/img/placeholders/armour.svg';
import backpackPlaceholder from '../../assets/img/placeholders/backpack.svg';
import beltPlaceholder from '../../assets/img/placeholders/belt.svg';
import bootsPlaceholder from '../../assets/img/placeholders/boots.svg';
import capPlaceholder from '../../assets/img/placeholders/cap.svg';
import glassesPlaceholder from '../../assets/img/placeholders/glasses.svg';
import glovesPlaceholder from '../../assets/img/placeholders/gloves.svg';
import hoodyPlaceholder from '../../assets/img/placeholders/hoody.svg';
import jewerlyPlaceholder from '../../assets/img/placeholders/jewerly.svg';
import maskPlaceholder from '../../assets/img/placeholders/mask.svg';
import shirtPlaceholder from '../../assets/img/placeholders/shirt.svg';
import trousesPlaceholder from '../../assets/img/placeholders/trouses.svg';

import Slot, { SlotItem } from '../slot';
import { EquipmentSlot, EquipmentSlotId } from '../equipment-slots-grid';

export interface AccessoriesSlotsGridProps {
  slots?: EquipmentSlot[],
  onDragStart?: (e: React.DragEvent, slotId: EquipmentSlotId) => void,
  onDragOver?: (e: React.DragEvent, slotId: EquipmentSlotId) => boolean,
  onDrop?: (e: React.DragEvent, slotId: EquipmentSlotId) => void,
  onDragEnd?: (e: React.DragEvent, slotId: EquipmentSlotId) => void,
  onContextMenu?: (e: React.MouseEvent, slot: EquipmentSlotId) => void,
}

interface AccessoriesSlot {
  id: EquipmentSlotId,
  placeholder: string
}

const AccessoriesSlotsGrid = (props: AccessoriesSlotsGridProps) => {
  const slots: AccessoriesSlot[] = [
    {
      id: 'mask',
      placeholder: maskPlaceholder
    },
    {
      id: 'cap',
      placeholder: capPlaceholder
    },
    {
      id: 'glasses',
      placeholder: glassesPlaceholder
    },
    {
      id: 'shirt',
      placeholder: shirtPlaceholder
    },
    {
      id: 'jewerly',
      placeholder: jewerlyPlaceholder
    },
    {
      id: 'belt',
      placeholder: beltPlaceholder
    },
    {
      id: 'armour',
      placeholder: armourPlaceholder
    },
    {
      id: 'top',
      placeholder: hoodyPlaceholder
    },
    {
      id: 'backpack',
      placeholder: backpackPlaceholder
    },
    {
      id: 'gloves',
      placeholder: glovesPlaceholder
    },
    {
      id: 'trouses',
      placeholder: trousesPlaceholder
    },
    {
      id: 'boots',
      placeholder: bootsPlaceholder
    },
  ]

  const getItemFromSlotById = (slotId: EquipmentSlotId) => {
    return props.slots?.filter(slot => slot.slotId === slotId)?.[0]?.item;
  }

  const slotsElements = slots.map(slot => (
    <Slot
      key={slot.id}
      item={getItemFromSlotById(slot.id)}
      className={`accessories-slots-grid__slot accessories-slots-grid__slot_type_${slot.id}`}
      placeholder={slot.placeholder}
      onDragStart={(e) => props.onDragStart?.(e, slot.id)}
      onDragOver={(e) => props.onDragOver?.(e, slot.id) ?? false}
      onDrop={(e) => props.onDrop?.(e, slot.id)}
      onDragEnd={(e) => props.onDragEnd?.(e, slot.id)}
      onContextMenu={(e) => props.onContextMenu?.(e, slot.id)}
    />
  ))

  return (
    <div className='accessories-slots-grid'>
      {slotsElements}
    </div>
  )
}

export default AccessoriesSlotsGrid