import { hidesearch } from './hidesearch.js';


export function createHeader(data) {

  const Header = document.querySelector(".weather__header");
  if (Header.childNodes.length > 1) {
    Header.removeChild(Header.firstChild)
    // Header.replaceChildren()
  }
  const curentCityBlock = document.createElement('div');
  curentCityBlock.classList.add('curent-city-block');
  Header.prepend(curentCityBlock);

  const currentCityName = document.createElement('div');
  currentCityName.classList.add('current-city-name');
  currentCityName.innerHTML = data.name;
  console.log(currentCityName);

  const currentCityDate = document.createElement('div');
  currentCityDate.classList.add('current-city-date');

  let myDate = new Date(data.dt * 1000);
  currentCityDate.innerHTML = myDate.toDateString();

  const currentCityChange = document.createElement('div');
  currentCityChange.classList.add('current-city-change');
  currentCityChange.innerHTML = "Змінити місто ";

  curentCityBlock.append(currentCityName, currentCityDate, currentCityChange);


  currentCityChange.addEventListener('click', () => {
    hidesearch()
    // const search = document.querySelector(".search");
    // search.focus()
  })


}