import { Page } from "@shopify/polaris";

import CreateTodoModal from "../modal/CreateTodoModal";

function MainPage() {
  return <Page title="Todoes" primaryAction={<CreateTodoModal />} />;
}
export default MainPage;
