import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import ReactQuill from 'react-quill';
import Button from 'react-bootstrap/Button';
import 'react-quill/dist/quill.snow.css';
import './Modal.css';
import axios from 'axios';

Modal.setAppElement('#root');

const CustomModal = ({ isOpen, closeModal, setJsonData, editPost, isEditMode }) => {
    const [author, setauthor] = useState(editPost ? editPost.author : '');
    const [category, setCategoria] = useState(editPost ? editPost.category : '');
    const [message, setMensagem] = useState(editPost ? editPost.message : '');
    const [authorError, setauthorError] = useState('');
    const [categoriaError, setCategoriaError] = useState('');
    const [mensagemError, setMensagemError] = useState('');

    

    useEffect(() => {
        if (isEditMode && editPost) {
            // Se estiver no modo de edição e um post for fornecido, preencha o estado com os dados do post
            setauthor(editPost.author);
            setCategoria(editPost.category);
            setMensagem(editPost.message);
        }
    }, [editPost, isEditMode]);

    const validarAutorVazio = () => {
        if (author.trim() === '') {
            setauthorError('Não é permitido campo vazio no Autor.');
            return false;
        } else {
            setauthorError('');
            return true;
        }
    };
    
    const validarAutorNumeros = () => {
        const regex = /[A-Za-z\s]*$/;
        if (!author.match(regex)) {
            setauthorError('Não é permitido números no Autor.');
            return false;
        } else {
            setauthorError('');
            return true;
        }
    };

    const validarCategoria = () => {
        if (!category) {
            setCategoriaError('Selecione o tipo do post');
            return false;
        } else {
            setCategoriaError('');
            return true;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (validarAutorVazio() && validarAutorNumeros() && validarCategoria()) {
            const newPost = { author, category, message };
        
            try {
                let response;
                if (isEditMode) {
                    // Editar post existente
                    response = await axios.put(`http://127.0.0.1:8000/api/posts/${editPost.id}`, newPost);
                } else {
                    // Criar novo post
                    response = await axios.post('http://127.0.0.1:8000/api/posts', newPost);
                }

                console.log('Resposta da API:', response.data);
                setJsonData((prevData) => [...prevData, newPost]);
                closeModal();
            } catch (error) {
                console.error('Erro ao criar/editar o post:', error);
            }
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
                <h2 className="modal-heading">{isEditMode ? 'Editar Post' : 'Criar Post'}</h2>
                <button onClick={handleClose} className="close-button">
                    X
                </button>
                <hr className="modal-hr" />
                <div className="form-field">
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setauthor(e.target.value)}
                        className="small-input small-input-author"
                        placeholder="Autor do post"
                    />
                    {authorError && <p className="campo-error">{authorError}</p>}
                </div>
                <div className="form-field">
                    <select
                        value={category}
                        onChange={(e) => setCategoria(e.target.value)}
                        className="small-input small-input-category"
                    >
                        <option value="">Selecione o tipo do post</option>
                        <option value="categoria2">Post</option>
                        <option value="categoria3">Artigo</option>
                        <option value="categoria4">Grupo</option>
                    </select>
                    {categoriaError && <p className="campo-error">{categoriaError}</p>}
                </div>
                <div style={mensagemStyle}>
                    <ReactQuill
                        value={message}
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
                    {mensagemError && <p className="message-error">{mensagemError}</p>}
                </div>
                <Button as="input" type="submit" value={isEditMode ? 'Atualizar' : 'Publicar'} variant="secondary" size="sm" />
            </form>
        </Modal>
    );
};

export default CustomModal;
