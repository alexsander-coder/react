import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function BasicButtonExample({ onEdit, onDelete }) {
  return (
    <DropdownButton id="dropdown-basic-button" title="Ações">
      <Dropdown.Item onClick={onEdit}>Editar</Dropdown.Item>
      <Dropdown.Item onClick={onDelete}>Excluir</Dropdown.Item>
    </DropdownButton>
  );
}

export default BasicButtonExample;