import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles/bootstrap.custom.css";
import "./assets/styles/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import store from "./store";
import { Provider } from "react-redux";

import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen";
import CreateScreen from "./screens/CreateScreen";
import DetailsScreen from "./screens/DetailsScreen";
import EditScreen from "./screens/EditScreen";
import PostListScreen from "./screens/admin/PostListScreen";
import CategoryListScreen from "./screens/admin/CategoryListScreen";
import UserListScreen from "./screens/admin/UserListScreen";
import UserEditScreen from "./screens/admin/UserEditScreen";
import AdminRoute from "./components/AdminRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/post/:id" element={<DetailsScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/profile" element={<ProfileScreen />} />
      <Route path="/post/create" element={<CreateScreen />} />
      <Route path="/post/:id/edit" element={<EditScreen />} />

      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/postList" element={<PostListScreen />} />
        <Route path="/admin/categoryList" element={<CategoryListScreen />} />
        <Route path="/admin/userList" element={<UserListScreen />} />
        <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
