import { useCallback, useState } from "react";
import {
  Button,
  Modal,
  TextContainer,
  TextField,
  TextStyle,
} from "@shopify/polaris";
import useToast from "../../hooks/useToast";

const CreateTodoModal = ({ createTodo, createTodoLoading }) => {
  const { showToast } = useToast();
  const [showModal, setShowModal] = useState(false);
  const [inputVal, setInputVal] = useState("");

  const toggleModal = useCallback(() => setShowModal((prev) => !prev), []);
  const handleChange = useCallback((newValue) => setInputVal(newValue), []);
  const create = async (e) => {
    try {
      e.preventDefault();
      if (!inputVal) {
        showToast("Input mustn't be blank");
        return;
      }
      const { success } = await createTodo(inputVal);
      if (!success) {
        showToast("Failed");
        return;
      }
      setInputVal("");
      toggleModal();
    } catch (error) {
      showToast("Can not create Todo");
    }
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
