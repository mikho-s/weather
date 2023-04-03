import { hidesearch, createElem } from './helpers.js';


export function createHeader(data) {

  const Header = document.querySelector(".weather__header");
  if (Header.childNodes.length > 1) {
    Header.removeChild(Header.firstChild)
    // Header.replaceChildren()
  }
  // тут важно prepend а не аппенд
  const curentCityBlock = document.createElement('div');
  curentCityBlock.classList.add('curent-city-block');
  Header.prepend(curentCityBlock)

  const currentCityName = createElem('div', ['current-city-name'], curentCityBlock);
  currentCityName.innerHTML = data.name;

  const currentCityDate = createElem('div', ['current-city-date'], curentCityBlock);

  let myDate = new Date(data.dt * 1000);
  currentCityDate.innerHTML = myDate.toDateString();

  const currentCityChange = createElem('div', ['current-city-change'], curentCityBlock);
  currentCityChange.innerHTML = "Змінити місто ";


  currentCityChange.addEventListener('click', () => {
    hidesearch()
    // const search = document.querySelector(".search");
    // search.focus()
  })


}