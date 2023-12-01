import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Modal from 'react-bootstrap/Modal';

function BasicButtonExample({ onEdit, onDelete }) {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = () => {
    onDelete();
    setShowDeleteConfirmation(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  return (
    <div>
      <DropdownButton id="dropdown-basic-button" title="Ações">
        <Dropdown.Item onClick={onEdit}>Editar</Dropdown.Item>
        <Dropdown.Item onClick={handleDeleteClick}>Excluir</Dropdown.Item>
      </DropdownButton>

      <Modal show={showDeleteConfirmation} onHide={handleCancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja excluir este post?
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleConfirmDelete} className="btn btn-danger">
            Confirmar
          </button>
          <button onClick={handleCancelDelete} className="btn btn-secondary">
            Cancelar
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default BasicButtonExample;
