import { Layout } from "@shopify/polaris";
import Topbar from "../components/Topbar";

const AppLayout = ({ children }) => {
  return (
    <div>
      <Topbar />
      {children}
    </div>
  );
};

export default AppLayout;
