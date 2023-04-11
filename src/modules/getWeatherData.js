import { makeMap, directionOfwWind, hidesearch, createElem } from './helpers.js';
import { createHeader } from './createHeader.js';


export const getWeatherData = async (city) => {
  try {
    const responce = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6e5bc8936b6c35ca2484b1ad8cc7a1da&units=metric&lang=ua`);
    const data = await responce.json()
    hidesearch()
    console.log(data);
    createHeader(data)
    createContent(data)
  } catch (error) {
    console.error(error, 'response error');
  }
}




function createContent(data) {
  const body = document.querySelector(".weather__body");
  console.log(body.childNodes.length);

  if (body.childNodes.length >= 1) {
    body.replaceChildren()
  }


  const htmlData = [
    { elemntName: "bloc1", tag: "div", classes: ['body1'], parent: body },
    { elemntName: "bloc2", tag: "div", classes: ['body2'], parent: body },
    { elemntName: "bloc3", tag: "div", classes: ['body3'], parent: body }];


  function createElementFromObj(data) {

    const elements = {}

    data.forEach((el) => {
      const { elemntName, tag, classes, parent } = el;

      const elem = createElem(tag, classes, parent);

      elements[elemntName] = elem;

    })
    return elements
  }

  const createdElements = createElementFromObj(htmlData)

  console.log(createdElements);
  createdElements.bloc2.innerText = 'ЭТО БЛОК 2';



  const weatherMainContent = createElem('div', ['body-weather__main-content'], body);
  body.append(weatherMainContent);


  const weatherMainInfo = createElem('div', ['body-weather__main-info'], body);


  const weatherMainMap = createElem('div', ['body-weather__main-map'], body);
  weatherMainContent.append(weatherMainInfo, weatherMainMap);
  weatherMainMap.innerHTML = makeMap(data);

  const mainCondition = createElem('div', ['body-weather__main-condition'], weatherMainInfo);

  const mainImage = createElem('div', ['body-weather__main-img'], mainCondition);
  mainImage.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png" alt="">`;

  const mainValue = createElem('div', ['body-weather__main-value'], mainCondition);
  const tempValue = createElem('div', ['body-weather__main-value', 'temp'], mainValue);
  tempValue.innerHTML = Math.round(data.main.temp) + '&deg;';

  const mainShortdescription = createElem('div', ['body-weather__main-short_decription'], weatherMainInfo);
  mainShortdescription.textContent = data.weather[0]['description'];

  const mainIndicators = createElem('div', ['body-weather__main-indicators'], weatherMainInfo);



  const windBlock = createElem('div', ['body-weather__main-indicators-item', 'item-wind'], mainIndicators);
  windBlock.innerText = 'Вітер';
  const windValue = createElem('div', ['body-weather__main-indicators-value', 'wind'], windBlock);
  windValue.innerHTML = data.wind.speed + ' м/с ' + directionOfwWind(data.wind.deg);


  const pressureBlock = createElem('div', ['body-weather__main-indicators-item', 'item-pressure'], mainIndicators);
  pressureBlock.innerText = 'Тиск'
  const pressureValue = createElem('div', ['body-weather__main-indicators-value', 'pressure'], pressureBlock);
  pressureValue.textContent = data.main.pressure + ' мм ';

  const humidityBlock = createElem('div', ['body-weather__main-indicators-item', 'item-humidity'], mainIndicators);
  humidityBlock.innerText = 'Вологість'
  const humidityValue = createElem('div', ['body-weather__main-indicators-value', 'pressure'], humidityBlock);
  humidityValue.textContent = data.main.humidity + ' %';

  const cloudinessBlock = createElem('div', ['body-weather__main-indicators-item', 'item-cloudiness'], mainIndicators);
  cloudinessBlock.innerText = 'Хмарність'
  const cloudinessValue = createElem('div', ['body-weather__main-indicators-value', 'cloudiness'], cloudinessBlock);
  cloudinessValue.textContent = data.clouds.all + ' %'
  // bloc3.innerText = 'ЭТО БЛОК 3';
  // bloc4.innerText = 'ЭТО БЛОК 4';
}
// bloc3.innerText = 'ЭТО БЛОК 3';
// bloc4.innerText = 'ЭТО БЛОК 4';