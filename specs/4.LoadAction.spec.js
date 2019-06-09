// import { LOAD_SUCCESS, loadSuccess } from '../src/actions';
// import zoo, { name, animals } from '../src/reducers';

xdescribe("LoadAction", () => {
  describe("loadSuccess action creator", () => {
    it("should exists a LOAD_SUCCESS action type", () => {
      expect(LOAD_SUCCESS).toEqual(expect.any(String));
    });

    it("should be a function", () => {
      expect(loadSuccess).toEqual(expect.any(Function));
    });

    it("should create an action of type LOAD_SUCCESS", () => {
      const action = loadSuccess();
      expect(action).toMatchObject({ type: LOAD_SUCCESS });
    });

    it("should accept a payload", () => {
      const payload = { bar: "foo" };
      const action = loadSuccess(payload);
      expect(action).toMatchObject({ payload });
    });
  });

  describe("zoo reducer", () => {
    const payload = {
      name: "Barcelona",
      animals: [
        {
          name: "Floquet",
          present: true
        }
      ]
    };

    it("name reducer should set the name of the zoo", () => {
      const state = name(undefined, loadSuccess(payload));
      expect(state).toBe("Barcelona");
    });

    it("animals reducer should replace the animals", () => {
      const state = animals([], loadSuccess(payload));
      expect(state).toBe(payload.animals);
    });

    it("combined state should match payload", () => {
      const state = zoo(undefined, loadSuccess(payload));
      expect(state).toMatchObject(payload);
    });
  });
});
