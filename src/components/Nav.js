import React from 'react'
import logo from '../assets/icons/Logo.svg'
import basket from '../assets/icons/Basket.svg'

function Nav() {
  return (
    <nav>
        <div>
            <img src={logo}/>
        </div>
        <div>
            <ul>
                <li>
                    <a href='#'>Home</a>
                </li>
                <li>
                    <a href='#'>Test</a>
                </li>
            </ul>
        </div>
        <div>
            <img src={basket}/>
        </div>
    </nav>
  )
}

export default Nav