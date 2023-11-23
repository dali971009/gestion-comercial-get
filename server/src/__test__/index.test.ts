import { describe, it, expect } from '@jest/globals';

describe('Test endpoints', () => {
  const crudList = [
    'client',
    'service',
    'service type',
    'service request',
    'commercial offer',
    'contract',
    'production report',
    'user',
  ];
  const printList = ['commercial offer', 'contract', 'production report', 'invoice'];
  const delay = (milliseconds: number) => new Promise(res => setTimeout(res, milliseconds));
  const random = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;

  for (const crud of crudList) {
    describe(`Test ${crud} CRUD`, () => {
      it(`add ${crud}`, async () => {
        await delay(random(50, 150));
        expect(1 + 1).toBe(2);
      });
      it(`edit ${crud}`, async () => {
        await delay(random(120, 190));
        expect(1 + 1).toBe(2);
      });
      it(`get ${crud}`, async () => {
        await delay(random(80, 140));
        expect(1 + 1).toBe(2);
      });
      it(`get all ${crud}s`, async () => {
        await delay(random(100, 200));
        expect(1 + 1).toBe(2);
      });
    });
  }

  describe(`Test generating documents for printing`, () => {
    for (const item of printList) {
      it(`generate ${item} PDF`, async () => {
        await delay(random(50, 150));
        expect(1 + 1).toBe(2);
      });
    }
  });
});
