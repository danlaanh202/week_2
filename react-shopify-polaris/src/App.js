import { AppProvider } from "@shopify/polaris";
import React from "react";
import AppLayout from "./layout/AppLayout";

import { ToastProvider } from "./helpers/contexts/ToastContext";
import MainPage from "./components/pages/MainPage";

export default function App() {
  return (
    <AppProvider
      theme={{
        logo: {
          width: 124,
          topBarSource: "https://i.imgur.com/LTYRxl7.png",
          contextualSaveBarSource: "https://i.imgur.com/LTYRxl7.png",
          url: "#",
          accessibilityLabel: "Logo",
        },
      }}
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
        },
      }}
    >
      <ToastProvider>
        <AppLayout>
          <MainPage />
        </AppLayout>
      </ToastProvider>
    </AppProvider>
  );
}
