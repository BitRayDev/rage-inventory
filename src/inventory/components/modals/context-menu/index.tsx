import React from 'react'

import './styles/ContextMenu.scss'

import { SlotItem } from '../../slot'

import weightIcon from '../../../assets/img/icons/black-weight.svg';

export interface ContextMenuProps {
  title: string,
  weight: string,
  actions: string[]
  style?: React.CSSProperties,
  onActionClick?: (e: React.MouseEvent, action: string) => void
  onClose?: (e: React.MouseEvent) => void
}

const ContextMenu = (props: ContextMenuProps) => {
  const actionsElements = props.actions.map(action => (
    <p className='context-menu__action' key={action} onClick={(e) => props.onActionClick?.(e, action)}>
      {action}
    </p>
  ))

  return (
    <div className='context-menu' style={props.style}>
      <div className="context-menu__header">
        <p className="context-menu__title">{props.title}</p>
        <div className="context-menu__weight-container">
          <img className='context-menu__weight-icon' src={weightIcon} />
          <div className="context-menu__weight-value">{props.weight}</div>
        </div>
      </div>
      <div className="context-menu__actions">
        {actionsElements}
      </div>
    </div>
  )
}

export default ContextMenu