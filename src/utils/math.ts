interface Point {
  x: number;
  y: number;
}

export function getRandomInt(max: number): number {
  return Math.floor(Math.random() * Math.floor(max));
}

export function rotate(
  x: number,
  y: number,
  centerX: number,
  centerY: number,
  rad: number
): Point {
  const X =
    Math.cos(rad) * (x - centerX) - Math.sin(rad) * (y - centerY) + centerX;
  const Y =
    Math.sin(rad) * (x - centerX) + Math.cos(rad) * (y - centerY) + centerY;
  return { x: X, y: Y };
}
