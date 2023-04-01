import './index.html';
import './index.scss';
import { directionOfwWind } from './modules/directionOfwWind.js';
import { getAnotherDaysWeatherData } from './modules/anotherDays.js';
import { makeMap } from './modules/makeMap.js';
import { createHeader } from './modules/createHeader.js';
import { hidesearch } from './modules/hidesearch.js';


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

});


const getWeatherData = async (city) => {
  const responce = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6e5bc8936b6c35ca2484b1ad8cc7a1da&units=metric&lang=ua`);
  console.log(responce);
  if (responce.ok == 'false') {
    console.log('responce status HE 200');
  } else {
    const data = await responce.json()
    hidesearch()
    console.log(data);
    createHeader(data)
    createContent(data)
  }

}


function createContent(data) {
  const body = document.querySelector(".weather__body");
  console.log(body.childNodes.length);

  if (body.childNodes.length >= 1) {
    body.replaceChildren()
  }

  const weatherMainContent = document.createElement('div');
  weatherMainContent.classList.add('body-weather__main-content');
  body.append(weatherMainContent);


  const weatherMainInfo = document.createElement('div');
  weatherMainInfo.classList.add('body-weather__main-info');

  const weatherMainMap = document.createElement('div');
  weatherMainMap.classList.add('body-weather__main-map');

  weatherMainContent.append(weatherMainInfo, weatherMainMap);
  weatherMainMap.innerHTML = makeMap(data);

  const mainCondition = document.createElement('div');
  mainCondition.classList.add('body-weather__main-condition');
  weatherMainInfo.append(mainCondition);

  const mainImage = document.createElement('div');
  mainImage.classList.add('body-weather__main-img');
  mainCondition.append(mainImage);
  mainImage.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png" alt="">`;

  const mainValue = document.createElement('div');
  mainValue.classList.add('body-weather__main-value');
  mainCondition.append(mainValue);

  const tempValue = document.createElement('div');
  tempValue.classList.add('body-weather__main-value');
  mainValue.append(tempValue);
  tempValue.innerHTML = Math.round(data.main.temp) + '&deg;';

  const mainShortdescription = document.createElement('div');
  mainShortdescription.classList.add('body-weather__main-short_decription');
  weatherMainInfo.append(mainShortdescription);
  mainShortdescription.textContent = data.weather[0]['description'];

  const mainIndicators = document.createElement('div');
  mainIndicators.classList.add('body-weather__main-indicators');
  weatherMainInfo.append(mainIndicators);

  const windBlock = document.createElement('div');
  windBlock.classList.add('body-weather__main-indicators-item', 'item-wind');
  windBlock.innerText = 'Вітер';
  const windValue = document.createElement('div');
  windValue.classList.add('body-weather__main-indicators-value', 'wind');
  windBlock.append(windValue);
  windValue.innerHTML = data.wind.speed + ' м/с ' + directionOfwWind(data.wind.deg);


  const pressureBlock = document.createElement('div');
  pressureBlock.classList.add('body-weather__main-indicators-item', 'item-pressure');
  pressureBlock.innerText = 'Тиск'
  const pressureValue = document.createElement('div');
  pressureValue.classList.add('body-weather__main-indicators-value', 'pressure');
  pressureBlock.append(pressureValue);
  pressureValue.textContent = data.main.pressure + ' мм ';

  const humidityBlock = document.createElement('div');
  humidityBlock.classList.add('body-weather__main-indicators-item', 'item-humidity');
  humidityBlock.innerText = 'Вологість'
  const humidityValue = document.createElement('div');
  humidityValue.classList.add('body-weather__main-indicators-value', 'humidity');
  humidityBlock.append(humidityValue);
  humidityValue.textContent = data.main.humidity + ' %';

  const cloudinessBlock = document.createElement('div');
  cloudinessBlock.classList.add('body-weather__main-indicators-item', 'item-cloudiness');
  cloudinessBlock.innerText = 'Хмарність'
  const cloudinessValue = document.createElement('div');
  cloudinessValue.classList.add('body-weather__main-indicators-value', 'cloudiness');
  cloudinessBlock.append(cloudinessValue);
  cloudinessValue.textContent = data.clouds.all + ' %'


  mainIndicators.append(windBlock, pressureBlock, humidityBlock, cloudinessBlock);
}

