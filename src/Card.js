import React, { useState, useEffect } from 'react';
import defaultAvatar from './images/avatar_default.png';
import { MdLocalPostOffice, MdGroups, MdArticle } from 'react-icons/md';
import BasicButtonExample from './ButtonDropw';
import CustomModal from './Modal';
import axios from 'axios';
import './Card.css'


const Card = () => {
  const [posts, setPosts] = useState([]);
  const [expandedPosts, setExpandedPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editPost, setEditPost] = useState(null);

  useEffect(() => {
      loadPosts(); // Altere para loadPosts
  }, []);

  const loadPosts = async () => { // Altere o nome da função para loadPosts
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/posts');
        setPosts(response.data);
    } catch (error) {
        console.error('Erro ao buscar os posts:', error);
    }
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

    useEffect(() => {
        setExpandedPosts(posts.map(() => false));
    }, [posts]);

    const handleEdit = (post) => {
      setEditPost(post);
      setIsModalOpen(true);
  };

    //verify logic and details
    const updatePosts = (updatedPost) => {
        console.log(updatedPost, 'updatedPost')
    };

    const handleDelete = async (postId) => {
      try {
          await axios.delete(`http://127.0.0.1:8000/api/posts/${postId}`);
          // Atualize o estado dos posts após a exclusão, removendo o post excluído
          setPosts(posts.filter((post) => post.id !== postId));
      } catch (error) {
          console.error('Erro ao excluir o post:', error);
      }
  };

    const toggleExpand = (index) => {
        const newExpandedPosts = [...expandedPosts];
        newExpandedPosts[index] = !newExpandedPosts[index];
        setExpandedPosts(newExpandedPosts);
    };

    const stripHtmlTags = (html) => {
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    };

    const categorias = {
        categoria2: { nome: 'Post', icone: <MdLocalPostOffice /> },
        categoria3: { nome: 'Artigo', icone: <MdArticle /> },
        categoria4: { nome: 'Grupo', icone: <MdGroups /> },
    };

    return (
        <div className="card-container">
            {posts.map((post, index) => (
                <div key={post.id} className="card card-style">
                  {isModalOpen && (
                        <CustomModal
                            isOpen={isModalOpen}
                            closeModal={() => setIsModalOpen(false)}
                            setJsonData={setPosts} // Passa a função setPosts como prop
                            editPost={editPost}
                            isEditMode={!!editPost}
                        />
                    )}
                    <div className="card-header header">
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img
                                src={defaultAvatar}
                                alt="Avatar do Autor"
                                width="38"
                                height="38"
                                style={{ borderRadius: '50%', margin: '0 15px' }}
                            />
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
              <h4 style={{margin: '0 0 5px 0'}}>Autor: {post.author}</h4>
              <p style={{margin: '0'}}>Publicado em: {formatDate(post.created_at)}</p>
            </div>
                        </div>
                        <BasicButtonExample onEdit={() => handleEdit(post)} onDelete={() => handleDelete(post.id)} />
                    </div>
                    <div className="title-icon">
                        <p>
                            <span className="category-icon">
                                {categorias[post.category] ? categorias[post.category].icone : null}
                            </span>
                            {categorias[post.category] ? categorias[post.category].nome : 'Categoria desconhecida'}
                        </p>
                    </div>
                    <div
                        className="card-body"
                        dangerouslySetInnerHTML={{
                            __html: expandedPosts[index]
                                ? post.message
                                : stripHtmlTags(post.message).substring(0, 500),
                        }}
                    ></div>
                    {post.message.length > 500 && (
                        <button onClick={() => toggleExpand(index)}>
                            {expandedPosts[index] ? 'Mostrar menos' : 'Leia mais...'}
                        </button>
                    )}
                </div>
            ))}
            {isModalOpen && (
                <CustomModal
                    isOpen={isModalOpen}
                    closeModal={() => setIsModalOpen(false)}
                    setJsonData={updatePosts}
                    editPost={editPost}
                    isEditMode={!!editPost}
                />
            )}
        </div>
    );
};

export default Card;