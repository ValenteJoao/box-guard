import React from 'react'
import { IoMdArrowDropright } from 'react-icons/io'

import './StyleBarraInferior.css'


function BarraInferior({ infoA, textA }) {
  return (
    <footer>
      <div className='bottomInfo'>
        <IoMdArrowDropright />
        <p className='text'>{textA}: {infoA}</p>
      </div>
    </footer>
  )
}

export default BarraInferior