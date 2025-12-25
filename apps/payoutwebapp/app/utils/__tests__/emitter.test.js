// Utils
import Emitter from '../emitter';

describe('Emitter checks', () => {
  test('Emitter module', () => {
    expect(typeof Emitter.on).toBe('function');
    expect(typeof Emitter.off).toBe('function');
    expect(typeof Emitter.once).toBe('function');
    expect(typeof Emitter.emit).toBe('function');
  });

  test('checks functionality', () => {
    Emitter.on('foo', function handler(arg) {
      expect(arg).toBe('bar');
    });

    Emitter.on('yellow', function handler(cb) {
      cb();
    });

    const callback = jest.fn();

    Emitter.emit('foo', 'bar');
    Emitter.emit('yellow', callback);

    expect(callback).toHaveBeenCalled();

    Emitter.off('yellow');

    Emitter.emit('yellow', callback);
    Emitter.emit('yellow', callback);
    Emitter.emit('yellow', callback);

    expect(callback).toHaveBeenCalledTimes(1);

    Emitter.once('white', function handler(cb) {
      cb();
    });

    const anotherCallback = jest.fn();

    Emitter.emit('white', anotherCallback);
    Emitter.emit('white', anotherCallback);
    Emitter.emit('white', anotherCallback);

    expect(anotherCallback).toHaveBeenCalledTimes(1);
  });
});
