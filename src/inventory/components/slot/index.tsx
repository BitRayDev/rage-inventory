import React, { useState } from 'react'

import './styles/Slot.scss';

export interface SlotItem {
  icon: string,
  sizeX?: number,
  sizeY?: number,
  upperLeftText?: string,
  upperCentralText?: string,
  upperRightText?: string,
  lowerLeftText?: string,
  lowerCentralText?: string,
  lowerRightText?: string,
}

export interface SlotProps {
  item?: SlotItem,
  style?: React.CSSProperties,
  className?: string,
  placeholder?: string,
  index?: string,

  onDragStart?: (e: React.DragEvent) => void
  onDragOver?: (e: React.DragEvent) => boolean
  onDrop?: (e: React.DragEvent) => void
  onDragEnd?: (e: React.DragEvent) => void
  onContextMenu?: (e: React.MouseEvent) => void
}

const Slot = (props: SlotProps) => {
  const [isAvailableToDrop, setIsAvailableToDrop] = useState<boolean>(false);
  const [isDropOver, setIsDropOver] = useState<boolean>(false);

  const handleDragOver = (e: React.DragEvent) => {
    setIsDropOver(true);
    if (props.onDragOver)
    setIsAvailableToDrop(props.onDragOver(e));
  }
  const handleDrop = (e: React.DragEvent) => {
    setIsDropOver(false);
    props.onDrop?.(e);
  }
  const handleDragLeave = (e: React.DragEvent) => {
    setIsDropOver(false);
  }

  return (
    <div
      className={`slot ${props.className ?? ''} ${isDropOver ? `slot_drop_${isAvailableToDrop}` : ''}`}
      style={props.style}
      draggable={Boolean(props.item?.icon)}
      onDragStart={props.onDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragLeave={handleDragLeave}
      onDragEnd={props.onDragEnd}
      onContextMenu={props.onContextMenu}
    >
      <div className='slot__text-container'>
        <p className='slot__text slot__text_position_upper-left'>{props.item?.upperLeftText}</p>
        <p className='slot__text slot__text_position_upper-center'>{props.item?.upperCentralText}</p>
        <p className='slot__text slot__text_position_upper-right'>{props.item?.upperRightText}</p>
      </div>

      <img className='slot__icon' src={props.item?.icon ?? props.placeholder} />

      <div className='slot__text-container'>
        <p className='slot__text slot__text_position_lower-left'>{props.item?.lowerLeftText}</p>
        <p className='slot__text slot__text_position_lower-center'>{props.item?.lowerCentralText}</p>
        <p className='slot__text slot__text_position_lower-right'>
          {props.item?.lowerRightText}
          {props.index && <span className='slot__index'>{props.index}</span>}
        </p>
      </div>
    </div>
  )
}

export default Slot