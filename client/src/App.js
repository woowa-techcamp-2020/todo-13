import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Modal from "./components/Modal";
import Popup from "./components/Popup";
import Sidebar from "./components/Sidebar";

export function App() {
  return `
  ${Header()}
  ${Dashboard()}
  ${Sidebar()}
  ${Modal()}
  ${Popup()}
`;
}

// TODO: refactor other component classes to function
// ${Modal()}}

export default App;
