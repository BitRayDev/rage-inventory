import React, { useState } from 'react'
import DropZoneLabel from '../drop-zone-label'

import './styles/DropZone.scss'

export interface DropZoneProps {
  icon: string,
  title: string,
  description: string,

  onDragOver?: (e: React.DragEvent) => boolean,
  onDrop?: (e: React.DragEvent) => void
}

const DropZone = (props: DropZoneProps) => {
  const [isHighlighted, setIsHighlighted] = useState<boolean | undefined>(false);

  const handleDragOver = (e: React.DragEvent) => {
    setIsHighlighted(props.onDragOver?.(e));
  }

  const handleDrop = (e: React.DragEvent) => {
    setIsHighlighted(false);
    props.onDrop?.(e);
  }

  const handleDragLeave = () => {
    setIsHighlighted(false);
  }

  return (
    <div className={`drop-zone ${isHighlighted ? 'drop-zone_available' : ''}`} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
      <DropZoneLabel icon={props.icon} title='Выбросить' text='Предмет будет выброшен рядом с Вами' />
    </div>
  )
}



export default DropZone