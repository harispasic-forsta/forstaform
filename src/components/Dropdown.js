import React, { useState } from 'react';
import { MenuItems } from './MenuItems';
import './Dropdown.css';
import { Link } from 'react-router-dom';

export default function Dropdown() {
  const [dropdown, setDropdown] = useState(false);


  const showDropdown = () => setDropdown(!dropdown)


  return (
    <>
      <ul
        onClick={showDropdown}
        className={dropdown ? 'dropdown-menu clicked' : 'dropdown-menu'}
      >
        {MenuItems.map((item, index) => {
          return (
            <li key={index} >
              <Link
                className={item.cName}
                to={item.path}
                onClick={() => setDropdown(false)}
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}


