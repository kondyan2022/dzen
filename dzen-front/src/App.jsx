import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";

function App() {
  return (
    <>
      <Suspense fallback={<div>... loading</div>}>
        <Outlet />
      </Suspense>

      <ToastContainer autoClose={2000} />
    </>
  );
}

export default App;
