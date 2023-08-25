import { useCallback, useEffect, useState } from "react";
import {
  Button,
  Modal,
  TextContainer,
  TextField,
  TextStyle,
} from "@shopify/polaris";
import useToast from "../../hooks/useToast";

const CreateTodoModal = ({ createTodo }) => {
  const { showToast } = useToast();
  const [createTodoLoading, setCreateTodoLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const toggleModal = useCallback(() => setShowModal((prev) => !prev), []);
  const handleChange = useCallback((newValue) => setInputVal(newValue), []);
  const create = async (e) => {
    e.preventDefault();
    if (!inputVal?.trim()) {
      setHasError(true);
      return;
    }
    if (createTodoLoading) {
      return;
    }
    setCreateTodoLoading(true);
    try {
      const { success } = await createTodo(inputVal);
      if (!success) {
        showToast("Failed");
        return;
      }
      setInputVal("");
      toggleModal();
    } catch (error) {
      showToast("Can not create Todo");
    } finally {
      setCreateTodoLoading(false);
    }
  };
  useEffect(() => {
    if (inputVal?.trim()) {
      setHasError(false);
    }
  }, [inputVal]);
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
        <Button onClick={toggleModal} disabled={createTodoLoading} primary>
          Create todo
        </Button>
      }
    >
      <Modal.Section>
        <form onSubmit={create}>
          <TextContainer>
            <TextField
              error={hasError && "Input mustn't be blank"}
              value={inputVal}
              onChange={handleChange}
              placeholder="Your next todo"
              autoFocus
            />
          </TextContainer>
        </form>
      </Modal.Section>
    </Modal>
  );
};

export default CreateTodoModal;
