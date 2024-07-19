import { ToastContainer } from "react-toastify";
import { PostMessageForm } from "./components/PostMessageForm";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Outlet />
      <div>
        <PostMessageForm />
      </div>
      <ToastContainer autoClose={2000} />
    </>
  );
}

export default App;
