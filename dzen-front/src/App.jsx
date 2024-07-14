import { ToastContainer } from "react-toastify";
import { PostMessageForm } from "./components/PostMessageForm";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <div>
        <PostMessageForm />
      </div>
      <ToastContainer autoClose={2000} />
    </>
  );
}

export default App;
