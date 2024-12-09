import React, {useEffect, useRef, useState} from "react"
import ReactDOM from "react-dom"
import {Pannellum} from "pannellum-react"

const PanoramaViewer = ({image, initialView}) => {
 const panoramaRef = useRef(null)

 // Trạng thái để lưu ảnh hiện tại
 const [currentImage, setCurrentImage] = useState("https://pannellum.org/images/jfk.jpg")

 // Danh sách marker, mỗi marker có liên kết tới một ảnh panorama khác
 const markers = [
  {
   pitch: 10,
   yaw: 20,
   text: "Ảnh 360 - 1",
   nextImage: "https://pannellum.org/images/jfk.jpg",
  },
  {
   pitch: -10,
   yaw: 50,
   text: "Ảnh 360 - 2",
   nextImage: "https://pannellum.org/images/from-tree.jpg",
  },
  {
   pitch: 15,
   yaw: -30,
   text: "Ảnh 360 - 3",
   nextImage: "https://pannellum.org/images/bma-0.jpg",
  },
 ]

 useEffect(() => {
  if (panoramaRef.current) {
   const viewer = panoramaRef.current.getViewer()

   // Xóa tất cả các marker trước khi thêm
//    viewer.clearHotSpots()

   // Thêm các marker mới từ danh sách
   markers.forEach((marker) => {
    viewer.addHotSpot({
     pitch: marker.pitch,
     yaw: marker.yaw,
     cssClass: "custom-marker",
     createTooltipFunc: (hotSpotDiv) => {
      hotSpotDiv.innerHTML = `<p>${marker.text}</p>`
     },
     clickHandlerFunc: () => {
      setCurrentImage(marker.nextImage) // Chuyển ảnh khi nhấn marker
     },
    })
   })
  }
 }, [currentImage]) // Chạy lại khi ảnh thay đổi

 return (
  <div className='App'>
   <Pannellum ref={panoramaRef} width='100%' height='500px' image={currentImage} pitch={0} yaw={0} hfov={110} autoLoad />
  </div>
 )
}

export default PanoramaViewer
