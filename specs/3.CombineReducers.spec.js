// import zoo from '../src/reducers';

xdescribe("CombineReducers", () => {
  it("all reducers should be combined into one single function", () => {
    expect(zoo).toEqual(expect.any(Function));
  });

  it("should combine name", () => {
    expect(zoo(undefined, {})).toMatchObject({ name: "Hoboken" });
  });

  it("should combine presenceFilter", () => {
    expect(zoo(undefined, {})).toMatchObject({ presenceFilter: "all" });
  });

  it("should combine animals", () => {
    expect(zoo(undefined, {})).toMatchObject({ animals: [] });
  });
});
