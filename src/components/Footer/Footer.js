import React from 'react'

import './Style.css'

export default function Footer() {

    const date = new Date().getFullYear();

  return (
    <div className="div-footer">
      <p>&copy;  {date} E-Courses.</p>
    </div>
  )
}
