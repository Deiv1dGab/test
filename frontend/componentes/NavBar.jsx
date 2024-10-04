import React from 'react';
import '../App.css';
import { FaHome, FaPlus, FaBookReader } from 'react-icons/fa';
import { GrUpdate } from "react-icons/gr";

const NavBar = ({ handleHomeClick, handleRedirectToCreate, handleRedirectToRead, handleRedirectToUpdate }) => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <a href="#" onClick={handleHomeClick} className='home'><FaHome /> Home</a>
      </div>
      <div className="navbar-links">
        <a href="#" onClick={handleRedirectToCreate}><FaPlus /> Cadastrar</a>
        <a href="#" onClick={handleRedirectToRead}><FaBookReader /> Ler Dados</a>
        <a href="#" onClick={handleRedirectToUpdate}><GrUpdate /> Atualizar os Dados</a>
      </div>
    </nav>
  );
};

export default NavBar;
