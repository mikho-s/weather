import { makeMap, directionOfwWind, hidesearch, createElem, createElements } from './helpers.js';
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

  const weatherMainContent = createElem('div', ['body-weather__main-content'], body);
  const weatherMainInfo = createElem('div', ['body-weather__main-info'], body);

  const weatherMainMap = createElem('div', ['body-weather__main-map'], body);
  weatherMainContent.append(weatherMainInfo, weatherMainMap);
  weatherMainMap.innerHTML = makeMap(data);

  const mainCondition = 'mainCondition';
  const mainIndicators = 'mainIndicators';
  const windBlock = 'windBlock';
  const pressureBlock = 'pressureBlock';
  const humidityBlock = 'humidityBlock';
  const cloudinessBlock = 'cloudinessBlock';

  const bodyBlocks = new Map();
  const mainContentBlocksData = [
    { elementName: 'mainCondition', tag: 'div', classNames: ['body-weather__main-condition'], parent: weatherMainInfo },
    {
      elementName: 'mainImage',
      tag: 'div',
      classNames: ['body-weather__main-img'],
      parent: mainCondition,
      htmlData: `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png" alt="">`,
    },
    {
      elementName: 'mainTempValue',
      tag: 'div',
      classNames: ['body-weather__main-value', 'temp'],
      parent: mainCondition,
      htmlData: Math.round(data.main.temp) + '&deg;',
    },
    {
      elementName: 'mainShortdescription',
      tag: 'div',
      classNames: ['body-weather__main-short_decription'],
      parent: weatherMainInfo,
      htmlData: data.weather[0]['description'],
    },
    {
      elementName: 'mainIndicators',
      tag: 'div',
      classNames: ['body-weather__main-indicators'],
      parent: weatherMainInfo
    },
    {
      elementName: 'windBlock',
      tag: 'div',
      classNames: ['body-weather__main-indicators-item', 'item-wind'],
      parent: mainIndicators,
      htmlData: 'Вітер',
    },
    {
      elementName: 'windValue',
      tag: 'div',
      classNames: ['body-weather__main-indicators-value', 'wind'],
      parent: windBlock,
      htmlData: data.wind.speed + ' м/с ' + directionOfwWind(data.wind.deg),
    },
    {
      elementName: 'pressureBlock',
      tag: 'div',
      classNames: ['body-weather__main-indicators-item', 'item-pressure'],
      parent: mainIndicators,
      htmlData: 'Тиск',
    },
    {
      elementName: 'pressureValue',
      tag: 'div',
      classNames: ['body-weather__main-indicators-value', 'pressure'],
      parent: pressureBlock,
      htmlData: data.main.pressure + ' мм ',
    },
    {
      elementName: 'humidityBlock',
      tag: 'div',
      classNames: ['body-weather__main-indicators-item', 'item-humidity'],
      parent: mainIndicators,
      htmlData: 'Вологість',
    },
    {
      elementName: 'humidityValue',
      tag: 'div',
      classNames: ['body-weather__main-indicators-value', 'humidity'],
      parent: humidityBlock,
      htmlData: data.main.humidity + ' %',
    },
    {
      elementName: 'cloudinessBlock',
      tag: 'div',
      classNames: ['body-weather__main-indicators-item', 'item-cloudiness'],
      parent: mainIndicators,
      htmlData: 'Хмарність',
    },
    {
      elementName: 'humidityValue',
      tag: 'div',
      classNames: ['body-weather__main-indicators-value', 'cloudiness'],
      parent: cloudinessBlock,
      htmlData: data.clouds.all + ' %'
    },
  ];
  createElements(mainContentBlocksData, bodyBlocks)

}
