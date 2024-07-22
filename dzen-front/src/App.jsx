import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import { Header } from "./components/Header/Header";

function App() {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<div>... loading</div>}>
          <Outlet />
        </Suspense>
      </main>
      <ToastContainer autoClose={2000} />
    </>
  );
}

export default App;
