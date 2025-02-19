import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OTPValidation from "./component/OTPValidation";

function App() {
  return (
    <div>
      <OTPValidation/>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
