document.addEventListener("DOMContentLoaded", function () {
    const baseUrl = "https://images.rrett.net/first-test-photos/";
    const totalImages = 8;
    const fileExtension = "jpeg";

    const imgElements = document.querySelectorAll(".random-photo");

    // Preload images
    const preloadedImages = [];
    for (let i = 1; i <= totalImages; i++) {
        const img = new Image();
        img.src = `${baseUrl}${i}.${fileExtension}`;
        preloadedImages.push(img);
    }

    // Shuffle array of image indexes
    const indexes = [...Array(totalImages).keys()]; // [0,1,...,7]
    for (let i = indexes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indexes[i], indexes[j]] = [indexes[j], indexes[i]];
    }

    // Assign random images to <img> elements
    imgElements.forEach((imgElement, idx) => {
        const imageIndex = indexes[idx % totalImages]; // wrap around if more <img> than images
        imgElement.src = preloadedImages[imageIndex].src;
    });
});
