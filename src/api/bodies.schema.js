import { API_CANONN_STEP } from './canonn.js';

/*
	GraphQL query schema for Bodies to grab data from Canonn API

	query { } isited on purpose
*/

export default function bodiesQL(limit = API_CANONN_STEP, start = 0) {

	return `
	{
		bodies(limit: ${limit}, start:${start}) {
			id
			bodyName
			subType
			surfaceTemperature
			volcanismType
			material
		}
	}`;
}
