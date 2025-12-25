// Adapters
import fundSources from '../fundSources';

const { from } = fundSources;

describe('fundSources adapters', () => {
  test('should handle empty preferences array', () => {
    expect(
      from([
        {
          id: 1,
          name: 'Fund Source 1',
          preferences: [],
        },
      ]),
    ).toEqual([
      {
        id: 1,
        name: 'Fund Source 1',
        preferences: {},
      },
    ]);
  });

  test('should handle empty response array', () => {
    expect(from([])).toEqual([]);
  });

  test('should handle missing preferences property', () => {
    expect(
      from([
        {
          id: 1,
          name: 'Fund Source 1',
        },
      ]),
    ).toEqual([
      {
        id: 1,
        name: 'Fund Source 1',
        preferences: {},
      },
    ]);
  });
});
