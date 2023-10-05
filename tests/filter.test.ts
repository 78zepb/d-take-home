import { people } from './__data__/people';
import { filterPeople } from '../src/lib/starwars/PeopleHelpers';
import { IFilterCondition } from '../src/interfaces/project';

describe('Filter people', () => {

  test('Returns array', () => {
    const result = filterPeople([]);
    expect(Array.isArray(result)).toBe(true);
  })

  test('Filters by equals op', () => {
    let filters: IFilterCondition[] = [
      {
        propertyName: 'eye_color',
        operator: '=',
        value: 'red'
      }
    ];
    expect(filterPeople(people, filters).length).toBe(2);

    filters = [
      {
        propertyName: 'eye_color',
        operator: '=',
        value: 'blue'
      },
      {
        propertyName: 'hair_color',
        operator: '=',
        value: 'blonde'
      }
    ];
    expect(filterPeople(people, filters).length).toBe(1);

    filters = [
      {
        propertyName: 'eye_color',
        operator: '=',
        value: 'black'
      }
    ];
    expect(filterPeople(people, filters).length).toBe(1);

    filters = [
      {
        propertyName: 'eye_color',
        operator: '=',
        value: 'blue'
      }
    ];
    expect(filterPeople(people, filters).length).toBe(2);

  });

  test('Filter by contains', () => {
    let filters: IFilterCondition[] = [
      {
        propertyName: 'eye_color',
        operator: 'contains',
        value: 'bl'
      }
    ];

    expect(filterPeople(people, filters).length).toBe(3);
  });

  test('Filter by eyes and numbers in name', () => {
    let filters: IFilterCondition[] = [
      {
        propertyName: 'eye_color',
        operator: '=',
        value: 'red'
      },
      {
        propertyName: 'name',
        operator: '@',
        value: 'containsNum'
      }
    ];

    expect(filterPeople(people, filters).length).toBe(2);

    filters = [
      {
        propertyName: 'eye_color',
        operator: '=',
        value: 'black'
      },
      {
        propertyName: 'name',
        operator: '@',
        value: 'containsNum'
      }
    ];

    expect(filterPeople(people, filters).length).toBe(0);
  });


});
