import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Start from "./pages/start.jsx";
import PrivateRoute from "./components/PrivateRoute";
import PageLoader from "./components/PageLoader";

import "./styles/global.css";

const OAuthSuccess = lazy(() => import("./pages/OAuthSuccess"));
const Signin = lazy(() => import("./pages/Signin"));
const CreateAccount = lazy(() => import("./pages/CreateAccount"));
const Home = lazy(() => import("./pages/Home"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/oauth-success" element={<OAuthSuccess />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
