import { IStarWarsPerson, IFilterCondition, FilterConditionOperator } from "../../interfaces/project";

const EQUALS: FilterConditionOperator = '=';
const CONTAINS: FilterConditionOperator = 'contains';
const SPECIAL_FILTER: FilterConditionOperator = '@'

const SPECIAL_FILTER_TYPES = ['containsNum'];

const OPS = [EQUALS, CONTAINS, SPECIAL_FILTER] as const;
type OPS = (typeof OPS)[number];
const isOp = (x: any): x is OPS => OPS.includes(x);

export function filterPeople(people: IStarWarsPerson[], filters: IFilterCondition[] = []) {
  return people.filter((person) => shouldKeepPerson(filters, person));
}

function shouldKeepPerson(filters: IFilterCondition[], person: IStarWarsPerson): boolean {
  const KEEP_PERSON = true;
  const REMOVE_PERSON = false;
  const shouldKeepCount = [];

    for (let index = 0; index < filters.length; index++) {
      const filter = filters[index];
      const name = filter.propertyName;
      const op = filter.operator;
      const value = filter.value;

      if (!person.hasOwnProperty(name)) {
        return KEEP_PERSON;
      }

      if (!isOp(op)) {
        return KEEP_PERSON;
      }

      const actualValue = person[name as keyof IStarWarsPerson];

      const conditionResult = isValidCondition(actualValue, op, value);

      if (conditionResult) {
        shouldKeepCount.push(true);
      }
    }

    return shouldKeepCount.length === filters.length ? KEEP_PERSON : REMOVE_PERSON;
}

function isValidCondition(actualValue: any, op: FilterConditionOperator, value: any): boolean {
  switch (op) {
    case EQUALS:
      return actualValue === value;
    case CONTAINS:
      return actualValue.includes(value);
    case SPECIAL_FILTER:
      return runSpecialCondition(actualValue, value);

    default:
      return false;
  }
}

function runSpecialCondition(actualValue: any, value: any): boolean {
  if (!SPECIAL_FILTER_TYPES.includes(value)) {
    return false;
  }

  if (value === 'containsNum') {
    return runSpecialConditionContainsNum(actualValue);
  }

  return false;
}

function runSpecialConditionContainsNum(actualValue: any): boolean {
  if (typeof actualValue === 'number') {
    return true
  } else if (typeof actualValue === 'string') {
    return actualValue.match(/\d+/g) !== null;
  } else {
    return false;
  }
}

export function peopleToString(people: IStarWarsPerson[]): string {
  return people.reduce((accum, person) => {
    accum += ` ${person.name} (${person.eye_color})`;
    return accum;
  }, '');
}

export function parsePeopleFilter(stringFilter: string): IFilterCondition[] {
  try {
    return JSON.parse(stringFilter);
  } catch (error) {
    console.error('Error parsing people filter');
    return [];
  }
}
