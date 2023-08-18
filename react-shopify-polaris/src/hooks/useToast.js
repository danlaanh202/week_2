import { useContext } from "react";
import { Context as ToastContext } from "../helpers/contexts/ToastContext";

const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useTodo must be used within TodoContext");
  }
  return context;
};
export default useToast;
