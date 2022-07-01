import React from 'react'

export default function PaginationPage(props) {
  const {postsPerPage, totalPosts, paginate} = props 
  const pageNumbers = [];

  for(let i=1; i<=Math.ceil(totalPosts/postsPerPage); i++){
    pageNumbers.push(i);
  }
  return (
    <nav className="d-flex justify-content-center">
      <ul className='pagination mt-4'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item' style={{cursor:'pointer'}}>
            <a onClick={()=> paginate(number)} className='page-link'>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
