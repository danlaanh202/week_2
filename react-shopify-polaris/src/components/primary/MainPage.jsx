import { Page } from "@shopify/polaris";

import CreateTodoModal from "../CreateTodoModal";

function MainPage() {
  return <Page title="Todoes" primaryAction={<CreateTodoModal />} />;
}
export default MainPage;
