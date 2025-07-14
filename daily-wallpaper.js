const imageEl = document.getElementById("nasaImage");
const descEl = document.getElementById("description");
const downloadBtn = document.getElementById("downloadBtn");

const bgImage = new Image();
bgImage.src = "bg.png"; // ✅ Make sure this matches the actual file name

let imageUrl = "";

async function fetchWallpaper() {
    const apiKey = "DEMO_KEY";
    const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.media_type === "image") {
            imageUrl = data.hdurl || data.url;
            imageEl.src = imageUrl;
            descEl.textContent = data.explanation;
        } else {
            imageEl.alt = "Today's media is not an image.";
            descEl.textContent = "NASA's APOD today is not an image.";
            downloadBtn.style.display = "none";
        }
    } catch (err) {
        descEl.textContent = "Failed to load NASA image.";
        console.error(err);
    }
}
function drawBackground() {
  ctx.drawImage(bgImage, 0, 0, width, height);
  ctx.fillStyle = "rgba(0, 0, 0, 0.5)"; // Darken
  ctx.fillRect(0, 0, width, height);

}

downloadBtn.addEventListener("click", async () => {
    try {
        const response = await fetch(imageUrl, { mode: 'cors' });
        const blob = await response.blob();

        const blobUrl = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = "nasa-wallpaper.jpg";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
        alert("Failed to download the image.");
        console.error(error);
    }
});

fetchWallpaper();
