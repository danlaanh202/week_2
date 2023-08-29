import { TopBar } from "@shopify/polaris";

function Topbar() {
  const userMenuMarkup = (
    <TopBar.UserMenu detail="Tran Thai Dan" initials="DT" />
  );

  const topBarMarkup = (
    <TopBar showNavigationToggle={false} userMenu={userMenuMarkup} />
  );

  return <>{topBarMarkup}</>;
}
export default Topbar;
