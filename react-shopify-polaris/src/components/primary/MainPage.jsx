import { Page } from "@shopify/polaris";

import CreateTodoModal from "../modal/CreateTodoModal";

function MainPage({ createTodo }) {
  return (
    <Page
      title="Todoes"
      primaryAction={<CreateTodoModal createTodo={createTodo} />}
    />
  );
}
export default MainPage;
