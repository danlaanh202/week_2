import { TopBar, Frame } from "@shopify/polaris";
import { ArrowLeftMinor } from "@shopify/polaris-icons";
import { useState, useCallback } from "react";

function Topbar() {
  const userMenuMarkup = (
    <TopBar.UserMenu detail="Tran Thai Dan" initials="DT" />
  );

  const topBarMarkup = (
    <TopBar showNavigationToggle={false} userMenu={userMenuMarkup} />
  );

  return <div>{topBarMarkup}</div>;
}
export default Topbar;
