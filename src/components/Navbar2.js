import React from 'react'
import { Link } from 'react-router-dom';

function Navbar2() {
  return (
    
<div className="container  ">
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb p-3 bg-body-tertiary rounded-3">
      
      <li class="breadcrumb-item">
        <Link className="link-body-emphasis fw-semibold text-decoration-none" to="/">Home</Link>
      </li>
      
      <li className="breadcrumb-item active" aria-current="page">
        Data
      </li>
    </ol>
  </nav>
</div>
  )
}

export default Navbar2
