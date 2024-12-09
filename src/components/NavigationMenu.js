import React from "react";
import { Link } from "react-router-dom";
import scenes from "../data/scenes";

const NavigationMenu = () => {
  return (
    <nav>
      {scenes.map((scene) => (
        <Link key={scene.id} to={`/scene/${scene.id}`}>
          {scene.name}
        </Link>
      ))}
    </nav>
  );
};

export default NavigationMenu;
