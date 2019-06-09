import {
  SET_PRESENCE_FILTER,
  setPresenceFilter
} from "../src/ducks/presenceFilter/actions/setPresenceFilter";
import getPresenceFilter from "../src/ducks/presenceFilter/selectors/getPresenceFilter";
import presenceFilter from "../src/ducks/presenceFilter";
import reduceDucks from "../src/ducks";

describe("PresenceFilter", () => {
  describe("actions", () => {
    test("src/ducks/presenceFilter/actions/setPresenceFilter exports a named symbol called SET_PRESENCE_FILTER wich is an action type", () => {
      expect(SET_PRESENCE_FILTER).toEqual(expect.any(String));
    });

    test("src/ducks/presenceFilter/actions/setPresenceFilter exports a named symbol called setPresenceFilter wich is a function", () => {
      expect(SET_PRESENCE_FILTER).toEqual(expect.any(String));
    });

    test("setPresenceFilter is an action creator, it returns an action object of SET_PRESENCE_FILTER type", () => {
      const action = setPresenceFilter();
      expect(action).toMatchObject({ type: SET_PRESENCE_FILTER });
    });

    test("setPresenceFilter receives a parameter which is the filter", () => {
      const action = setPresenceFilter("present");
      expect(action).toMatchObject({ filter: "present" });
    });
  });

  describe("presenceFilter reducer", () => {
    test("export at src/ducks/presenceFilter/index.js the presenceFilter function reducer", () => {
      expect(presenceFilter).toEqual(expect.any(Function));
    });

    test('the presenceFilter initial state should be "all"', () => {
      const state = presenceFilter(undefined, {});
      expect(state).toBe("all");
    });

    test("the reducer does not changes the state if the action is not relevant", () => {
      const previousState = [{ dummy: "state" }];
      const state = presenceFilter(previousState, {});
      expect(state).toBe(previousState);
    });

    test("should return the same state if no relevant action", () => {
      const state = presenceFilter("absent", {});
      expect(state).toBe("absent");
    });

    test("should react to setPresenceFilter action", () => {
      const state = presenceFilter("present", setPresenceFilter("absent"));
      expect(state).toBe("absent");
    });
  });

  describe("ducks reducer", () => {
    test("ducks reducer at src/ducks/index.js includes the presenceFilter reducer", () => {
      const state = reduceDucks(undefined, {});
      expect(state).toMatchObject({ presenceFilter: "all" });
    });

    test("ducks reducers delegates setPresenceFilter action to the presenceFilter reducer", () => {
      const state = reduceDucks(undefined, setPresenceFilter("present"));
      expect(state).toMatchObject({ presenceFilter: "present" });
    });
  });

  describe("selectors", () => {
    test("export at src/ducks/presenceFilter/selectors/getPresenceFilter.js the getPresenceFilter function selector", () => {
      expect(getPresenceFilter).toEqual(expect.any(Function));
    });

    test("getPresenceFilter selector gets the setPresenceFilter from a state created by the ducksReducer", () => {
      const state = reduceDucks(undefined, {});
      const name = getPresenceFilter(state);
      expect(name).toBe("all");
    });
  });
});
