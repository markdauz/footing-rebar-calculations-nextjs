export type MortarMix = 'a' | 'b' | 'c' | 'd';

export function computeMortarVolume(thickness: number | '') {
  if (!thickness) return 0;

  const map: Record<number, number> = {
    0.1: 0.0435,
    0.125: 0.0638,
    0.15: 0.084,
    0.2: 0.1135,
    0.25: 0.1298,
  };

  return map[thickness] ?? 0;
}

export function computeMortarCement(
  volume: number,
  area: number | '',
  mix: MortarMix | '',
) {
  if (!volume || !area || !mix) return '0.00';

  const factors: Record<MortarMix, number> = {
    a: 18,
    b: 12,
    c: 9,
    d: 7.5,
  };

  return (volume * area * factors[mix]).toFixed(2);
}

export function computeMortarSand(
  volume: number,
  area: number | '',
  mix: MortarMix | '',
) {
  if (!volume || !area || !mix) return '0.000';
  return (volume * area * 1).toFixed(3);
}
