import { RECEIVE_ANIMAL, receiveAnimal } from '../src/actions';
import { BREAK_OUT, breakOut } from '../src/actions';
import { animals } from '../src/reducers';

describe('Animals', () => {

  describe('receiveAnimal action creator', () => {

    it('there should be an RECEIVE_ANIMAL action type', () => {
      expect(RECEIVE_ANIMAL).toEqual(expect.any(String));
    });

    it('should be a function', () => {
      expect(receiveAnimal).toEqual(expect.any(Function));
    });

    it('should return an action of RECEIVE_ANIMAL type', () => {
      const action = receiveAnimal();
      expect(action).toMatchObject({ type: RECEIVE_ANIMAL });      
    });

    it('should have a name of animal to receive', () => {
      const action = receiveAnimal('Savio');
      expect(action).toMatchObject({ name: 'Savio' });
    });
  });

  describe('breakOut action creator', () => {

    it('there should be a BREAK_OUT action type', () => {
      expect(BREAK_OUT).toEqual(expect.any(String));
    });

    it('should be a function', () => {
      expect(breakOut).toEqual(expect.any(Function));
    });

    it('should return an action of BREAK_OUT type', () => {
      const action = breakOut();
      expect(action).toMatchObject({ type: BREAK_OUT });      
    });

    it('should have a name of animal to receive', () => {
      const action = breakOut('Savio');
      expect(action).toMatchObject({ name: 'Savio' });
    });

  });

  describe('animals reducer', () => {

    it('should be a function', () => {
      expect(animals).toEqual(expect.any(Function));
    });

    it('should return [] as initial state', () => {
      const state = animals(undefined, {});
      expect(state).toEqual([]);
    });

    it('should return the same state if no relevant change', () => {
      const previousState = [{ name: 'Savio', present: false }];
      const state = animals(previousState, {});
      expect(state).toBe(previousState);
    });

    describe('receiveAnimal', () => {

      it('should receive an animal', () => {
        const state = animals([], receiveAnimal());
        expect(state).toHaveLength(1);
        expect(state).toMatchObject([{}]);
      });

      it('should set the animal name', () => {
        const state = animals([], receiveAnimal('Savio'));
        expect(state).toMatchObject([{ name: 'Savio' }]);
      });

      it('should set the animal present true', () => {
        const state = animals([], receiveAnimal());
        expect(state).toMatchObject([{ present: true }]);
      });

      it('should return a new state copy and left original unchanged', () => {
        const initial = [];
        animals(initial, receiveAnimal());
        expect(initial).toEqual([]);
      });

      it('should append to the end', () => {
        const lulu = { name: 'Lulu', presnet: true };
        const state = animals([lulu], receiveAnimal('Savio'));
        expect(state).toMatchObject([lulu, { name: 'Savio' }]);
      });

      it('should not modify the instance of other animals', () => {
        const lulu = { name: 'Lulu', presnet: true };
        const state = animals([lulu], receiveAnimal());
        expect(state[0]).toBe(lulu);
      });

      it('should not add the same animal twice', () => {
        const savio = { name: 'Savio', present: true };
        const state = animals([savio], receiveAnimal('Savio'));
        expect(state).toMatchObject([savio]);
      });

      it('should set present true of was false', () => {
        const savio = { name: 'Savio', present: false };
        const state = animals([savio], receiveAnimal('Savio'));
        expect(state).toMatchObject([{ present: true }]);
      });

    });

    describe('receiveAnimal', () => {

      const savio = { name: 'Savio', present: true };
      const lulu = { name: 'Lulu', present: true };

      it('should set present to false', () => {
        
        const state = animals([savio], breakOut('Savio'));
        expect(state).toMatchObject([{ present: false }]);
      });

      it('should return a new state copy and left original unchanged', () => {
        const initial = [];
        animals(initial, breakOut());
        expect(initial).toEqual([]);
      });

      it('should not modify the instance of other animals', () => {
        const state = animals([lulu], breakOut());
        expect(state[0]).toBe(lulu);
      });

      it('should not modify the presence of other animals', () => {
        const state = animals([lulu], breakOut());
        expect(lulu.present).toBe(true);
      });

    });

  });

});
