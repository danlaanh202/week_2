import { AppProvider } from "@shopify/polaris";
import React from "react";
import AppLayout from "./layout/AppLayout";
import MainContainer from "./components/primary/MainContainer";

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
    >
      <AppLayout>
        <MainContainer />
      </AppLayout>
    </AppProvider>
  );
}
