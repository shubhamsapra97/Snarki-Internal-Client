import React, { useState, useContext } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { IconContext } from 'react-icons';
import { Link, useNavigate } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import {UserContext} from "../../providers/User/UserProvider";
import './Sidebar.css';

const Sidebar = ({dashboard = false}) => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const {user, updateUser} = useContext(UserContext);
  const navigate = useNavigate();

  const sidebarDataList = SidebarData;

  return (
    <IconContext.Provider value={{ color: '#fff' }}>
      <div className={!dashboard ? 'sidebar' : 'dashboard-sidebar' }>
        <Link to='#' className='menu-bars'>
          <FaIcons.FaBars
            onClick={showSidebar}
            size={window.innerWidth > 500 ? 30 : 25}
          />
        </Link>
      </div>
      <nav className={sidebar ? 'sidebar-menu active' : 'sidebar-menu'}>
        <ul className='sidebar-menu-items' onClick={showSidebar}>
          <li className='sidebar-toggle'>
            <Link to='#' className='menu-close'>
              <AiIcons.AiOutlineClose />
            </Link>
          </li>
          {
            sidebarDataList.map((item, index) => {

              if (item.path === '/snarki/register' && user) {
                return null;
              }
              if (item.path === '/dashboard' && !user) {
                return null;
              }

              if (item.path === '/logOut') {
                return (
                  <li key={index} className={item.cName} onClick={() => {
                    localStorage.clear();
                    updateUser(null);
                    navigate("/");
                  }}>
                    <span className='non-link-item'>
                      {item.icon}
                      <span className="sidebar-items">{item.title}</span>
                    </span>
                  </li>
                )
              }

              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span className="sidebar-items">{item.title}</span>
                  </Link>
                </li>
              );
            })
          }
        </ul>
      </nav>
    </IconContext.Provider>
  );
}

export default Sidebar;