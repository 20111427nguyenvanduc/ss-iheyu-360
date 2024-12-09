import React, {useEffect, useRef, useState} from "react"
import {Pannellum} from "pannellum-react"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import Fab from "@mui/material/Fab"

const Home = () => {
 const [isOverlayOpen, setIsOverlayOpen] = useState(true)
 const [currentScene, setCurrentScene] = useState("scene1")
 const [previousScene, setPreviousScene] = useState(null)
 const [showBackButton, setShowBackButton] = useState(false)
 const [currentVideo, setCurrentVideo] = useState(null)
 const panoramaRef = useRef(null)

 // Define scenes and their hotspots
 const scenes = {
  scene1: {
   image: "/anh360/anh1.jpg",
   hotspots: [
    {id: "hotspot1", pitch: 50, yaw: 20, text: "Đèo Khau Cọ", nextScene: "scene2", video: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4"},
    {id: "hotspot2", pitch: -50, yaw: 50, text: "Cánh đồng Mường Than", nextScene: "scene3", video: "https://samplelib.com/lib/preview/mp4/sample-10s.mp4"},
    {id: "hotspot3", pitch: 15, yaw: -30, text: "Làng cá Thẩm Phé", nextScene: "scene4", video: "https://samplelib.com/lib/preview/mp4/sample-15s.mp4"},
   ],
  },
  scene2: {image: "/anh360/anh2.jpg", hotspots: []},
  scene3: {image: "/anh360/anh3.jpg", hotspots: []},
  scene4: {image: "/anh360/anh4.jpg", hotspots: []},
 }

 const handleStartVisit = () => setIsOverlayOpen(false)

 const handleBackClick = () => {
  setCurrentScene(previousScene)
  setPreviousScene(null)
  setShowBackButton(false)
  setCurrentVideo(null)
 }

 useEffect(() => {
  if (panoramaRef.current) {
   const viewer = panoramaRef.current.getViewer()

   // ** Xóa render container bị trùng **
   const renderContainers = document.querySelectorAll(".pnlm-render-container")
   if (renderContainers.length > 1) {
    renderContainers[0].remove()
   }

   // Clear existing hotspots
   //   viewer.clearHotSpots()

   // Load new hotspots for the current scene
   const currentHotspots = scenes[currentScene]?.hotspots || []
   currentHotspots.forEach((hotspot) => {
    viewer.addHotSpot({
     id: hotspot.id,
     pitch: hotspot.pitch,
     yaw: hotspot.yaw,
     cssClass: "custom-marker",
     createTooltipFunc: (hotSpotDiv) => {
      hotSpotDiv.innerHTML = `<p class="marker-address">${hotspot.text}</p>`
     },
     clickHandlerFunc: () => {
      setPreviousScene(currentScene)
      setCurrentScene(hotspot.nextScene)
      setCurrentVideo(hotspot.video) // Set video
      setShowBackButton(true)
     },
    })
   })
  }
 }, [currentScene])

 return (
  <div className='App'>
   {/* Overlay for starting */}
   {isOverlayOpen && (
    <div id='welcome_slide'>
     <div id='welcome_container' className='welcome_container show-info'>
      <div className='text-main'>
       <span id='text-field'>Du lịch</span>
       <p id='text-name-project'>Than Uyên</p>
       <div onClick={handleStartVisit} style={{cursor: "pointer"}}>
        <span id='text-start-visit'>Bắt đầu tham quan</span>
       </div>
      </div>
     </div>
    </div>
   )}

   {/* Back Button */}
   {showBackButton && (
    <Fab
     onClick={handleBackClick}
     aria-label='Quay lại'
     sx={{
      position: "absolute",
      top: "20px",
      left: "20px",
      zIndex: 1000,
      height: "46px",
      width: "46px",
     }}
    >
     <ArrowBackIcon />
    </Fab>
   )}

   {/* Video Frame */}
   {currentVideo && (
    <div
     style={{
      position: "absolute",
      bottom: "20px",
      left: "20px",
      zIndex: 1000,
      width: "300px",
      background: "#000",
      borderRadius: "10px",
      overflow: "hidden",
     }}
    >
     <video controls autoPlay style={{width: "100%"}}>
      <source src={currentVideo} type='video/mp4' />
      Your browser does not support the video tag.
     </video>
    </div>
   )}

   {/* Pannellum Panorama Viewer */}
   <Pannellum ref={panoramaRef} width='100%' height='100vh' image={scenes[currentScene]?.image} pitch={0} yaw={0} hfov={110} autoLoad type='equirectangular' autoRotate={-3} />
  </div>
 )
}

export default Home
