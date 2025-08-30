import styled from "styled-components";
const Form = styled.form`
  display: flex;
  margin-bottom: 1rem;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const Input = styled.input`
  flex: 1;
  padding: 0.5rem;
  font-size: 1rem;
  background-color: ${props => props.theme.inputBackground};
  color: ${props => props.theme.text};
  border: 1px solid ${props => props.theme.borderColor};
  border-radius: 4px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.buttonBackground};
    box-shadow: 0 0 5px ${props => props.theme.buttonBackground};
  }

  @media (max-width: 600px) {
    margin-bottom: 0.5rem;
  }
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  margin-left: 0.5rem;
  background-color: ${props => props.theme.buttonBackground};
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.theme.buttonHover};
    transform: scale(1.05);
  }

  @media (max-width: 600px) {
    margin-left: 0;
  }
`;

function TodoInput({ newTodo, setNewTodo, addTodo, t }) {
  const handleSubmit = e => {
    // EN: Prevent the default form submission and call addTodo
    // TR: Formun varsayılan gönderimini engelle ve addTodo fonksiyonunu çağır
    // DE: Verhindert das standardmäßige Absenden des Formulars und ruft addTodo auf
    // RU: Предотвращает стандартную отправку формы и вызывает addTodo
    // ES: Evita el envío predeterminado del formulario y llama a addTodo
    e.preventDefault();

    // EN: Call the function to add a new todo item
    // TR: Yeni bir todo öğesi eklemek için fonksiyonu çağır
    // DE: Ruft die Funktion auf, um ein neues Todo-Element hinzuzufügen
    // RU: Вызывает функцию для добавления нового элемента todo
    // ES: Llama a la función para agregar un nuevo elemento de todo
    addTodo();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        name="newtodo"
        type="text"
        value={newTodo}
        onChange={e => setNewTodo(e.target.value)}
        placeholder={t("placeholder")}
      />
      <Button type="submit">{t("addButton")}</Button>
    </Form>
  );
}

export default TodoInput;
