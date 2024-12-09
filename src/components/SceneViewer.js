import React from "react";
import { useParams } from "react-router-dom";
import scenes from "../data/scenes";
import PanoramaViewer from "./PanoramaViewer";

const SceneViewer = () => {
  const { sceneId } = useParams();
  const scene = scenes.find((s) => s.id === sceneId);
    console.log('haha',scene);
    
  if (!scene) {
    return <h1>Scene not found!</h1>;
  }

  return <PanoramaViewer image={scene.panorama} initialView={scene.initialView} />;
};

export default SceneViewer;
