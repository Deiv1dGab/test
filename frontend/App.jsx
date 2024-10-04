import React, { useState } from 'react';
import './App.css';
import { FaBookReader, FaPlus, FaHome } from 'react-icons/fa';
import { GrUpdate } from "react-icons/gr";
import Create from './componentes/Criar.jsx';
import Read from './componentes/Ler.jsx';
import Update from './componentes/Att.jsx';
import NavBar from './componentes/NavBar';
import Footer from './componentes/footer.jsx';


function App() {
  const [currentPage, setCurrentPage] = useState(null);

  const handleRedirectToCreate = () => {
    setCurrentPage('create');
  };

  const handleRedirectToRead = () => {
    setCurrentPage('read');
  };

  const handleRedirectToUpdate = () => {
    setCurrentPage('update');
  };

  const handleHomeClick = () => {
    setCurrentPage(null);
  };
  const redirectToHome = () => {
    setCurrentPage(null);
  };
  return (
    <div id="root">
      <NavBar
        handleHomeClick={handleHomeClick}
        handleRedirectToCreate={handleRedirectToCreate}
        handleRedirectToRead={handleRedirectToRead}
        handleRedirectToUpdate={handleRedirectToUpdate}
      />
      <div className="App">
        <main>
          <center>
            {!currentPage && (
              <>
                <button className="button" onClick={handleRedirectToCreate}>
                  <FaPlus /> Cadastrar (C)
                </button>
                <button className="button" onClick={handleRedirectToRead}>
                  <FaBookReader /> Ler Dados (L)
                </button>
                <button className="button" onClick={handleRedirectToUpdate}>
                <GrUpdate /> Atualizar os dados (A)
                </button>
              </>
            )}
            {currentPage === 'create' && <Create redirectToHome={redirectToHome}/>}
            {currentPage === 'read' && <Read />}
            {currentPage === 'update' && <Update redirectToHome={redirectToHome}/>}
          </center>
        </main>
        
      </div>
      <br />
      <br />
      <p>  </p>
      <Footer/>
    </div>
  );
}

export default App;
