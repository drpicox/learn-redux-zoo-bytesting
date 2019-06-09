import {
  RECEIVE_ANIMAL,
  receiveAnimal
} from "../src/ducks/animals/actions/receiveAnimal";
import { BREAK_OUT, breakOut } from "../src/ducks/animals/actions/breakOut";
import animals from "../src/ducks/animals";
import getAnimals from "../src/ducks/animals/selectors/getAnimals";
import isPresent from "../src/ducks/animals/selectors/isPresent";
import reduceDucks from "../src/ducks";

describe("Animals", () => {
  describe("actions", () => {
    describe("receiveAnimal action creator", () => {
      test("export at src/ducks/animals/actions/receiveAnimal the RECEIVE_ANIMAL action type", () => {
        expect(RECEIVE_ANIMAL).toEqual(expect.any(String));
      });

      test("export at src/ducks/animals/actions/receiveAnimal a receiveAnimal function", () => {
        expect(receiveAnimal).toEqual(expect.any(Function));
      });

      test("the receiveAnimal is an action creator of RECEIVE_ANIMAL", () => {
        const action = receiveAnimal();
        expect(action).toMatchObject({ type: RECEIVE_ANIMAL });
      });

      test("the receiveAnimal action creator adds the name parameter", () => {
        const action = receiveAnimal("Savio");
        expect(action).toMatchObject({ name: "Savio" });
      });
    });

    describe("breakOut action creator", () => {
      test("export at src/ducks/animals/actions/breakOut the BREAK_OUT action type", () => {
        expect(BREAK_OUT).toEqual(expect.any(String));
      });

      test("export at src/ducks/animals/actions/breakOut the breakOut function", () => {
        expect(breakOut).toEqual(expect.any(Function));
      });

      test("the breakOut function is an action creator of BREAK_OUT type", () => {
        const action = breakOut();
        expect(action).toMatchObject({ type: BREAK_OUT });
      });

      test("the breakOut action creator adds the name parameter", () => {
        const action = breakOut("Savio");
        expect(action).toMatchObject({ name: "Savio" });
      });
    });
  });

  describe("animals reducer", () => {
    test("export at src/ducks/animals/index.js a function reducer", () => {
      expect(animals).toEqual(expect.any(Function));
    });

    test("the reducer returns [] as initial state", () => {
      const state = animals(undefined, {});
      expect(state).toEqual([]);
    });

    test("the reducer does not changes the state if the action is not relevant", () => {
      const previousState = [{ name: "Savio", present: false }];
      const state = animals(previousState, {});
      expect(state).toBe(previousState);
    });

    describe("when receives a receiveAnimal action", () => {
      test("the reducer adds one object to the array state", () => {
        const state = animals([], receiveAnimal());
        expect(state).toHaveLength(1);
        expect(state).toMatchObject([{}]);
      });

      test("the returned state instance is a copy from the previous one", () => {
        const initialState = animals(undefined, {});
        const state = animals([], receiveAnimal());
        expect(state).not.toBe(initialState);
      });

      test("and the initialstate should remain unchanged", () => {
        const initialState = animals(undefined, {});
        animals([], receiveAnimal());
        expect(initialState).toEqual([]);
      });

      test("the added object of the array state should have the name of the received animal", () => {
        const state = animals([], receiveAnimal("Savio"));
        expect(state).toMatchObject([{ name: "Savio" }]);
      });

      test("the added object of the array state should say that the animal is present", () => {
        const state = animals([], receiveAnimal());
        expect(state).toMatchObject([{ present: true }]);
      });

      test("if there is already an object in the state it should add the new animal at the end of the array", () => {
        const lulu = { name: "Lulu", present: true };
        const state = animals([lulu], receiveAnimal("Savio"));
        expect(state).toMatchObject([lulu, { name: "Savio" }]);
      });

      test("if the animal was already in the state and present it does not modifies the state", () => {
        const savio = { name: "Savio", present: true };
        const state = animals([savio], receiveAnimal("Savio"));
        expect(state).toMatchObject([savio]);
      });

      test("if the animal was already in the state, but was not present, it changes the present to true", () => {
        const savio = { name: "Savio", present: false };
        const state = animals([savio], receiveAnimal("Savio"));
        expect(state).toMatchObject([{ present: true }]);
      });

      test("the object instance inside the state should not be modified, it should be copied", () => {
        const savio = { name: "Savio", present: false };
        const state = animals([savio], receiveAnimal("Savio"));
        expect(state[0]).not.toBe(savio);
      });

      test("if changing an animal to present the state array must be also copied and the previous one remain unchanged", () => {
        const savio = { name: "Savio", present: false };
        const initialState = [savio];
        const state = animals(initialState, receiveAnimal("Savio"));
        expect(state).not.toBe(initialState);
        expect(initialState).toEqual([savio]);
      });
    });

    describe("when it receives a breakOut action", () => {
      test("the reducer creates a copy of the state in which the selected animal has present to false", () => {
        const initialState = animals(undefined, receiveAnimal("Savio"));
        const state = animals(initialState, breakOut("Savio"));
        expect(state).toMatchObject([{ name: "Savio", present: false }]);
      });

      test("the reducer returns a new instance", () => {
        const initialState = animals(undefined, receiveAnimal("Savio"));
        const state = animals(initialState, breakOut("Savio"));
        expect(state).not.toBe(initialState);
      });

      test("the reducer does not modifiy the initialState contents", () => {
        const initialState = animals(undefined, receiveAnimal("Savio"));
        const initialStateCopy = animals(undefined, receiveAnimal("Savio"));
        animals(initialState, breakOut("Savio"));
        expect(initialState).toEqual(initialStateCopy);
      });

      test("the reducer does nothing if the animal is not present", () => {
        const initialState = animals(undefined, receiveAnimal("Savio"));
        const state = animals(initialState, breakOut("Lulu"));
        expect(state).toEqual(initialState);
      });

      test("the reducer does not modify the order of the animals in the state", () => {
        const state0 = undefined;
        const state1 = animals(state0, receiveAnimal("Savio"));
        const state2 = animals(state1, receiveAnimal("Lulu"));
        const state3 = animals(state2, receiveAnimal("Dave"));
        const state = animals(state3, breakOut("Lulu"));
        expect(state[0]).toBe(state1[0]);
        expect(state[0]).toMatchObject({ name: "Savio", present: true });
        expect(state[1]).toMatchObject({ name: "Lulu", present: false });
        expect(state[2]).toMatchObject({ name: "Dave", present: true });
        expect(state[2]).toBe(state3[2]);
      });
    });
  });

  describe("ducks reducer", () => {
    test("ducks reducers at src/ducks/index.js includes the animals reducer", () => {
      const state = reduceDucks(undefined, {});
      expect(state).toMatchObject({ animals: [] });
    });

    test("ducks reducers delegates receiveAnimal action to the animals reducer", () => {
      const state = reduceDucks(undefined, receiveAnimal("Savio"));
      expect(state).toMatchObject({
        animals: [{ name: "Savio", present: true }]
      });
    });

    test("ducks reducers delegates breakOut action to the animals reducer", () => {
      const state0 = reduceDucks(undefined, receiveAnimal("Savio"));
      const state = reduceDucks(state0, breakOut("Savio"));
      expect(state).toMatchObject({
        animals: [{ name: "Savio", present: false }]
      });
    });
  });

  describe("selectors", () => {
    describe("getAnimals function selector", () => {
      test("export at src/ducks/animals/selectors/getAnimals.js and the getAnimals function selector", () => {
        expect(getAnimals).toEqual(expect.any(Function));
      });

      test("getAnimals selector gets the animals state —exact same instance— from a state created by the ducksReducer", () => {
        const state = reduceDucks(undefined, {});
        const gettedAnimals = getAnimals(state);
        expect(gettedAnimals).toBe(state.animals);
      });
    });

    describe("isPresent function selector", () => {
      test("export at src/ducks/animals/selectors/isPresent.js and the isPresent function selector", () => {
        expect(isPresent).toEqual(expect.any(Function));
      });

      test("isPresent selector returns true if the animal with name of the object parameter is present", () => {
        const state = reduceDucks(undefined, receiveAnimal("Savio"));
        const present = isPresent(state, { name: "Savio" });
        expect(present).toBe(true);
      });

      test("isPresent selector returns false if the animal with name of the object parameter is escaped", () => {
        const state0 = undefined;
        const state1 = reduceDucks(state0, receiveAnimal("Savio"));
        const state2 = reduceDucks(state1, breakOut("Savio"));
        const present = isPresent(state2, { name: "Savio" });
        expect(present).toBe(false);
      });

      test("isPresent selector returns false if the animal with name of the object parameter was never received", () => {
        const state = reduceDucks(undefined, {});
        const present = isPresent(state, { name: "Rico" });
        expect(present).toBe(false);
      });
    });
  });
});
