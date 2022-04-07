import React from 'react'

import './styles/CircleStatsProperty.scss'

export interface CircleStatsPropertyProps {
  value: number,
  icon: string,
  color: string
}

const CircleStatsProperty = (props: CircleStatsPropertyProps) => {
  const clampValue = () => {
    let clampedValue;
    if (props.value > 100)
      clampedValue = 100;
    else if (props.value < 0)
      clampedValue = 0;
    else
      clampedValue = props.value;

    return clampedValue;
  }

  return (
    <div className='circle-stats-property'>
      <div className='circle-stats-property__circle'>
        <svg className='circle-stats-property__circle-border' viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="54" fill="none" stroke="white" strokeOpacity='0.25' strokeWidth="2" />
          <circle style={{ boxShadow: `0 0 2vw ${props.color}` }} strokeDasharray="100" strokeDashoffset={100 - clampValue()} cx="60" cy="60" r="54" fill="none" stroke={props.color} strokeWidth="2" pathLength="100" />
        </svg>
        <img className='circle-stats-property__icon' src={props.icon} />
      </div>
      <p className='circle-stats-property__text-value'>{clampValue()} %</p>
    </div>
  )
}

export default CircleStatsProperty