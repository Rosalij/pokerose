if (!localStorage.getItem("JWT_token")) {
window.location.href="login.html";
}
console.log(localStorage.getItem("JWT_token"))