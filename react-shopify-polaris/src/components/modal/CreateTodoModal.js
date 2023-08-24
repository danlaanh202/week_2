import { useCallback, useState } from "react";
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
  const [showModal, setShowModal] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const toggleModal = useCallback(() => setShowModal((prev) => !prev), []);
  const handleChange = useCallback((newValue) => setInputVal(newValue), []);
  const create = async (e) => {
    if (createTodoLoading) {
      return;
    }
    setCreateTodoLoading(true);
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
    } finally {
      setCreateTodoLoading(false);
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
        <Button onClick={toggleModal} disabled={createTodoLoading} primary>
          Create todo
        </Button>
      }
    >
      <Modal.Section>
        {/* todo: có yêu cầu dùng enter hở :3 chứ thường bọn anh sẽ khồn dặt form vào như này đâu trông nó không oke cho lắm ấy  */}
        {/* e có dùng form ở đây để enter submit thay vì phải xử lý e.keyCode khi enter trong textField*/}
        <form onSubmit={create}>
          <TextContainer>
            <TextField
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
