import Wrapper from "./screen/Wrapper";
import Footer from "./components/layouts/Footer";
import Navbar from "./components/layouts/Navbar";
import ModalContextProvider from "./context/ModalContext";

function App() {
  return (
    <div className="app">
      <ModalContextProvider>
        <Navbar />
        <Wrapper />
        <Footer />
      </ModalContextProvider>
    </div>
  );
}

export default App;
