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
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6e5bc8936b6c35ca2484b1ad8cc7a1da&units=metric&lang=ua`);
    if (response.ok == 'false') throw new Error

    const data = await response.json()
    hidesearch()
    console.log(data);
    createHeader(data)
    createContent(data)
  } catch (error) {
    console.error(error, 'response error');
  }

  
  // console.log(response);
  // if (response.ok == 'false') {
  //   console.log('response status HE 200');
  // } else {
  //   const data = await response.json()
  //   hidesearch()
  //   console.log(data);
  //   createHeader(data)
  //   createContent(data)
  // }


}


const createElem  = (tag = 'div', className = [], parent = null) => {
  const elem =  document.createElement(tag);
  elem.classList.add(...className);
  parent && parent.append(elem)
  return elem
}

function createContent(data) {
  const body = document.querySelector(".weather__body");
  console.log(body.childNodes.length);

  if (body.childNodes.length >= 1) {
    body.replaceChildren()
  }

  // забагато дудлюючого коду use createElem
  const weatherMainContent = document.createElement('div');
  weatherMainContent.classList.add('body-weather__main-content');
  body.append(weatherMainContent);

  // use createElem
  const weatherMainInfo = document.createElement('div');
  weatherMainInfo.classList.add('body-weather__main-info');

  // use createElem
  const weatherMainMap = document.createElement('div');
  weatherMainMap.classList.add('body-weather__main-map');

  weatherMainContent.append(weatherMainInfo, weatherMainMap);
  weatherMainMap.innerHTML = makeMap(data);

  // use createElem
  const mainCondition = document.createElement('div');
  mainCondition.classList.add('body-weather__main-condition');
  weatherMainInfo.append(mainCondition);

  // use createElem
  const mainImage = document.createElement('div');
  mainImage.classList.add('body-weather__main-img');
  mainCondition.append(mainImage);
  mainImage.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png" alt="">`;

  // use createElem
  const mainValue = document.createElement('div');
  mainValue.classList.add('body-weather__main-value');
  mainCondition.append(mainValue);

  // use createElem ...
  const tempValue = document.createElement('div');
  tempValue.classList.add('body-weather__main-value');
  mainValue.append(tempValue);
  tempValue.innerHTML = Math.round(data.main.temp) + '&deg;';

  // .....
  const mainShortdescription = document.createElement('div');
  mainShortdescription.classList.add('body-weather__main-short_decription');
  weatherMainInfo.append(mainShortdescription);
  mainShortdescription.textContent = data.weather[0]['description'];

  // .....
  const mainIndicators = document.createElement('div');
  mainIndicators.classList.add('body-weather__main-indicators');
  weatherMainInfo.append(mainIndicators);

  // .....
  const windBlock = document.createElement('div');
  windBlock.classList.add('body-weather__main-indicators-item', 'item-wind');
  windBlock.innerText = 'Вітер';
  const windValue = document.createElement('div');
  windValue.classList.add('body-weather__main-indicators-value', 'wind');
  windBlock.append(windValue);
  windValue.innerHTML = data.wind.speed + ' м/с ' + directionOfwWind(data.wind.deg);

  // .....

  const pressureBlock = document.createElement('div');
  pressureBlock.classList.add('body-weather__main-indicators-item', 'item-pressure');
  pressureBlock.innerText = 'Тиск'
  const pressureValue = document.createElement('div');
  pressureValue.classList.add('body-weather__main-indicators-value', 'pressure');
  pressureBlock.append(pressureValue);
  pressureValue.textContent = data.main.pressure + ' мм ';

  // .....
  const humidityBlock = document.createElement('div');
  humidityBlock.classList.add('body-weather__main-indicators-item', 'item-humidity');
  humidityBlock.innerText = 'Вологість'
  const humidityValue = document.createElement('div');
  humidityValue.classList.add('body-weather__main-indicators-value', 'humidity');
  humidityBlock.append(humidityValue);
  humidityValue.textContent = data.main.humidity + ' %';

  // .....
  const cloudinessBlock = document.createElement('div');
  cloudinessBlock.classList.add('body-weather__main-indicators-item', 'item-cloudiness');
  cloudinessBlock.innerText = 'Хмарність'
  const cloudinessValue = document.createElement('div');
  cloudinessValue.classList.add('body-weather__main-indicators-value', 'cloudiness');
  cloudinessBlock.append(cloudinessValue);
  cloudinessValue.textContent = data.clouds.all + ' %'


  mainIndicators.append(windBlock, pressureBlock, humidityBlock, cloudinessBlock);
}

