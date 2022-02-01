import React, { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./Navbar.css";
import { IconContext } from "react-icons";
import * as AiIcons from "react-icons/ai";
import { BsBell } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import Dropdown from "./Dropdown";
import { MenuItems } from './MenuItems';


export default function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  const showDropdown = () => setDropdown(!dropdown)
  const closeMobileMenu = () => setClick(false);

  /*useEffect(() => {
    document.addEventListener('mousedown', () => {
      setDropdown(true)
    }) 
  })*/



  return (
    <>
      <IconContext.Provider value={{ color: "black" }}>
        <nav className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars className="hamburger" onClick={showSidebar} />
          </Link>
          <div className="nav-title">
            <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
              CC Library  

            </Link>
          </div>
          <div>
            <ul className={click ? "Nav-menu active" : "Nav-menu"}>
              <li className="nav-item">
                <Link to="#" className="nav-links" onClick={closeMobileMenu}  >
                  <BsBell />
                </Link>
              </li>
              <li
                className="nav-item"
              >
                <Link
                  to="#"
                  className="nav-links"
                 >
                  <CgProfile onClick={showDropdown}/> 
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <nav>
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
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
        </nav>
        <nav className={sidebar ? "sidebar-menu active" : "sidebar-menu"}>
          <ul className="sidebar-menu-items" onClick={showSidebar}>
            <li className="sidebar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose className="close" />
              </Link>
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
