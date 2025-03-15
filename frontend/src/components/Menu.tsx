import React from 'react';
import '../assets/css/Menu.css';
import { Link } from 'react-router-dom';
import { useBalance } from '../context/BalanceContext';

interface MenuItem {
  label: string;
  path: string;
}

const Menu = () => {
  const { balance } = useBalance();
  const menuItems: MenuItem[] = [
    { label: 'Home', path: '/' },
  ];

  return (
    <nav className="menu">
      Saldo: ${balance}
      <ul>
        {menuItems.map((item) => (
          <li key={item.label}>
            <Link to={item.path}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Menu;