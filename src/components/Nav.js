import React from 'react'
import logo from '../assets/icons/Logo.svg'
import basket from '../assets/icons/Basket.svg'

function Nav() {
  return (
    <nav style={{display: "flex"}}>
        <div>
            <img src={logo}/>
        </div>
        <div >
            <ul style={{display: "flex", justifyContent: "space-around", alignContent: "space-between", gap: "1rem"}}>
                <li>
                    <a href='#'>Home</a>
                </li>
                <li>
                    <a href='#'>Test</a>
                </li>
            </ul>
        </div>
        <div style={{flexGrow: 1}}/>
        <div>
            <img src={basket}/>
        </div>
    </nav>
  )
}

export default Nav