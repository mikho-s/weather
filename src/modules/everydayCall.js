

export function everydayCall(Dt, element) {
  let numberDay = Dt.getDay();
  let timeHour = Dt.getHours();
  if (document.querySelector(`.day${numberDay}`) == null) {
    createAnotherDayBlock(Dt.getDay())
  }
  createAnotherTimeBlock(numberDay, timeHour, element);
}