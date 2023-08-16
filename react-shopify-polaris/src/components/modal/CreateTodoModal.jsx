import { useCallback, useState } from "react";
import {
  Button,
  Modal,
  TextContainer,
  TextField,
  TextStyle,
} from "@shopify/polaris";

const CreateTodoModal = ({ createTodo }) => {
  const [showModal, setShowModal] = useState(false);
  const [inputVal, setInputVal] = useState("");

  const toggleModal = useCallback(() => setShowModal((prev) => !prev), []);
  const handleChange = useCallback((newValue) => setInputVal(newValue), []);
  const create = () => {
    createTodo(inputVal);
    setInputVal("");
    toggleModal();
  };
  return (
    <Modal
      onClose={toggleModal}
      open={showModal}
      title={<TextStyle variation="strong">Create a new todo</TextStyle>}
      primaryAction={{
        content: "Create",
        onAction: create,
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
