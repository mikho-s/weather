
// import { directionOfwWind } from './directionOfwWind.js';
import { directionOfwWind, createElem } from './helpers.js';


export const getAnotherDaysWeatherData = async (city) => {
  const anotherDaysData = document.querySelector(".weather__footer-days");
  if (anotherDaysData.childNodes.length > 1) {
    anotherDaysData.replaceChildren()
  }
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast/?q=${city}&appid=6e5bc8936b6c35ca2484b1ad8cc7a1da&units=metric&lang=ua`);
    const data = await response.json()
    separationDays(data.list)
  } catch (error) {
    console.error(error, 'response another days error');
  }

}

function separationDays(array) {
  const today = new Date();
  array.map(function (element) {
    let Dt = new Date((element.dt) * 1000);

    if (Dt.getDay() == today.getDay()) {
    }
    else if (Dt.getDay() == 0) {
      everydayCall(Dt, element)
    }
    else if (Dt.getDay() == 1) {
      everydayCall(Dt, element)

    }
    else if (Dt.getDay() == 2) {
      everydayCall(Dt, element)

    }
    else if (Dt.getDay() == 3) {
      everydayCall(Dt, element)

    }
    else if (Dt.getDay() == 4) {
      everydayCall(Dt, element)

    }
    else if (Dt.getDay() == 5) {
      everydayCall(Dt, element)

    }
    else if (Dt.getDay() == 6) {
      everydayCall(Dt, element)
    };

  })
};

function everydayCall(Dt, element) {
  let numberDay = Dt.getDay();
  // console.log(Dt.getMonth());
  let timeHour = Dt.getHours();
  if (document.querySelector(`.day${numberDay}`) == null) {
    createAnotherDayBlock(Dt.getDay(), Dt)
  }
  createAnotherTimeBlock(numberDay, timeHour, element);
}



function createAnotherDayBlock(number, Dt) {

  const DaysRow = document.querySelector(".weather__footer-days")
  const blockDay = createElem('div', ['footer-days__item-day', `day${number}`], DaysRow);

  // блок с днем недели
  const blockDayName = createElem('div', ['footer-days__dayName'], blockDay);
  blockDayName.innerHTML = currentDay(number, Dt);

  // освноной блок где будут дочерние блоки в 3,6,9,12 часов погодой каждый день
  const blockTimeMain = createElem('div', ["footer-days__times-block", `timeBlock${number}`], blockDay);
}

function createAnotherTimeBlock(numberDay, timeHour, obj) {
  const currentDayTime = document.querySelector(`.timeBlock${numberDay}`);
  const hours = createElem('div', ['footer-days__hours'], currentDayTime);

  const hourTime = createElem('div', ['footer-days__hourTime'], hours);
  hourTime.innerHTML = timeHour + ":00"

  const temp = createElem('div', ['footer-days__temp'], hours);
  temp.innerHTML = Math.round(obj.main.temp) + '&deg;';

  const ico = createElem('div', ['footer-days__icon', "ibg"], hours);
  ico.innerHTML = `<img src="https://openweathermap.org/img/wn/${obj.weather[0]['icon']}@2x.png" alt="">`;;

  const descrip = createElem('div', ['footer-days__descrip'], hours);
  descrip.innerHTML = obj.weather[0]['description'];

  const wind = createElem('div', ['footer-days__wind'], hours);
  wind.innerHTML = obj.wind.speed + ' м/с ' + directionOfwWind(obj.wind.deg);
}




function currentDay(number, Dt) {
  if (number == 0) { return ' Неділя ' + '(' + (Dt.getDate()) + '.' + ((Dt.getMonth()) + 1) + ')' };
  if (number == 1) { return ' Понеділок ' + '(' + (Dt.getDate()) + '.' + ((Dt.getMonth()) + 1) + ')' };
  if (number == 2) { return ' Вівторок ' + '(' + (Dt.getDate()) + '.' + ((Dt.getMonth()) + 1) + ')' };
  if (number == 3) { return ' Середа ' + '(' + (Dt.getDate()) + '.' + ((Dt.getMonth()) + 1) + ')' };
  if (number == 4) { return ' Четвер ' + '(' + (Dt.getDate()) + '.' + ((Dt.getMonth()) + 1) + ')' };
  if (number == 5) { return ' П\'ятниця ' + '(' + (Dt.getDate()) + '.' + ((Dt.getMonth()) + 1) + ')' };
  if (number == 6) { return ' Субота ' + '(' + (Dt.getDate()) + '.' + ((Dt.getMonth()) + 1) + ')' };
}