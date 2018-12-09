/*

Canonn API example for graphQL

*/

import bodiesQL from './bodies.schema.js';
import { sources } from './sources.schema.js';

export const API_CANONN_GRAPHQL = 'https://api.canonn.fyi/graphql';
export const API_CANONN_STEP = 1000;

var pullData = {};

function fetchQLData(resolve, reject, counter = 0, query, qlNode) {

	const step = API_CANONN_STEP;

	fetch(API_CANONN_GRAPHQL, {
		
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			query: query(step, counter)
		})

	}).then( r => r.json() ).then( r => { 
	
		pullData[qlNode].push( ...r.data[qlNode] );

		if(r.data[qlNode].length == step) {
			fetchQLData(resolve, reject, counter+step, query, qlNode);
		} else {
			resolve({ [qlNode]: pullData[qlNode] });
		}
	})

}

export function getBodies() {

	return new Promise(function(resolve, reject) {
		let qlNode = 'bodies';
		pullData[qlNode] = [];

		fetchQLData(resolve, reject, 0, bodiesQL, qlNode);
	})

}

export function getSources() {

	var sourcePromises = [];

	sources.forEach( source => {

		let promise = new Promise(function(resolve,reject) {

			let qlNode = source.qlNode;
			pullData[qlNode] = [];

			fetchQLData(resolve, reject, 0, source.query, qlNode);

		});

		sourcePromises.push(promise);

	});

	return Promise.all(sourcePromises);

}