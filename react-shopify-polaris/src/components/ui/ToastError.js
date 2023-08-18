import { Toast, Frame } from "@shopify/polaris";
import { useCallback } from "react";
import useToast from "../../hooks/useToast";
export default function () {
  const { toggleToast, toastState } = useToast();
  const toggleActive = useCallback(() => toggleToast(), []);

  const toastMarkup = toastState.activeToast ? (
    <Toast content={toastState.content} error onDismiss={toggleActive} />
  ) : null;

  return <Frame>{toastMarkup}</Frame>;
}
