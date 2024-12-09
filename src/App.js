import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SceneViewer from "./components/SceneViewer";
import NavigationMenu from "./components/NavigationMenu";
import Home from "./components/Home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/scene/:sceneId" element={<SceneViewer/>} />
        <Route path="/" element={<Home/>}>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
