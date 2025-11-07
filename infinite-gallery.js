const gallery = document.getElementById("gallery");
const sentinel = document.getElementById("sentinel");

let batchSize = 12; // how many new images per scroll
let isLoading = false;
const totalImages = 52; // total images available
let imagesLoaded = 0;   // track how many images have been added

function addMoreImages() {
  if (isLoading) return;
  if (imagesLoaded >= totalImages) {
    // Stop loading if we've reached the end
    observer.disconnect(); // stop observing sentinel
    return;
  }

  isLoading = true;

  // Calculate how many images we can actually add this batch
  const remainingImages = totalImages - imagesLoaded;
  const currentBatchSize = Math.min(batchSize, remainingImages);

  for (let i = 0; i < currentBatchSize; i++) {
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

    imagesLoaded++; // increment loaded counter
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
