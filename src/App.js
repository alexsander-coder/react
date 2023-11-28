import React, { useState } from 'react';
import './App.css';
import Modal from './Modal';
import Card from './Card';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'material-icons/iconfont/material-icons.css';


function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jsonData, setJsonData] = useState([]);


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="App">
      {/* <button onClick={openModal}>Abrir Modal</button> */}
      <Button variant="primary" size="lg" onClick={openModal}>
          Abrir Modal
        </Button>{' '}
      <Modal isOpen={isModalOpen} closeModal={closeModal} setJsonData={setJsonData} />
      {jsonData && (
        <Card posts={jsonData} />
      )}
    </div>
  );
}

export default App;
