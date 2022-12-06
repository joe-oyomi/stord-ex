import {
  RouterProvider,
} from "react-router-dom";
import "./App.css"
import { ToastContainer } from 'react-toastify';
import { router } from './router/index.js'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer position="bottom-left"/>
    </div>
  );
}

export default App;
