// infinite-gallery.js
const gallery = document.getElementById("gallery");
const sentinel = document.getElementById("sentinel");

let batchSize = 12; // how many new images per scroll
let isLoading = false;

// Function to create empty <img> placeholders
function addMoreImages() {
  if (isLoading) return;
  isLoading = true;

  for (let i = 0; i < batchSize; i++) {
    const div = document.createElement("div");
    div.className = "gallery-item";

    const img = document.createElement("img");
    img.className = "random-photo";
    img.alt = "Cherished memory";
    img.loading = "lazy";

    const caption = document.createElement("p");
    caption.className = "caption";

    div.appendChild(img);
    div.appendChild(caption);
    gallery.appendChild(div);
  }

  // Wait a tick so new elements exist before calling the randomizer
  setTimeout(() => {
    if (typeof setRandomImages === "function") {
      setRandomImages(); // call your random image logic
    }
    isLoading = false;
  }, 100);
}

// Intersection Observer to detect scroll bottom
const observer = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    addMoreImages();
  }
});

observer.observe(sentinel);

// Initial load
addMoreImages();
