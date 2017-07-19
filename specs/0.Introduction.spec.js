import { SET_NAME, setName } from '../src/actions';
import { name } from '../src/reducers';

describe('introduction', () => {

  it('create src/actions/index.js and export SET_NAME', () => {
    expect(SET_NAME).toBeDefined();
  });

  it('SET_NAME should be a string', () => {
    expect(SET_NAME).toEqual(expect.any(String));
  });

  it('add setName action builder', () => {
    expect(setName).toBeDefined();
  });

  it('setName is the action builder for SET_NAME', () => {
    const action = setName();
    expect(action).toMatchObject({ type: SET_NAME });
  });

  it('setName action builder should add a name parameter', () => {
    const action = setName('fooname');
    expect(action).toMatchObject({ name: 'fooname' });
  });

  it('create src/reducers/index.js and export name reducer', () => {
    expect(name).toBeDefined();
  });

  it('the reducer should have "Hoboken" as initial state', () => {
    const initial = name(undefined, {});
    expect(initial).toBe('Hoboken');
  });

  it('the reducer return current state if no relevant action', () => {
    const state = name('Barcelona', {});
    expect(state).toBe('Barcelona');
  });

  it('reducer should compute a new state if receives a setName action', () => {
    const state = name(undefined, setName('Central Park'));
    expect(state).toBe('Central Park');
  });

});
