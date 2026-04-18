export const COVER = 0.075;

export function getUsableDimension(value: number) {
  return value - COVER * 2;
}

export function getBars(usable: number, spacing: number) {
  if (!usable || !spacing) return 0;
  return Math.floor(usable / spacing) + 1;
}

export function getVolume(
  width: number,
  length: number,
  thickness: number,
  quantity: number,
) {
  return width * length * thickness * quantity;
}
