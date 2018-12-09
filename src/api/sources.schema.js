import { API_CANONN_STEP } from './canonn.js';

/*
	GraphQL query schema for every Canonn planetary object used in comparison.

	FAST PROTOTYPING AND DATA CHECKING

	query { } skipped on purpose

	
	FIELDS EXPLANATION:

	name
		Name of the site type (ex. 'Thargoid Sites', 'Guardian Ruins' etc)

	qlNode 
		The graphQL node the sites are located in, ex:
			Thargoid Sites => tssites
			Guardian Ruins => grsites
			Fumaroles => fmsites
			etc... (check Canonn API schema)

	typeNode
		If the site has some kind of type, you need to supply the graphQL node
		for where to look for the type. For example:

		For Guardian Ruins:
			Alpha, Beta, Gamma is stored in

			Stored in API as:
			type {
				type
			}

			So typeNode => type

		For Thargoid Sites:
			Active, Inactive

			Stored in API as:
			status {
				status
			}

			So typeNode => status

		Etc...

		NOTE: 
			typeNode of the parent and the child needs to be the same.
			Also, will only work on a structure like this:

			typeNode {
				typeNode
			}

	query
		This is the graphQL query used to get data from API.

		body {
			id
		}

		is REQUIRED for each site type.
		The rest is optional.


*/

export const sources = [

	{
		name: 'Thargoid Sites [tssites]',
		qlNode: 'tssites',
		typeNode: 'status',
		query: (limit = API_CANONN_STEP, start = 0) => {

			return `
			{
				tssites(limit: ${limit}, start:${start}) {
					latitude
					longitude
					body {
						id
					}
					status {
						status
					}
				}
			}`;

		}
	},
	{
		name: 'Guardian Ruin Sites [grsites]',
		qlNode: 'grsites',
		typeNode: 'type',
		query: (limit = API_CANONN_STEP, start = 0) => {

			return `
			{
				grsites(limit: ${limit}, start:${start}) {
					latitude
					longitude
					body {
						id
					}
					type {
						type
					}
				}
			}`;
		}
	},

	{
		name: 'Thargoid Barnacle Sites [tbsites]',
		qlNode: 'tbsites',
		typeNode: 'type',
		query: (limit = API_CANONN_STEP, start = 0) => {

			return `
			{
				tbsites(limit: ${limit}, start:${start}) {
					latitude
					longitude
					body {
						id
					}
					type {
						type
					}
				}
			}`;
		}
	},

	/*{
		name: 'BT? [btsites]',
		qlNode: 'btsites',
		typeNode: null,
		query: (limit = API_CANONN_STEP, start = 0) => {

			return `
			{
				btsites(limit: ${limit}, start:${start}) {
					latitude
					longitude
					body {
						id
					}
				}
			}`;
		}
	}*/

]
