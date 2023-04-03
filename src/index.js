import './index.html';
import './index.scss';
import { getAnotherDaysWeatherData } from './modules/anotherDays.js';
import { getWeatherData } from './modules/getWeatherData.js';



document.addEventListener("DOMContentLoaded", () => {
  const inputCity = document.querySelector(".city-input");
  const btnOk = document.querySelector(".btn-ok")

  btnOk.addEventListener('click', () => {
    getWeatherData(inputCity.value)
    getAnotherDaysWeatherData(inputCity.value)
  })

  document.addEventListener('keyup', event => {
    if (event.key === 'Enter') {
      getWeatherData(inputCity.value)
      getAnotherDaysWeatherData(inputCity.value)
    }
  })

  // getWeatherData('Одеса')
  // getAnotherDaysWeatherData('Одеса')

});



