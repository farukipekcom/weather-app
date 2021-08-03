import "./App.css";
import Home from "./components/Home";
import CityProvider from "./context/CityContext";
function App() {
  console.log("App-render");
  return (
    <CityProvider>
      <Home />
    </CityProvider>
  );
}

export default App;
