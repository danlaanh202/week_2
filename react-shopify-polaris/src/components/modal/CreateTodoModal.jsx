import { useCallback, useState } from "react";
import useTodo from "../../hooks/useTodo";
import {
  Button,
  Modal,
  TextContainer,
  TextField,
  TextStyle,
} from "@shopify/polaris";

const CreateTodoModal = () => {
  const { addTodo } = useTodo();
  const [showModal, setShowModal] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const toggleModal = useCallback(() => setShowModal((prev) => !prev), []);
  const handleChange = useCallback((newValue) => setInputVal(newValue), []);
  const createTodo = () => {
    addTodo(inputVal);
    toggleModal();
    setInputVal("");
  };
  return (
    <Modal
      onClose={toggleModal}
      open={showModal}
      title={<TextStyle variation="strong">Create a new todo</TextStyle>}
      primaryAction={{
        content: "Create",
        onAction: createTodo,
      }}
      secondaryActions={[
        {
          content: "Cancel",
          onAction: toggleModal,
        },
      ]}
      activator={
        <Button onClick={toggleModal} primary>
          Create todo
        </Button>
      }
    >
      <Modal.Section>
        <TextContainer>
          <TextField
            value={inputVal}
            onChange={handleChange}
            placeholder="Your next todo"
          ></TextField>
        </TextContainer>
      </Modal.Section>
    </Modal>
  );
};

export default CreateTodoModal;
