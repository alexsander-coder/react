import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import ReactQuill from 'react-quill';
import Button from 'react-bootstrap/Button';
import 'react-quill/dist/quill.snow.css';
import './Modal.css';

Modal.setAppElement('#root');

const CustomModal = ({ isOpen, closeModal, setJsonData }) => {
    const [titulo, setTitulo] = useState('');
    const [categoria, setCategoria] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [tituloError, setTituloError] = useState('');
    const [categoriaError, setCategoriaError] = useState('');
    const [mensagemError, setMensagemError] = useState('');

    const validarAutorVazio = () => {
        if (titulo.trim() === '') {
          setTituloError('Não é permitido campo vazio no Autor.');
          return false;
        } else {
          setTituloError('');
          return true;
        }
      };
      
      const validarAutorNumeros = () => {
        const regex = /[A-Za-z\s]*$/;
        if (!titulo.match(regex)) {
          setTituloError('Não é permitido números no Autor.');
          return false;
        } else {
          setTituloError('');
          return true;
        }
      };

      const validarCategoria = () => {
        if (!categoria) {
          setCategoriaError('Selecione o tipo do post');
          return false;
        } else {
          setCategoriaError('');
          return true;
        }
      };


  useEffect(() => {
    validarAutorVazio();
    validarAutorNumeros();
    validarCategoria();
    // validarMensagem();
  }, [titulo, mensagem, categoria]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validarAutorVazio() && validarAutorNumeros() && validarCategoria()) {
      const newPost = { titulo, categoria, mensagem };
      console.log(newPost);

      // Adicionar o novo post à matriz de posts
      setJsonData((prevData) => [...prevData, newPost]);

      closeModal();
      setTitulo('');
      setCategoria('');
      setMensagem('');
    }
  };

  const handleClose = () => {
    closeModal();
  };

  const mensagemStyle = {
    maxHeight: '200px',
    overflowY: 'auto', 
    border: mensagemError ? '1px solid red' : '1px solid #ccc',
    borderRadius: '5px',
    padding: '15px',
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} className="custom-modal">
      <form onSubmit={handleSubmit} className="modal-form">
        <h2 className="modal-heading">Criar post</h2>
        <button onClick={handleClose} className="close-button">
          X
        </button>
        <hr className="modal-hr" />
        <div className="form-field">
        <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="small-input small-input-titulo"
            placeholder="Autor do post"
            />
            {tituloError && <p className="campo-error">{tituloError}</p>}
        </div>
        <div className="form-field">
        <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="small-input small-input-categoria"
            >
            <option value="">Selecione o tipo do post</option>
            <option value="categoria2">Post</option>
            <option value="categoria3">Artigo</option>
            <option value="categoria4">Grupo</option>
            </select>
            {categoriaError && <p className="campo-error">{categoriaError}</p>}
        </div>
        <div>
    <div style={mensagemStyle}>
      <ReactQuill
        value={mensagem}
        onChange={(value) => setMensagem(value)}
        placeholder="Texto do post"
        modules={{
          toolbar: [
            [{ header: '1' }, { header: '2' }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['bold', 'italic', 'underline'],
            ['image'],
            ['link'],
          ],
        }}
      />
    </div>
    {mensagemError && <p className="mensagem-error">{mensagemError}</p>}
  </div>
        <Button as="input" type="submit" value="Publicar" variant="secondary" size="sm" />
      </form>
    </Modal>
  );
};

export default CustomModal;