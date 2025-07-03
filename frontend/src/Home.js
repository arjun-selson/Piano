import React, { useEffect } from 'react';
import Navbar from './Navbar';
import bg from './bg.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
  useEffect(() => {
    const interval = setInterval(() => {
      const carousel = document.querySelector('#mainCarousel');
      // Fix: Check if window.bootstrap and window.bootstrap.Carousel exist
      if (
        carousel &&
        typeof window !== "undefined" &&
        typeof window.bootstrap !== "undefined" &&
        typeof window.bootstrap.Carousel === "function"
      ) {
        const carouselInstance = window.bootstrap.Carousel.getOrCreateInstance(carousel);
        carouselInstance.next();
      }
    }, 600);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        backgroundImage: `url(${bg})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
      }}
    >
      <Navbar transparent />
      <div
        className="d-flex align-items-center justify-content-center"
        style={{
          minHeight: '100vh',
          background: 'rgba(0, 0, 0, 0.4)',
          paddingTop: 80,
        }}
      >
        <div className="container">
          <div id="mainCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner rounded shadow">
              <div className="carousel-item active">
                <div className="text-center text-white p-5">
                  <h1>Welcome to Pianist</h1>
                  <p>Immerse yourself in the enchanting world of piano music.</p>
                </div>
              </div>
              <div className="carousel-item">
                <div className="text-center text-white p-5">
                  <h1>Practice & Create</h1>
                  <p>Practice your skills and create beautiful melodies right here.</p>
                </div>
              </div>
              <div className="carousel-item">
                <div className="text-center text-white p-5">
                  <h1>Accessible to All</h1>
                  <p>Our mission is to make music accessible to everyone, everywhere.</p>
                </div>
              </div>
            </div>
            {/* Carousel controls removed */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;