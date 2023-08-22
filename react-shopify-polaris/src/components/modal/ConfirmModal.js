import { Modal, TextContainer } from "@shopify/polaris";
import { useCallback } from "react";

export default function ConfirmModal({ active, setActive, handleDelete }) {
  const handleChange = useCallback(() => setActive(!active), [active]);

  return (
    <Modal
      title="Reach more shoppers with Instagram product tags"
      titleHidden
      open={active}
      onClose={handleChange}
      primaryAction={{
        content: "Delete",
        destructive: true,
        onAction: () => {
          handleDelete();
          handleChange();
        },
      }}
      secondaryActions={[
        {
          content: "Cancel",
          onAction: handleChange,
        },
      ]}
    >
      <Modal.Section>
        <TextContainer>
          <p>
            Use Instagram posts to share your products with millions of people.
            Let shoppers buy from your store without leaving Instagram.
          </p>
        </TextContainer>
      </Modal.Section>
    </Modal>
  );
}
