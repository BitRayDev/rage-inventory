import React from 'react'

import './styles/RowStatsProperty.scss'

export interface RowStatsPropertyProps {
  icon?: string,
  title: string,
  value: string
}

const RowStatsProperty = (props: RowStatsPropertyProps) => {
  return (
    <div className='row-stats-property'>
      <img className='row-stats-property__icon' src={props.icon} />
      <p className='row-stats-property__title'>{props.title}</p>
      <p className='row-stats-property__value'>{props.value}</p>
    </div>
  )
}

export default RowStatsProperty