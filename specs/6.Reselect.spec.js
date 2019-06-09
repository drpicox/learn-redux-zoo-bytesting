import { receiveAnimal } from "../src/ducks/animals/actions/receiveAnimal";
import { breakOut } from "../src/ducks/animals/actions/breakOut";
import { setName } from "../src/ducks/name/actions/setName";
import { setPresenceFilter } from "../src/ducks/presenceFilter/actions/setPresenceFilter";
import countPresentAnimals from "../src/ducks/animals/selectors/countPresentAnimals";
import makeCountAbsentAnimals from "../src/ducks/animals/selectors/makeCountAbsentAnimals";
import makeGetAnimalsName from "../src/ducks/animals/selectors/makeGetAnimalsName";
import makeGetFilteredAnimalsName from "../src/ducks/animals/selectors/makeGetFilteredAnimalsName";
import makeIsAbsent from "../src/ducks/animals/selectors/makeIsAbsent";
import reduceDucks from "../src/ducks";

// https://github.com/reduxjs/reselect#createselectorinputselectors--inputselectors-resultfunc

describe("Reselect is used to create new selectors", () => {
  describe("the slow countPresentAnimals selector", () => {
    test("export at src/ducks/animals/selector/countPresentAnimals a function selector", () => {
      expect(countPresentAnimals).toEqual(expect.any(Function));
    });

    test("the countPresentAnimals returns 0 if there are no present animals", () => {
      const state = reduceDucks(undefined, {});
      const count = countPresentAnimals(state);
      expect(count).toBe(0);
    });

    test(`there are some selectors that compute data, like countPresentAnimals,
          that do complex computations over large sets of data, objects or arrays.
          In this case, countPresentAnimals count how many animals there are in the state`, () => {
      const state0 = undefined;
      const state1 = reduceDucks(state0, receiveAnimal("Savio"));
      const state2 = reduceDucks(state1, receiveAnimal("Lulu"));
      const count = countPresentAnimals(state2);
      expect(count).toBe(2);
    });

    test("note that the computation is of a given state, not necessarily the last state", () => {
      const state0 = undefined;
      const state1 = reduceDucks(state0, receiveAnimal("Savio"));
      const state2 = reduceDucks(state1, receiveAnimal("Lulu"));
      const state3 = reduceDucks(state2, receiveAnimal("Dave"));
      const count1 = countPresentAnimals(state1);
      const count2 = countPresentAnimals(state2);
      const count3 = countPresentAnimals(state3);
      expect(count1).toBe(1);
      expect(count2).toBe(2);
      expect(count3).toBe(3);
    });

    test("when an animal escapes, it decreases the count", () => {
      const state0 = undefined;
      const state1 = reduceDucks(state0, receiveAnimal("Savio"));
      const state2 = reduceDucks(state1, receiveAnimal("Lulu"));
      const state3 = reduceDucks(state2, breakOut("Savio"));
      const count = countPresentAnimals(state3);
      expect(count).toBe(1);
    });
  });

  describe("makeCountAbsentAnimals, countAbsentAnimals with reselect", () => {
    test("export at src/ducks/animals/selector/makeCountAbsentAnimals a function selector creator", () => {
      expect(makeCountAbsentAnimals).toEqual(expect.any(Function));
    });

    test("the makeCountAbsentAnimals selector function creator returns the countAbsentAnimals selector when it is called", () => {
      const countAbsentAnimals = makeCountAbsentAnimals();
      expect(countAbsentAnimals).toEqual(expect.any(Function));
    });

    test("the countAbsentAnimals returns 0 if there are no present animals", () => {
      const countAbsentAnimals = makeCountAbsentAnimals();
      const state = reduceDucks(undefined, {});
      const count = countAbsentAnimals(state);
      expect(count).toBe(0);
    });

    test("the countAbsentAnimals returns 0 if all animals are present", () => {
      const countAbsentAnimals = makeCountAbsentAnimals();
      const state0 = undefined;
      const state1 = reduceDucks(state0, receiveAnimal("Savio"));
      const state2 = reduceDucks(state1, receiveAnimal("Lulu"));
      const state3 = reduceDucks(state2, receiveAnimal("Dave"));
      const count = countAbsentAnimals(state3);
      expect(count).toBe(0);
    });

    test("the countAbsentAnimals returns more than 0 when an animal has escaped", () => {
      const countAbsentAnimals = makeCountAbsentAnimals();
      const state0 = undefined;
      const state1 = reduceDucks(state0, receiveAnimal("Savio"));
      const state2 = reduceDucks(state1, breakOut("Savio"));
      const count = countAbsentAnimals(state2);
      expect(count).toBe(1);
    });

    test(`because this computation functions are slow to compute, we must use 
          the { createSelector } from the "reselect" library to create a selector.
          Create selector creates a function that receives a state and returns a result.
          As parameter it receives selectors and a function that computes the value.
          The function that computes the value is called with the result of the previous
          selectors. When it is called twice with the same state, it computes
          the result once.`, () => {
      const countAbsentAnimals = makeCountAbsentAnimals();
      const state = reduceDucks(undefined, {});
      countAbsentAnimals(state);
      countAbsentAnimals(state);
      expect(countAbsentAnimals.recomputations()).toBe(1);
    });

    test("if the state changes, it recomputes again the result", () => {
      const countAbsentAnimals = makeCountAbsentAnimals();
      const state0 = undefined;
      const state1 = reduceDucks(state0, receiveAnimal("Savio"));
      const state2 = reduceDucks(state1, receiveAnimal("Lulu"));
      countAbsentAnimals(state1);
      countAbsentAnimals(state2);
      expect(countAbsentAnimals.recomputations()).toBe(2);
    });

    test(`the first parameter of the createSelector is the getAnimals selector function, 
          so the computation function only receives animals instead of the whole state,
          and createSelector knows that only animals is involved in the state, and
          it does not recomputes the state although other parts of the state can change`, () => {
      const countAbsentAnimals = makeCountAbsentAnimals();
      const state0 = undefined;
      const state1 = reduceDucks(state0, receiveAnimal("Savio"));
      const state2 = reduceDucks(state1, setName("Barcelona"));
      countAbsentAnimals(state1);
      countAbsentAnimals(state2);
      expect(countAbsentAnimals.recomputations()).toBe(1);
    });
  });

  describe("makeGetAnimalsName, getAnimalsName with reselect", () => {
    test("export at src/ducks/animals/selector/makeGetAnimalsName a function selector creator", () => {
      expect(makeGetAnimalsName).toEqual(expect.any(Function));
    });

    test("the makeGetAnimalsName selector function creator returns the getAnimalsName selector when it is called", () => {
      const getAnimalsName = makeGetAnimalsName();
      expect(getAnimalsName).toEqual(expect.any(Function));
    });

    test("the getAnimalsName returns an empty array if there are no present animals", () => {
      const getAnimalsName = makeGetAnimalsName();
      const state = reduceDucks(undefined, {});
      const count = getAnimalsName(state);
      expect(count).toEqual([]);
    });

    test("the getAnimalsName returns an array of the all animals", () => {
      const getAnimalsName = makeGetAnimalsName();
      const state0 = undefined;
      const state1 = reduceDucks(state0, receiveAnimal("Savio"));
      const state2 = reduceDucks(state1, receiveAnimal("Lulu"));
      const state3 = reduceDucks(state2, receiveAnimal("Dave"));
      const count = getAnimalsName(state3);
      expect(count).toEqual(["Savio", "Lulu", "Dave"]);
    });

    test("the getAnimalsName is not affected by escaped animals", () => {
      const getAnimalsName = makeGetAnimalsName();
      const state0 = undefined;
      const state1 = reduceDucks(state0, receiveAnimal("Savio"));
      const state2 = reduceDucks(state1, breakOut("Savio"));
      const count = getAnimalsName(state2);
      expect(count).toEqual(["Savio"]);
    });

    test('It uses { createSelector } from the "reselect" to return always the same instance of the array', () => {
      const getAnimalsName = makeGetAnimalsName();
      const state = reduceDucks(undefined, receiveAnimal("Savio"));
      const result1 = getAnimalsName(state);
      const result2 = getAnimalsName(state);
      expect(result1).toBe(result2);
    });

    test("if the state changes, it recomputes again the result", () => {
      const getAnimalsName = makeGetAnimalsName();
      const state0 = undefined;
      const state1 = reduceDucks(state0, receiveAnimal("Savio"));
      const state2 = reduceDucks(state1, receiveAnimal("Lulu"));
      const result1 = getAnimalsName(state1);
      const result2 = getAnimalsName(state2);
      expect(result1).not.toBe(result2);
    });

    test(`the first parameter of the createSelector is the getAnimals selector function, 
          so the computation function only receives animals instead of the whole state,
          and createSelector knows that only animals is involved in the state, and
          it does not recomputes the state although other parts of the state can change`, () => {
      const getAnimalsName = makeGetAnimalsName();
      const state0 = undefined;
      const state1 = reduceDucks(state0, receiveAnimal("Savio"));
      const state2 = reduceDucks(state1, setName("Barcelona"));
      const result1 = getAnimalsName(state1);
      const result2 = getAnimalsName(state2);
      expect(result1).toBe(result2);
    });
  });

  describe("makeGetFilteredAnimalsName, getFilteredAnimalsName with reselect", () => {
    test("export at src/ducks/animals/selector/makeGetFilteredAnimalsName a function selector creator", () => {
      expect(makeGetFilteredAnimalsName).toEqual(expect.any(Function));
    });

    test("the makeGetFilteredAnimalsName selector function creator returns the getFilteredAnimalsName selector when it is called", () => {
      const getFilteredAnimalsName = makeGetFilteredAnimalsName();
      expect(getFilteredAnimalsName).toEqual(expect.any(Function));
    });

    test("the getFilteredAnimalsName returns an empty array if there are no present animals", () => {
      const getFilteredAnimalsName = makeGetFilteredAnimalsName();
      const state = reduceDucks(undefined, {});
      const count = getFilteredAnimalsName(state);
      expect(count).toEqual([]);
    });

    test("the getFilteredAnimalsName returns an array of the all animals", () => {
      const getFilteredAnimalsName = makeGetFilteredAnimalsName();
      const state0 = undefined;
      const state1 = reduceDucks(state0, receiveAnimal("Savio"));
      const state2 = reduceDucks(state1, receiveAnimal("Lulu"));
      const state3 = reduceDucks(state2, breakOut("Savio"));
      const count = getFilteredAnimalsName(state3);
      expect(count).toEqual(["Savio", "Lulu"]);
    });

    test("the getFilteredAnimalsName returns only present animals if presenceFilter is 'present'", () => {
      const getFilteredAnimalsName = makeGetFilteredAnimalsName();
      const state0 = undefined;
      const state1 = reduceDucks(state0, receiveAnimal("Savio"));
      const state2 = reduceDucks(state1, receiveAnimal("Lulu"));
      const state3 = reduceDucks(state2, breakOut("Savio"));
      const state4 = reduceDucks(state3, setPresenceFilter("present"));
      const count = getFilteredAnimalsName(state4);
      expect(count).toEqual(["Lulu"]);
    });

    test("the getFilteredAnimalsName returns only absent animals if presenceFilter is 'absent'", () => {
      const getFilteredAnimalsName = makeGetFilteredAnimalsName();
      const state0 = undefined;
      const state1 = reduceDucks(state0, receiveAnimal("Savio"));
      const state2 = reduceDucks(state1, receiveAnimal("Lulu"));
      const state3 = reduceDucks(state2, breakOut("Savio"));
      const state4 = reduceDucks(state3, setPresenceFilter("absent"));
      const count = getFilteredAnimalsName(state4);
      expect(count).toEqual(["Savio"]);
    });

    test('It uses { createSelector } from the "reselect" to return always the same instance of the array', () => {
      const getFilteredAnimalsName = makeGetFilteredAnimalsName();
      const state = reduceDucks(undefined, receiveAnimal("Savio"));
      const result1 = getFilteredAnimalsName(state);
      const result2 = getFilteredAnimalsName(state);
      expect(result1).toBe(result2);
    });

    test("if the state changes, it recomputes again the result", () => {
      const getFilteredAnimalsName = makeGetFilteredAnimalsName();
      const state0 = undefined;
      const state1 = reduceDucks(state0, receiveAnimal("Savio"));
      const state2 = reduceDucks(state1, receiveAnimal("Lulu"));
      const result1 = getFilteredAnimalsName(state1);
      const result2 = getFilteredAnimalsName(state2);
      expect(result1).not.toBe(result2);
    });

    test(`the first parameter of the createSelector is the getAnimals selector function, 
          the second parameter of the createSelector is the getPresenceFilter selector function, 
          so the computation function only receives animals and the presence filter
          instead of the whole state,
          and createSelector knows that only animals is involved in the state, and
          it does not recomputes the state although other parts of the state can change`, () => {
      const getFilteredAnimalsName = makeGetFilteredAnimalsName();
      const state0 = undefined;
      const state1 = reduceDucks(state0, receiveAnimal("Savio"));
      const state2 = reduceDucks(state1, setName("Barcelona"));
      const result1 = getFilteredAnimalsName(state1);
      const result2 = getFilteredAnimalsName(state2);
      expect(result1).toBe(result2);
    });
  });

  describe("makeIsAbsent, isAbsent with reselect", () => {
    test("export at src/ducks/animals/selector/makeIsAbsent a function selector creator", () => {
      expect(makeIsAbsent).toEqual(expect.any(Function));
    });

    test("the makeIsAbsent selector function creator returns the isAbsent selector when it is called", () => {
      const isAbsent = makeIsAbsent();
      expect(isAbsent).toEqual(expect.any(Function));
    });

    test("the isAbsent returns false if the animal with the name is not in the zoo", () => {
      const isAbsent = makeIsAbsent();
      const state = reduceDucks(undefined, {});
      const count = isAbsent(state, { name: "Savio" });
      expect(count).toBe(false);
    });

    test("the isAbsent returns true if the animal is present", () => {
      const isAbsent = makeIsAbsent();
      const state = reduceDucks(undefined, receiveAnimal("Savio"));
      const count = isAbsent(state, { name: "Savio" });
      expect(count).toBe(true);
    });

    test("the isAbsent returns false if the animal has escaped", () => {
      const isAbsent = makeIsAbsent();
      const state0 = undefined;
      const state1 = reduceDucks(state0, receiveAnimal("Savio"));
      const state2 = reduceDucks(state1, breakOut("Savio"));
      const count = isAbsent(state2, { name: "Savio" });
      expect(count).toBe(false);
    });

    test(`because this computation functions are slow to compute, use 
          the { createSelector } from the "reselect" library to create a selector.
          the first parameter of the createSelector is the getAnimals selector function, 
          the second parameter of the createSelector is a function that returns the name of the second parameter of the selector getPropName = (state, { name }) => name
          so the computation function only receives animals and the name filter
          instead of the whole state,
          and createSelector knows that only animals is involved in the state, and
          it does not recomputes the state although other parts of the state can change
    `, () => {
      const isAbsent = makeIsAbsent();
      const state = reduceDucks(undefined, {});
      isAbsent(state, { name: "Savio" });
      isAbsent(state, { name: "Savio" });
      expect(isAbsent.recomputations()).toBe(1);
    });

    test(`if the second argument name changes, it recomputes again the result`, () => {
      const isAbsent = makeIsAbsent();
      const state = reduceDucks(undefined, {});
      isAbsent(state, { name: "Savio" });
      isAbsent(state, { name: "Lulu" });
      expect(isAbsent.recomputations()).toBe(2);
    });

    test("if the state changes, it recomputes again the result", () => {
      const isAbsent = makeIsAbsent();
      const state0 = undefined;
      const state1 = reduceDucks(state0, receiveAnimal("Savio"));
      const state2 = reduceDucks(state1, receiveAnimal("Lulu"));
      isAbsent(state1, { name: "Savio" });
      isAbsent(state2, { name: "Savio" });
      expect(isAbsent.recomputations()).toBe(2);
    });

    test(`the first parameter of the createSelector is the getAnimals selector function, 
          so the computation function only receives animals instead of the whole state,
          and createSelector knows that only animals is involved in the state, and
          it does not recomputes the state although other parts of the state can change`, () => {
      const isAbsent = makeIsAbsent();
      const state0 = undefined;
      const state1 = reduceDucks(state0, receiveAnimal("Savio"));
      const state2 = reduceDucks(state1, setName("Barcelona"));
      isAbsent(state1, { name: "Savio" });
      isAbsent(state2, { name: "Savio" });
      expect(isAbsent.recomputations()).toBe(1);
    });
  });
});
