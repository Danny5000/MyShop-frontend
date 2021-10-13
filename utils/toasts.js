import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const options = {
  autoClose: 4000,
  type: toast.TYPE.WARNING,
  position: toast.POSITION.TOP_LEFT,
};

const notify = (message) => toast(message, options);

export default notify;
