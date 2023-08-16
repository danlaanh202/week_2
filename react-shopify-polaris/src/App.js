import { AppProvider } from "@shopify/polaris";
import React from "react";
import AppLayout from "./layout/AppLayout";
import MainContainer from "./components/primary/MainContainer";

export default function App() {
  return (
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
  );
}
