

const imageFormEl = document.getElementById('imageForm');
const galleryEl = document.getElementById("gallery")

window.onload = init

function init() {
  localStorage.setItem('JWT_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFkbWluIiwiaWF0IjoxNzQ3Njg5NzUzLCJleHAiOjE3NDc2OTMzNTN9.C-z4q0x9-BRV-MKEy2KgB2jhptI4ThDXJ_d-Y9kIsE0');
  console.log(localStorage.getItem("JWT_token"))

  if (imageFormEl) {
    imageFormEl.addEventListener("submit", newImage);
  }
if(galleryEl)
   getImages() 
}


//get images from fetch
async function getImages() {
    try {
        const response = await fetch("https://pokerose-db.onrender.com/image", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.ok) {
            const data = await response.json();
            loadImages(data);
        } else {
            console.error("Failed to fetch images");
        }
    } catch (error) {
        console.error("Error fetching images:", error);
    }
}


//load images to DOM
function loadImages(image) {
    galleryEl.innerHTML = "";

console.log(image)  
image.forEach(image => {
        const divEl = document.createElement("div");
        divEl.className = "image_div";
        divEl.innerHTML = `
            ${image.imageurl ? `<img src="${image.imageurl}" alt="${image.description}">` : ""}
        `;
        galleryEl.appendChild(divEl);
    });
}


// Create new image, requires authentication token
async function newImage(e) {
  e.preventDefault();

  const imageDescriptionEl = document.getElementById("imagedescription").value;
  const imageEl = document.getElementById("image").files[0];

  if (!imageDescriptionEl || !imageEl) {
    alert("Please choose an image and description");
    return;
  }

  const formData = new FormData();
  formData.append("description", imageDescriptionEl);
  formData.append("image", imageEl);

  try {
    const resp = await fetch("https://pokerose-db.onrender.com/image", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("JWT_token")}`,
      },
      body: formData
    });

    if (resp.ok) {
      const data = await resp.json();
      alert("Image created");
      console.log(data)
    } else {
      console.error("Create post failed", await resp.json());
      alert("Error adding image");
    }
  } catch (error) {
    console.error("Post error:", error);
    alert("Something went wrong, the image might be too big. Max 5MB is allowed");
  }
}


