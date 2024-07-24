import { calculatePonits } from "./utils/common/calculation";

test('purchase of $120 rewards 90 points', () => {
    expect(calculatePonits(120)).toBe(90);
});

test('purchase of $40 rewards 0 points', () => {
  expect(calculatePonits(40)).toBe(0);
});

test('purchase of $85 rewards 35 points', () => {
  expect(calculatePonits(85)).toBe(35);
});

test('purchase of $247 rewards 344 points', () => {
  expect(calculatePonits(247)).toBe(344);
});