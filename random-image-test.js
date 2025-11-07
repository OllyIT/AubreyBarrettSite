function setRandomImages() {
  const baseUrl = "https://images.rrett.net/first-test-photos/";
  const totalImages = 52; // total images available
  const fileExtension = "png";

  // --- HERO IMAGE ---
  const heroImg = document.getElementById("mainPhoto");
  const usedIndices = new Set(); // track which images are used

  if (heroImg && !heroImg.src) {
    const heroIndex = Math.floor(Math.random() * totalImages) + 1;
    heroImg.src = `${baseUrl}${heroIndex}.${fileExtension}`;
    usedIndices.add(heroIndex);
  }

  // --- GALLERY IMAGES ---
  const galleryImgs = Array.from(document.querySelectorAll(".random-photo"))
    .filter(img => !img.getAttribute("src"));

  if (galleryImgs.length === 0) return;

  // Generate a shuffled array of remaining indices
  const remainingIndices = [...Array(totalImages).keys()]
    .map(i => i + 1)
    .filter(i => !usedIndices.has(i));

  // Shuffle remaining indices
  function shuffleArray(arr) {
    return arr
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }

  const shuffledIndices = shuffleArray(remainingIndices);

  // Assign images only while we have unused ones
  galleryImgs.forEach((img, idx) => {
    if (idx < shuffledIndices.length) {
      const imageIndex = shuffledIndices[idx];
      img.src = `${baseUrl}${imageIndex}.${fileExtension}`;
      usedIndices.add(imageIndex);
    }
    // If there are more <img> elements than images, do nothing
  });
}

document.addEventListener("DOMContentLoaded", setRandomImages);
