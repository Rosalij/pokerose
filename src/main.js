

const imageFormEl = document.getElementById('imageForm');
const galleryEl = document.getElementById("gallery");
const loginFormEl = document.getElementById("loginform");
const orderFormEl = document.getElementById("orderForm");
const currentordersEl = document.getElementById("currentorders")

window.onload = init

function init() {

  console.log(localStorage.getItem("JWT_token"))


  if (imageFormEl) {
    imageFormEl.addEventListener("submit", newImage);
  }
  if (galleryEl) {
    getImages()
  }

  if (loginFormEl) {
    loginFormEl.addEventListener("submit", login);
  }

  if (orderFormEl) {
    orderFormEl.addEventListener("submit", addOrder)
  }

  if (currentordersEl) {
    loadOrders()
  }
}



async function addOrder(e) {

  e.preventDefault()
  //get the text input from the form
  let name = document.getElementById("name").value;
  let phoneno = document.getElementById("phoneno").value;
  let choosefood = document.getElementById("choosefood").value;
  let choosedrink = document.getElementById("choosedrink").value;
  let note = document.getElementById("note").value;

  if (!name || !phoneno) {
    alert("Please fill in your name and phone number")
    return;
  }
  if (!choosefood || !choosedrink) {
    alert("Please select food or drink to order")
    return;
  }

  let order = {
    name: name,
    phoneno: phoneno,
    food: choosefood,
    drink: choosedrink,
    note: note,
  }

  try {
    const resp = await fetch("https://pokerose-db.onrender.com/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(order)
    })
    if (resp.ok) {

      const data = await resp.json()
      console.log(data)
      alert("Order placed!")
    } else {
      console.log("something went wrong" + error)
    }
  } catch (error) {
    console.log("An error occured" + error)
  }
}



async function loadOrders() {
  try {
    const response = await fetch("https://pokerose-db.onrender.com/order", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("JWT_token")}`,
        "Content-Type": "application/json"
      }
    });

    if (response.ok) {
      currentordersEl.innerHTML = "";
      const data = await response.json();
      console.log(data)
      data.forEach(order => {
        let ulEl = document.createElement("ul")
        ulEl.innerHTML = `<li>
  <p>Name: ${order.name}</p><p>Phone: ${order.phoneo}</p><p>Food: ${order.food}</p><p>Drink: ${order.drink}</p><p>Other / Note: ${order.note}</p></li>`
        currentordersEl.appendChild(ulEl)
      
        const btn = document.createElement("button");
        btn.textContent = "Delete";
        btn.addEventListener("click", () => deleteOrder(order._id)); // ✅ Direct bind
        ulEl.appendChild(btn);
      });
    } else {
      console.error("Failed to fetch orders");
    }
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
}
//delete an order by _ID
async function deleteOrder(orderId) {
  const confirmDelete = confirm("Are you sure you want to delete this order?");
  if (!confirmDelete) return;

  try {
    const resp = await fetch(`https://pokerose-db.onrender.com/order/${orderId}`, {
      method: "DELETE",
      headers: {
          "authorization": `Bearer ${localStorage.getItem("JWT_token")}`
      }
    });

    if (resp.ok) {

      loadOrders();
    //refresh the list
    } else {
      alert("Failed to delete order.");
    }
  } catch (err) {
    console.error("Error deleting order:", err);
    alert("An error occurred.");
  }
}


//login user, fetch for validation and get JWT token to access hidden pages
async function login(e) {
  e.preventDefault()
  let nameinput = document.getElementById("username").value;
  let passwordinput = document.getElementById("password").value;

  //check if the user has filled in all the fields
  if (!nameinput || !passwordinput) {
    alert("Please fill in all fields")
    return;
  }

  //create a user object with the username and password
  let admin = {
    username: nameinput,
    password: passwordinput
  }
  try {
    //send a POST request to the server with the user object
    const resp = await fetch("https://pokerose-db.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(admin)
    })
    if (resp.ok) {
      const data = await resp.json()
      let loggedinuserEl = document.getElementById("loggedinuser")
      console.log(data)
      loggedinuserEl.innerHTML = `<p>logged in as: ${data.admin.username}</p>`

      //set the JWT token in local storage
      localStorage.setItem("JWT_token", data.token)

    } else {
      alert("Wrong username or password")
    }
  } catch (error) {
    console.error("Error logging in:", error)
    alert("An error occured. Please try again")
  }
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


