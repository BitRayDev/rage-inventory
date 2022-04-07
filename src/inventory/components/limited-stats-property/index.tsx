import React from 'react'

import './styles/LimitedStatsProperty.scss'

export interface LimitedStatsPropertyProps {
  icon: string,
  title: string,
  value: string,
  limit: string
}

const LimitedStatsProperty = (props: LimitedStatsPropertyProps) => {
  return (
    <div className='limited-stats-property'>
      <img className="limited-stats-property__icon" src={props.icon}/>
      <p className="limited-stats-property__title">{props.title}</p>
      <div className="limited-stats-property__value-container">
        <p className="limited-stats-property__value">{props.value}</p>
        <p className="limited-stats-property__limit">/ {props.limit}</p>
      </div>
    </div>
  )
}

export default LimitedStatsProperty