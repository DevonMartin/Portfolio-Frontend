import React from 'react'

function Header(props) {
  return (
    <header className='underlined-heading'>
      <h2 className="underlined-heading">{props.string}</h2>
    </header>
  );
}

export default Header