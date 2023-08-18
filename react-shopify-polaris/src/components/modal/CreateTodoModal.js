import { useCallback, useState } from "react";
import {
  Button,
  Modal,
  TextContainer,
  TextField,
  TextStyle,
} from "@shopify/polaris";

const CreateTodoModal = ({ createTodo, createTodoLoading }) => {
  const [showModal, setShowModal] = useState(false);
  const [inputVal, setInputVal] = useState("");

  const toggleModal = useCallback(() => setShowModal((prev) => !prev), []);
  const handleChange = useCallback((newValue) => setInputVal(newValue), []);
  const create = async (e) => {
    e.preventDefault();
    if (!inputVal) {
      return;
    }
    const { success } = await createTodo(inputVal);
    if (!success) {
      return;
    }
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
        loading: createTodoLoading,
        disabled: createTodoLoading,
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
        <form onSubmit={create}>
          <TextContainer>
            <TextField
              value={inputVal}
              onChange={handleChange}
              placeholder="Your next todo"
              autoFocus
            ></TextField>
          </TextContainer>
        </form>
      </Modal.Section>
    </Modal>
  );
};

export default CreateTodoModal;
