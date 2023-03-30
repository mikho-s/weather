export function makeMap(data) {
  let lat = data.coord.lat
  let lon = data.coord.lon
  const frame = ` <iframe
  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d142323.11596156468!2d${lon}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2sua!4v1679662329131!5m2!1sru!2sua"
  width="500" height="300" style="border:0;" allowfullscreen="" loading="lazy"
  referrerpolicy="no-referrer-when-downgrade"></iframe>`;
  return frame
}