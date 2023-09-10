const toUpBtn = document.createElement("button");
toUpBtn.className = "fa-solid fa-arrow-up";
toUpBtn.style.cssText =
  "width: 50px; height: 50px; background-color: var(--color10PERCENT); position: fixed; border-radius: 10px; bottom: 20px; right: 20px; z-index: 7; cursor: pointer; border: none; outline: none; color: white; font-size: 1.5rem; transition: all 0.5s;";
toUpBtn.style.display = "none"; // Initially hide the button
document.body.appendChild(toUpBtn);

function toUp() {
  if (window.scrollY >= 370) {
    toUpBtn.style.display = "block";
  } else {
    toUpBtn.style.display = "none";
  }
}

window.addEventListener("scroll", toUp);

toUpBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
