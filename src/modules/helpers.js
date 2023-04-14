/**
 * @typedef ElementCreator
 * @type {object}
 * @property {string} tag
 * @property {string[]} classNames
 * @property {null | HTMLElement} parent
 * @property {null | string} htmlData
 * @property {null | string} elementName
 */

export function makeMap(data) {
  let lat = data.coord.lat
  let lon = data.coord.lon
  const frame = ` <iframe
  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d142323.11596156468!2d${lon}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2sua!4v1679662329131!5m2!1sru!2sua"
  width="500" height="300" style="border:0;" allowfullscreen="" loading="lazy"
  referrerpolicy="no-referrer-when-downgrade"></iframe>`
  return frame
}

// export function everydayCall(Dt, element) {
//   let numberDay = Dt.getDay();
//   let timeHour = Dt.getHours();
//   if (document.querySelector(`.day${numberDay}`) == null) {
//     createAnotherDayBlock(Dt.getDay())
//   }
//   createAnotherTimeBlock(numberDay, timeHour, element);
// }

export const directionOfwWind = (degree) => {
  if (degree > 337.5) {
    return ' пн.'
  }
  if (degree > 292.5) {
    return ' пн.-зх.'
  }
  if (degree > 247.5) {
    return ' зх.'
  }
  if (degree > 202.5) {
    return ' пд.-зх.'
  }
  if (degree > 157.5) {
    return ' пд.'
  }
  if (degree > 122.5) {
    return ' пд.-сх.'
  }
  if (degree > 67.5) {
    return ' сх.'
  }
  if (degree > 22.5) {
    return ' пн.-сх.'
  }
  return ' пн.'
}

export function hidesearch() {
  const search = document.querySelector('.search')
  search.classList.toggle('hide')
  search.focus()
}

export const createElem = (tag = 'div', classNames = [], parent = null, htmlData = null) => {
  const elem = document.createElement(tag)
  elem.classList.add(...classNames)
  htmlData && (elem.innerHTML = htmlData)
  parent && parent.append(elem)
  // parent.append(elem)
  return elem
}

/**
 *
 * @param {ElementCreator[]} array
 * @param {Map} mapBlocks
 */
export const createElements = (array, mapBlocks) => {
  array.forEach((el) => {
    const { tag, classNames, parent, htmlData, elementName } = el

    const newparent = typeof parent === "string" ? mapBlocks.get(parent) : parent

    const htmlElem = createElem(tag, classNames, newparent, htmlData)
    elementName && mapBlocks.set(elementName, htmlElem)
    // mapBlocks.set(elementName, htmlElem)
  })
}
