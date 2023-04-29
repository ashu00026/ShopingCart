import { useSelector } from "react-redux";
import CartContainer from "./components/CartContainer";
import Model from "./components/Model";
import Navbar from "./components/Navbar";

function App() {
  const isOpen = useSelector((state) => state.model.isOpen);
  console.log(isOpen);
  return (
    <main>
      {isOpen && <Model />}
      <Navbar />
      <CartContainer />
    </main>
  );
}
export default App;
