import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import{ BsBell } from "react-icons/bs";
import{ BsImage  } from "react-icons/bs";
import{ BsThreeDots  } from "react-icons/bs";
import{ BsSearch } from "react-icons/bs";




function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <nav className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <div className='nav-title'>
          <Link to='/' className='navbar-logo' >
          Web Design Library 
        </Link>
        </div>
        <div className='Icons'> 
        <ul>
        <li className="search-box">
        <input
          className="search-txt"
          type="text"
          name="searchBox"
          placeholder="Search now"
        />
        <a className="search-btn" href="#" />
            <BsSearch className="searchIcon" />
        </li>
        </ul>
        <ul className='Nav-menu'>
        <li>
            <Link to='/bell' className='icons' >
            <BsBell className="bellIcon"/>
            </Link>
            </li>
           <li>
            <Link to='/img' className='icons' >
            <BsImage  className="imgIcon"/>
            </Link>
          </li>        
          <li>
            <Link to='/dots' className='icons' >
            <BsThreeDots  className="dotsIcon"/>
            </Link>
          </li>
          </ul>
          </div>
          </nav>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;