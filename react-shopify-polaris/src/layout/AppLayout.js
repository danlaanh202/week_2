import Topbar from "../components/Topbar";
import ToastError from "../components/toast/ToastError";

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
