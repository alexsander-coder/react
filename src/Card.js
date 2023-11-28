import React, { useState, useEffect } from 'react';
import defaultAvatar from './images/avatar_default.png';
import { MdLocalPostOffice, MdGroups, MdArticle } from 'react-icons/md';
import BasicButtonExample from './ButtonDropw';

const Card = ({ posts }) => {
  const [expandedPosts, setExpandedPosts] = useState([]);

  useEffect(() => {
    setExpandedPosts(posts.map(() => false));
  }, [posts]);

  const cardContainerStyle = {
    display: 'flex',
    flexDirection: 'column', // Para os cards ficarem um abaixo do outro
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '5rem',
  };

  const categoryIcon = {
    margin: '0 10px 0 0', /* Ajuste o valor de margem conforme necessário */
  }
  const cardStyle = {
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '15px',
    marginBottom: '45px', // Espaço entre os cards
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    position: 'relative',
    width: '75%',
    maxWidth: '600px',
  };

  const headerStyle = {
    borderBottom: '1px solid #ccc',
    marginBottom: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  };

  const titleIcon = {
    margin: '0 0 0 -85%'
  }

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
    <div style={cardContainerStyle}>
      {posts.map((post, index) => (
        <div key={index} className="card" style={cardStyle}>
          <div className="card-header" style={{ ...headerStyle, display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={defaultAvatar}
                alt="Avatar do Autor"
                width="38"
                height="38"
                style={{ borderRadius: '50%', marginRight: '10px' }}
              />
              <h4>Autor: {post.titulo}</h4>
            </div>
            <BasicButtonExample />
          </div>
          <div style={titleIcon}>
          <p>
            {/* Renderizar o ícone com base na categoria */}
            <span style={categoryIcon}>{categorias[post.categoria].icone}</span>
                    {categorias[post.categoria].nome}
          </p>
          </div>
          <div
            className="card-body"
            dangerouslySetInnerHTML={{
              __html: expandedPosts[index]
                ? post.mensagem
                : stripHtmlTags(post.mensagem).substring(0, 500),
            }}
          ></div>
          {post.mensagem.length > 500 && (
            <button onClick={() => toggleExpand(index)}>
              {expandedPosts[index] ? 'Mostrar menos' : 'Leia mais...'}
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Card;
