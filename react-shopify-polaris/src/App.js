import { AppProvider } from "@shopify/polaris";
import React from "react";

import AppLayout from "./layout/AppLayout";
import MainContainer from "./components/primary/MainContainer";
import { TodoProvider } from "./contexts/TodoContext";

export default function App() {
  return (
    <TodoProvider>
      <AppProvider
        i18n={{
          Polaris: {
            ResourceList: {
              sortingLabel: "Sort by",
              defaultItemSingular: "item",
              defaultItemPlural: "items",
              showing: "Showing {itemsCount} {resource}",
              Item: {
                viewItem: "View details for {itemName}",
              },
            },
            Common: {
              checkbox: "checkbox",
            },
          },
        }}
      >
        <AppLayout>
          <MainContainer />
        </AppLayout>
      </AppProvider>
    </TodoProvider>
  );
}
