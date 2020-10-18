export function filterPanel() {
  const aside = document.getElementById("aside")
  const overlay = document.getElementById("overlay")

  aside.classList.add("aside-show")
  overlay.style.display = "block"

  overlay.addEventListener("click", event => {
    overlay.style.display = "none"
    aside.classList.remove("aside-show")
  })
}
