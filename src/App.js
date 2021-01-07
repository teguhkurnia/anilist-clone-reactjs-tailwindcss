import Wrapper from "./screen/Wrapper";
import Footer from "./components/layouts/Footer";
import Navbar from "./components/layouts/Navbar";
import ModalContextProvider from "./context/ModalContext";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Detail from "./screen/Detail";

function App() {
  return (
    <div className="app">
      <ModalContextProvider>
        <Navbar />
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Wrapper} />
            <Route path="/anime/:id" component={Detail} />
          </Switch>
        </BrowserRouter>
        <Footer />
      </ModalContextProvider>
    </div>
  );
}

export default App;
