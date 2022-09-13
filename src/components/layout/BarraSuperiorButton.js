import React from 'react'

import './StyleBarraSuperiorButton.css'

function BarraSuperiorButton({ name, namebutton, functionbutton, handleOnChange, value }) {
  return (
    <header>
      <h1>{name}</h1>
      <div className='search-box'>

        <input onChange={handleOnChange} value={value}
          type='text' className='search-txt' placeholder='Pesquisar'></input>

        <div className="g-search">
          <i className="gg-search"></i>
        </div>
      </div>
      <button className='btnAdd' onClick={functionbutton}>{namebutton}</button>
    </header>
  )
}

export default BarraSuperiorButton