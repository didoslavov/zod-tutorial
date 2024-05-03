// CODE

import { expect, it } from 'vitest';
import { z } from 'zod';

const StarWarsPerson = z.object({
    name: z.string(),
    nameAsArray: z.array(z.string()).optional(),
});
//^ 🕵️‍♂️

const StarWarsPeopleResults = z.object({
    results: z.array(StarWarsPerson),
});

export const fetchStarWarsPeople = async () => {
    const data = await fetch('https://www.totaltypescript.com/swapi/people.json').then((res) => res.json());

    const parsedData = StarWarsPeopleResults.parse(data);

    return parsedData.results.map((p) => ({ ...p, nameAsArray: p.name.split(' ') }));
};

// TESTS

it('Should resolve the name and nameAsArray', async () => {
    expect((await fetchStarWarsPeople())[0]).toEqual({
        name: 'Luke Skywalker',
        nameAsArray: ['Luke', 'Skywalker'],
    });
});
