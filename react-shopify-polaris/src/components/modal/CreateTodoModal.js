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
      if (!inputVal?.trim()) {
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
        // trong khi đang chạy thì khách nhấn lung tung thì sao em ? thêm loading nữa nhé 
        <Button onClick={toggleModal} primary>
          Create todo
        </Button>
      }
    >
      <Modal.Section>
        {/* todo: sao lại cần form submit thế này nhỉ ?  */}
        <form onSubmit={create}>
          <TextContainer>
            <TextField
              value={inputVal}
              onChange={handleChange}
              placeholder="Your next todo"
              autoFocus
            ></TextField>
            {/* todo: có thể viết kiểu này <TextFields /> chứ không cần đóng task mở tag đâu  */}
          </TextContainer>
        </form>
      </Modal.Section>
    </Modal>
  );
};

export default CreateTodoModal;
