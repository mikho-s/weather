export function hidesearch() {
  const search = document.querySelector(".search");
  search.classList.toggle('hide')
  search.focus()
}