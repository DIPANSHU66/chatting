import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./components/Homepage";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Photo from "./components/Photo";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { useEffect } from "react";
import { setsocket } from "./redux/socketSlice";
import { setonlineusers } from "./redux/userSlice";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Photo></Photo>,
  },
  {
    path: "/homepage",
    element: <Homepage />,
  },
  {
    path: "/register",
    element: <Signup />,
  },
  { path: "/login", element: <Login /> },
  {
    path: "/profile",
    element: <Photo />,
  },
]);

function App() {
  const { authUser } = useSelector((store) => store.user);

  const { socket } = useSelector((store) => store.socket);

  const dispatch = useDispatch();

  useEffect(() => {
    if (authUser) {
      const socket = io(`http://localhost:8000`, {
        query: { userId: authUser._id },
      });
      dispatch(setsocket(socket));
      socket.on("getOnlineUsers", (onlineusers) => {
        dispatch(setonlineusers(onlineusers));
      });
      return () => {
        socket.close();
      };
    } else {
      if (socket) {
        socket.close();
        dispatch(setsocket(null));
      }
    }
  }, [authUser]);

  return (
    <div className="p-8 min-h-screen min-w-screen flex items-center justify-center">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
