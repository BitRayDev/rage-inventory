import React from 'react'

import './styles/SectionDescription.scss';

export interface SectionDescriptionProps {
  icon: string,
  title: string,
  text: string
}

const SectionDescription = (props: SectionDescriptionProps) => {
  return (
    <div className='section-description'>
      <div className='section-description__icon-container'>
        <img className="section-description__icon" src={props.icon}/>
      </div>
      <div className='section-description__text-container'>
        <p className="section-description__title">{props.title}</p>
        <p className="section-description__text">{props.text}</p>
      </div>
    </div>
  )
}

export default SectionDescription;