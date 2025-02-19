import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegistrationForm from "./component/RegistrationForm";

function App() {
  return (
    <div>
      <RegistrationForm />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
