import {
  getAnimals,
  getAnimalCount,
  getPresenceFilter,
  getVisibleAnimals,
} from '../src/selectors';

describe('Reselect', () => {

  it('getAnimals should return animals from state', () => {
    const animals = { foo: 'bar' };
    const result = getAnimals({ animals });
    expect(result).toBe(animals);
  });

  it('getPresenceFilter should return the current presence filter', () => {
    const presenceFilter = 'some';
    const result = getPresenceFilter({ presenceFilter });
    expect(result).toBe(presenceFilter);
  });

  it('getAnimalCount should return the numner of animals in the state', () => {
    const animals = [1,2,3];
    const result = getAnimalCount({ animals });
    expect(result).toBe(3);
  });

  describe('getVisibleAnimals', () => {

    const savio = { name: 'Savio', present: false };
    const lulu = { name: 'Lulu', present: true };
    const rhonda = { name: 'Rhonda', present: true };
    const animals = [savio, lulu, rhonda];

    it('should get the same instance by default', () => {
      const result = getVisibleAnimals({
        animals,
      });
      expect(result).toBe(animals);
    });

    it('should get only present animals when filter=present', () => {
      const result = getVisibleAnimals({
        presenceFilter: 'present',
        animals,
      });
      expect(result).toMatchObject([lulu, rhonda]);
    });

    it('should get only non-present animals when filter=absent', () => {
      const result = getVisibleAnimals({
        presenceFilter: 'absent',
        animals,
      });
      expect(result).toMatchObject([savio]);
    });

    it('should get the same instance if state does not changes', () => {
      const state = {
        presenceFilter: 'absent',
        animals,
      };
      const result1 = getVisibleAnimals(state);
      const result2 = getVisibleAnimals(state);

      expect(result1).toBe(result2);
    });

  });

});
