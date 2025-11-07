document.addEventListener("DOMContentLoaded", function () {
    const baseUrl = "https://images.rrett.net/first-test-photos/";
    const totalImages = 11;
    const fileExtension = "jpeg";

    // Get hero and gallery images
    const heroImg = document.getElementById("mainPhoto");
    const galleryImgs = document.querySelectorAll(".random-photo");

    // Combine into a single array (hero + gallery)
    const allImgs = [];
    if (heroImg) allImgs.push(heroImg);
    galleryImgs.forEach(img => allImgs.push(img));

    // Create an array of image indexes and shuffle it
    let indexes = Array.from({ length: totalImages }, (_, i) => i + 1); // [1,2,...,8]

    // Shuffle the array (Fisher-Yates)
    for (let i = indexes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indexes[i], indexes[j]] = [indexes[j], indexes[i]];
    }

    // Assign images sequentially
    allImgs.forEach((img, idx) => {
        // Wrap around if more <img> than available images
        const imageIndex = indexes[idx % totalImages];
        img.src = `${baseUrl}${imageIndex}.${fileExtension}`;
    });
});
