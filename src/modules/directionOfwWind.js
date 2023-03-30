export const directionOfwWind = (degree) => {
  if (degree > 337.5) { return ' пн.' };
  if (degree > 292.5) { return ' пн.-зх.' };
  if (degree > 247.5) { return ' зх.' };
  if (degree > 202.5) { return ' пд.-зх.' };
  if (degree > 157.5) { return ' пд.' };
  if (degree > 122.5) { return ' пд.-сх.' };
  if (degree > 67.5) { return ' сх.' };
  if (degree > 22.5) { return ' пн.-сх.' }
  return ' пн.';
}