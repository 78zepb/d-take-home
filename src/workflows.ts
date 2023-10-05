import * as workflow from '@temporalio/workflow';
// Only import the activity types
import type * as activities from './activities';
import {
  filterPeople,
  peopleToString,
  parsePeopleFilter
} from './lib/starwars/PeopleHelpers';

const { greet, getStarWarsPeople } = workflow.proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
});

/** A workflow that simply calls an activity */
export async function example(name: string): Promise<string> {
  return await greet(name);
}

export async function showStarWars(filters: string): Promise<string> {
  let people = await getStarWarsPeople();
  people = filterPeople(people, parsePeopleFilter(filters));
  return peopleToString(people);
}
