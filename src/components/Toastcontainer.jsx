import { ToastContainer, toast } from "react-toastify";

export { toast };
import "react-toastify/dist/ReactToastify.css";
function Toastcontainer() {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  );
}

export default Toastcontainer;
