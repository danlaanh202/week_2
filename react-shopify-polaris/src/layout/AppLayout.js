import Topbar from "../components/Topbar";
import ToastError from "../components/ui/ToastError";

const AppLayout = ({ children }) => {
  return (
    <>
      <Topbar />
      {children}
      <ToastError />
    </>
  );
};

export default AppLayout;
