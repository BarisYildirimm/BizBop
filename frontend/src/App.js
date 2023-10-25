import { Container } from "react-bootstrap";
import "./App.css";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <main className="py-5">
        <Container>
          <Outlet />
        </Container>
      </main>
    </>
  );
}

export default App;
