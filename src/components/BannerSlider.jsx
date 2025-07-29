import React, { useState, useEffect } from "react";

// Banner data with working image URLs
const banners = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&h=400&fit=crop&crop=center",
    title: "Special Movie Offers",
    description: "Get 50% off on all movie tickets"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1200&h=400&fit=crop&crop=center",
    title: "New Releases",
    description: "Watch the latest blockbusters"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&h=400&fit=crop&crop=center&blur=2",
    title: "Weekend Special",
    description: "Weekend movie marathon"
  }
];

function BannerSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  // Auto-rotate banners every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === banners.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToBanner = (index) => {
    setCurrentIndex(index);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div style={{
      width: "100%",
      marginBottom: "2rem",
      borderRadius: "0",
      overflow: "hidden",
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
    }}>
      <div style={{
        position: "relative",
        width: "100%",
        height: "400px",
        background: "#2a2a2a"
      }}>
        {!imageError ? (
          <img
            src={banners[currentIndex].image}
            alt={banners[currentIndex].title}
            onError={handleImageError}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
          />
        ) : (
          <div style={{
            width: "100%",
            height: "100%",
            background: "linear-gradient(45deg, #ff6b6b, #4ecdc4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "2rem",
            fontWeight: "bold"
          }}>
            {banners[currentIndex].title}
          </div>
        )}
        <div style={{
          position: "absolute",
          bottom: "0",
          left: "0",
          right: "0",
          background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
          padding: "2rem",
          color: "white"
        }}>
          <h2 style={{ margin: "0 0 0.5rem 0", fontSize: "2rem" }}>
            {banners[currentIndex].title}
          </h2>
          <p style={{ margin: "0", fontSize: "1.1rem" }}>
            {banners[currentIndex].description}
          </p>
        </div>
      </div>
      
      {/* Banner indicators */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "0.5rem",
        padding: "1rem"
      }}>
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            onClick={() => goToBanner(index)}
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: index === currentIndex ? "#ff6b6b" : "#ddd",
              cursor: "pointer",
              transition: "background-color 0.3s"
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default BannerSlider;