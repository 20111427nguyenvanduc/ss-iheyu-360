import React, { useState, useEffect } from "react";
import { Pannellum } from "pannellum-react";

const PannellumWithLoader = ({ image, width, height, loadingImage, ...props }) => {
  const [isLoading, setIsLoading] = useState(true); // Trạng thái loading

  useEffect(() => {
    // Mỗi khi ảnh thay đổi, kích hoạt lại trạng thái loading
    setIsLoading(true);
  }, [image]);

  return (
    <div style={{ position: "relative", width, height }}>
      {isLoading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "#FFF",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10,
          }}
        >
          {/* Logo đứng yên */}
          <div style={{ position: "relative", display: "inline-block" }}>
            <img
              src={loadingImage}
              alt="Loading"
              style={{
                width: "200px",
                height: "200px",
                objectFit: "contain",
                zIndex: 5,
              }}
            />
            {/* Vòng tròn quay */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "120px",
                height: "120px",
                border: "5px solid rgba(0, 0, 0, 0.1)",
                borderTop: "5px solid #FFF",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
                transform: "translate(-50%, -50%)",
                zIndex: 4,
              }}
            ></div>
          </div>
        </div>
      )}
      <Pannellum
        image={image}
        width="100%"
        height="100%"
        {...props}
        onLoad={() => setIsLoading(false)} // Tắt trạng thái loading khi ảnh tải xong
      />
    </div>
  );
};

export default PannellumWithLoader;
