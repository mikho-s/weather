import { directionOfwWind, createElem, createElements } from './helpers.js'

const FOOTER_PREFIX = 'footer-days'

export const getAnotherDaysWeatherData = async (city) => {
  const anotherDaysData = document.querySelector(`.weather__${FOOTER_PREFIX}`)
  if (anotherDaysData.childNodes.length > 1) {
    anotherDaysData.replaceChildren()
  }
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast/?q=${city}&appid=6e5bc8936b6c35ca2484b1ad8cc7a1da&units=metric&lang=ua`
    )
    const data = await response.json()
    separationDays(data.list)
  } catch (error) {
    console.error(error, 'response another days error')
  }
}

function separationDays(array) {
  const today = new Date()
  array.map(function (element) {
    let Dt = new Date(element.dt * 1000)

    if (Dt.getDay() == today.getDay()) {
    } else if (Dt.getDay() == 0) {
      everydayCall(Dt, element)
    } else if (Dt.getDay() == 1) {
      everydayCall(Dt, element)
    } else if (Dt.getDay() == 2) {
      everydayCall(Dt, element)
    } else if (Dt.getDay() == 3) {
      everydayCall(Dt, element)
    } else if (Dt.getDay() == 4) {
      everydayCall(Dt, element)
    } else if (Dt.getDay() == 5) {
      everydayCall(Dt, element)
    } else if (Dt.getDay() == 6) {
      everydayCall(Dt, element)
    }
  })
}

function everydayCall(Dt, element) {
  let numberDay = Dt.getDay()
  // console.log(Dt.getMonth());
  let timeHour = Dt.getHours()
  if (document.querySelector(`.day${numberDay}`) == null) {
    createAnotherDayBlock(Dt.getDay(), Dt)
  }
  createAnotherTimeBlock(numberDay, timeHour, element)
}

function createAnotherDayBlock(number, Dt) {
  const mapBlocks = new Map()

  const DaysRow = document.querySelector(`.weather__${FOOTER_PREFIX}`)
  const blockDay = createElem('div', [`${FOOTER_PREFIX}__item-day`, `day${number}`], DaysRow)

  const blocksData = [
    { elementName: 'blockDayName', tag: 'div', classNames: [`${FOOTER_PREFIX}__dayName`], parent: blockDay, htmlData: currentDay(number, Dt) },
    { elementName: 'blockTimeMain', tag: 'div', classNames: [`${FOOTER_PREFIX}__times-block`, `timeBlock${number}`], parent: blockDay },
  ]

  createElements(blocksData, mapBlocks)
}

function createAnotherTimeBlock(numberDay, timeHour, obj) {
  const currentDayTime = document.querySelector(`.timeBlock${numberDay}`)
  const hours = createElem('div', [`${FOOTER_PREFIX}__hours`], currentDayTime)

  const hoursBlocks = new Map()
  const hoursData = [
    { elementName: 'hourTime', tag: 'div', classNames: [`${FOOTER_PREFIX}__hourTime`], parent: hours, htmlData: timeHour + ':00' },
    { elementName: 'temp', tag: 'div', classNames: [`${FOOTER_PREFIX}__temp`], parent: hours, htmlData: Math.round(obj.main.temp) + '&deg;' },
    {
      elementName: 'ico',
      tag: 'div',
      classNames: [`${FOOTER_PREFIX}__icon`, 'ibg'],
      parent: hours,
      htmlData: `<img src="https://openweathermap.org/img/wn/${obj.weather[0]['icon']}@2x.png" alt="">`,
    },
    { elementName: 'descrip', tag: 'div', classNames: [`${FOOTER_PREFIX}__descrip`], parent: hours, htmlData: obj.weather[0]['description'] },
    {
      elementName: 'wind',
      tag: 'div',
      classNames: [`${FOOTER_PREFIX}__wind`],
      parent: hours,
      htmlData: obj.wind.speed + ' м/с ' + directionOfwWind(obj.wind.deg),
    },
  ]

  createElements(hoursData, hoursBlocks)
}

function currentDay(number, Dt) {
  if (number == 0) {
    return ' Неділя ' + '(' + Dt.getDate() + '.' + (Dt.getMonth() + 1) + ')'
  }
  if (number == 1) {
    return ' Понеділок ' + '(' + Dt.getDate() + '.' + (Dt.getMonth() + 1) + ')'
  }
  if (number == 2) {
    return ' Вівторок ' + '(' + Dt.getDate() + '.' + (Dt.getMonth() + 1) + ')'
  }
  if (number == 3) {
    return ' Середа ' + '(' + Dt.getDate() + '.' + (Dt.getMonth() + 1) + ')'
  }
  if (number == 4) {
    return ' Четвер ' + '(' + Dt.getDate() + '.' + (Dt.getMonth() + 1) + ')'
  }
  if (number == 5) {
    return " П'ятниця " + '(' + Dt.getDate() + '.' + (Dt.getMonth() + 1) + ')'
  }
  if (number == 6) {
    return ' Субота ' + '(' + Dt.getDate() + '.' + (Dt.getMonth() + 1) + ')'
  }
}
