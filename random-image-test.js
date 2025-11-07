// random-image-test.js

// Global function to assign random images
function setRandomImages() {
  const baseUrl = "https://images.rrett.net/first-test-photos/";
  const totalImages = 11;
  const fileExtension = "jpeg";

  // Hero image (if exists)
  const heroImg = document.getElementById("mainPhoto");
  if (heroImg && !heroImg.src) {
    const heroIndex = Math.floor(Math.random() * totalImages) + 1;
    heroImg.src = `${baseUrl}${heroIndex}.${fileExtension}`;
  }

  // Gallery / other images
  const galleryImgs = document.querySelectorAll(".random-photo");
  
  // Only assign images to <img> without src
  galleryImgs.forEach((img, idx) => {
    if (!img.getAttribute("src")) {
      // Wrap around like before
      const imageIndex = (idx % totalImages) + 1;
      img.src = `${baseUrl}${imageIndex}.${fileExtension}`;
    }
  });
}

// Run once on page load
document.addEventListener("DOMContentLoaded", setRandomImages);
