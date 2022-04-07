import React from 'react'

import './styles/DropZoneLabel.scss';

export interface DropZoneLabelProps {
  icon: string,
  title: string,
  text: string
}

const DropZoneLabel = (props: DropZoneLabelProps) => {
  return (
    <div className='drop-zone-label'>
      <div className='drop-zone-label__icon-container'>
        <img className="drop-zone-label__icon" src={props.icon}/>
      </div>
      <div className='drop-zone-label__text-container'>
        <p className="drop-zone-label__title">{props.title}</p>
        <p className="drop-zone-label__text">{props.text}</p>
      </div>
    </div>
  )
}

export default DropZoneLabel;