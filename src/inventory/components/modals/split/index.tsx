import React, { useState } from 'react'

import './styles/SplitModal.scss'

export interface SplitModalProps {
  title: string,
  onSubmit?: (value: number) => void,
  onSplitInHalf?: () => void
}

const SplitModal = (props: SplitModalProps) => {
  const [value, setValue] = useState(0);
  const onValueChange = (e: React.ChangeEvent) => {
    const value: number = Number((e.target as HTMLInputElement).value);
    setValue(value);
  }
  const onSubmit = (e: React.MouseEvent) => {
    props.onSubmit?.(value);
  }
  const onSplitInHalf = (e: React.MouseEvent) => {
    props.onSplitInHalf?.();
  }

  return (
    <div className='split-modal'>
      <p className='split-modal__title'>{props.title}</p>
      <input className='split-modal__input' type='number' onChange={onValueChange} value={value} min={0} />
      <div className="split-modal__buttons">
        <button className="split-modal__button split-modal__button_type_submit" onClick={onSubmit}>Разделить</button>
        <button className="split-modal__button split-modal__button_type_secondary" onClick={onSplitInHalf}>50/50</button>
      </div>
    </div>
  )
}

export default SplitModal