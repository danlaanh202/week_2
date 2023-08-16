import { Layout } from "@shopify/polaris";
import Topbar from "../components/Topbar";

const AppLayout = ({ children }) => {
  return (
    <>
      <Topbar />
      {children}
    </>
  );
};

export default AppLayout;
