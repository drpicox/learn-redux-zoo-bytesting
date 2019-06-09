// import * as actions from '../src/actions';

xdescribe("ActionPackages", () => {
  TYPES.forEach((TYPE, i) => {
    describe(TYPE, () => {
      it('should prepend "zoo/" as package name', () => {
        expect(actions[TYPE]).toMatch(/^zoo\//);
      });

      TYPES.slice(i + 1).forEach(OTHER_TYPE => {
        it(`should different of ${OTHER_TYPE}`, () => {
          expect(actions[TYPE]).not.toEqual(actions[OTHER_TYPE]);
        });
      });
    });
  });
});
