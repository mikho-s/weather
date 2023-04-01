
import { directionOfwWind } from './directionOfwWind.js';
// import { everydayCall } from './everydayCall.js';


export const getAnotherDaysWeatherData = async (city) => {
  const anotherDaysData = document.querySelector(".weather__footer-days");
  if (anotherDaysData.childNodes.length > 1) {
    anotherDaysData.replaceChildren()
  }
  const responce = await fetch(`https://api.openweathermap.org/data/2.5/forecast/?q=${city}&appid=6e5bc8936b6c35ca2484b1ad8cc7a1da&units=metric&lang=ua`);
  const data = await responce.json()
  separationDays(data.list)
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
  const blockDay = document.createElement('div');
  blockDay.classList.add("footer-days__item-day");
  blockDay.classList.add(`day${number}`)
  DaysRow.append(blockDay)

  // блок с днем недели
  const blockDayName = document.createElement('div');
  blockDayName.classList.add("footer-days__dayName");
  blockDayName.innerHTML = currentDay(number, Dt);
  blockDay.append(blockDayName)

  // освноной блок где будут дочерние блоки в 3,6,9,12 часов погодой каждый день
  const blockTimeMain = document.createElement('div');
  blockTimeMain.classList.add("footer-days__times-block", `timeBlock${number}`);
  blockDay.append(blockTimeMain)

}

function createAnotherTimeBlock(numberDay, timeHour, obj) {
  const currentDayTime = document.querySelector(`.timeBlock${numberDay}`);

  const hours = document.createElement('div');
  hours.classList.add('footer-days__hours');
  currentDayTime.append(hours)

  const hourTime = document.createElement('div');
  hourTime.classList.add('footer-days__hourTime');
  hourTime.innerHTML = timeHour + ":00"
  hours.append(hourTime)

  const temp = document.createElement('div');;
  temp.classList.add('.footer-days__temp');
  temp.innerHTML = Math.round(obj.main.temp) + '&deg;';
  hours.append(temp)

  const ico = document.createElement('div');;
  ico.classList.add('footer-days__icon', "ibg");
  ico.innerHTML = `<img src="https://openweathermap.org/img/wn/${obj.weather[0]['icon']}@2x.png" alt="">`;;
  hours.append(ico)

  const descrip = document.createElement('div');;
  descrip.classList.add('.footer-days__descrip');
  descrip.innerHTML = obj.weather[0]['description'];
  hours.append(descrip)


  const wind = document.createElement('div');;
  wind.classList.add('.footer-days__wind');
  wind.innerHTML = obj.wind.speed + ' м/с ' + directionOfwWind(obj.wind.deg);
  hours.append(wind)
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