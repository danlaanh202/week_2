import "./App.css";
import AppContainer from "./container/AppContainer";
import { TodoProvider } from "./contexts/TodoContext";

const App = () => {
  return (
    <TodoProvider>
      <AppContainer />
    </TodoProvider>
  );
};

export default App;
