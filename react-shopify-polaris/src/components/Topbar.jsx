import { TopBar, Frame } from "@shopify/polaris";
import { ArrowLeftMinor } from "@shopify/polaris-icons";
import { useState, useCallback } from "react";

function Topbar() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleIsUserMenuOpen = useCallback(
    () => setIsUserMenuOpen((isUserMenuOpen) => !isUserMenuOpen),
    []
  );

  const handleNavigationToggle = useCallback(() => {
    console.log("toggle navigation visibility");
  }, []);

  const logo = {
    width: 124,
    topBarSource: "https://cdn1.avada.io/logo/avada_logo_final_color.png",
    contextualSaveBarSource:
      "https://cdn1.avada.io/logo/avada_logo_final_color.png",
    url: "#",
    accessibilityLabel: "Avada group",
  };

  const userMenuMarkup = (
    <TopBar.UserMenu
      detail="Tran Thai Dan"
      initials="DT"
      open={isUserMenuOpen}
      onToggle={toggleIsUserMenuOpen}
    />
  );

  const topBarMarkup = (
    <TopBar
      showNavigationToggle={false}
      userMenu={userMenuMarkup}
      onNavigationToggle={handleNavigationToggle}
    />
  );

  return <div>{topBarMarkup}</div>;
}
export default Topbar;
