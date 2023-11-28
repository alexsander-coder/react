import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function BasicButtonExample() {
  return (
    <DropdownButton id="dropdown-basic-button" title="Ações">
      <Dropdown.Item href="#/action-1">Editar</Dropdown.Item>
      <Dropdown.Item href="#/action-2">Excluir</Dropdown.Item>
    </DropdownButton>
  );
}

export default BasicButtonExample;