import React from 'react'

import './StylePaginacaoComponent.css'

function PaginacaoComponent({ setCurrentPage, currentPage, pages }) {

  function porPages(e) {
    let index = Number(e.target.value)

    if (index !== 0) {
      setCurrentPage(index);
    }
    else {
      setCurrentPage(0);
    }
  }

  return (
    <>
      {pages !== 1 &&

        <div className="containerPaginacao">

          {Array.from(Array(pages), (item, index) => {
            return <button
              key={index}
              style={index === currentPage ? { backgroundColor: 'var(--color-azul-claro-texto)' } : null}
              value={index}
              onClick={porPages}
              className="paginacao">{index + 1}
            </button>
          })}

        </div >
      }
    </>
  )
}
export default PaginacaoComponent