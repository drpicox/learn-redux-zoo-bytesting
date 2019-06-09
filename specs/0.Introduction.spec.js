import { SET_NAME, setName } from "../src/ducks/name/actions/setName";
import getName from "../src/ducks/name/selectors/getName";
import name from "../src/ducks/name";
import reduceDucks from "../src/ducks";

describe("introduction", () => {
  describe("actions", () => {
    test("export at src/ducks/name/actions/setName.js the named SET_NAME type", () => {
      expect(SET_NAME).toBeDefined();
    });

    test("SET_NAME should be a string", () => {
      expect(SET_NAME).toEqual(expect.any(String));
    });

    test("add export symbol setName action creator", () => {
      expect(setName).toBeDefined();
    });

    test("setName must be a function", () => {
      expect(setName).toEqual(expect.any(Function));
    });

    test("setName is the action creator for SET_NAME", () => {
      const action = setName();
      expect(action).toMatchObject({ type: SET_NAME });
    });

    test("setName action creator should add the name parameter", () => {
      const action = setName("fooname");
      expect(action).toMatchObject({ name: "fooname" });
    });
  });

  describe("name reducer", () => {
    test("export at src/ducks/name/index.js a function reducer", () => {
      expect(name).toEqual(expect.any(Function));
    });

    test('the reducer should have "Hoboken" as initial state', () => {
      const initial = name(undefined, {});
      expect(initial).toBe("Hoboken");
    });

    test("the reducer return current state if no relevant action", () => {
      const state = name("Barcelona", {});
      expect(state).toBe("Barcelona");
    });

    test("reducer should compute a new state if receives a setName action", () => {
      const state = name(undefined, setName("Central Park"));
      expect(state).toBe("Central Park");
    });
  });

  describe("ducks reducer", () => {
    test("ducks reducers at src/ducks/index.js includes the name reducer", () => {
      const state = reduceDucks(undefined, {});
      expect(state).toMatchObject({ name: "Hoboken" });
    });

    test("ducks reducers delegates setName action to the name reducer", () => {
      const state = reduceDucks(undefined, setName("Barcelona"));
      expect(state).toMatchObject({ name: "Barcelona" });
    });
  });

  describe("selectors", () => {
    test("export at src/ducks/name/selectors/getName.js and the getName function selector", () => {
      expect(getName).toEqual(expect.any(Function));
    });

    test("getName selector gets the name from a state created by the ducksReducer", () => {
      const state = reduceDucks(undefined, {});
      const name = getName(state);
      expect(name).toBe("Hoboken");
    });
  });
});
