/*
	Functions for each chart type and comparable body attribute.
	Each body attribute (subType, gravity, surfaceTemperature etc.)
	can have one or more chart generator(s).

	These need to be programmed manually based on bodies attributes.
*/
const chartBgColors = [
    'rgb(255, 99, 132)',
    'rgb(54, 162, 235)',
    'rgb(255, 206, 86)',
    'rgb(75, 192, 192)',
    'rgb(153, 102, 255)',
    'rgb(255, 159, 64)'
];

const chartGenerators = {

	siteTypes: { 
		name: 'Type breakdown',
		description: 'Site types breakdown (header)',
		chartType: 'doughnout',
		getData: (bodies, source) => {

			// Chart variables
			const labels = [];
			const datasets = [{
				data: [],
				backgroundColor: chartBgColors
			}];
	
			// Generator source specific variables (used for data mapping)
			let typeNode = source.typeNode;
			let distinctTypes = {};

			if(source.typeNode) {
	
				source.sites.forEach( site => {
		
					let type = site[typeNode][typeNode];
		
					if( !distinctTypes[type] ) {
		
						distinctTypes[type] = {
							label: type,
							amount: 1
						};
	
					} else {
						distinctTypes[type].amount++; 
					}
		
				});
	
				Object.keys(distinctTypes).sort( (a,b) => {
					// just a dirty sort in between.

					if(a < b ) {
						return -1
					}
					if( b > a) {
						return 1
					}

					return 0;

				}).forEach( dTypeKey => {
					let dType = distinctTypes[dTypeKey];
	
					labels.push( dType.label);
					datasets[0].data.push( dType.amount );
				})
		
				return {
					labels: labels,
					datasets: datasets
				}
		
			} else {

				return null;

			}

		}

	},

	bodySubType: { 
		name: 'Body type',
		description: 'Breakdown based on body types.',
		chartType: 'pie',
		getData: (bodies, source) => {

			// Chart variables
			const labels = [];
			const datasets = [{
				data: [],
				backgroundColor: chartBgColors
			}];

			// Generator source specific variables (used for data mapping)
			let bodyTypes = {};

			source.sites.forEach( site => {

				let bodyId = site.body.id;

				Object.keys(bodies).forEach( bodyKey => {

					let body = bodies[bodyKey];

					// body belongs to site
					if(bodyId == body.id) {

						if( !bodyTypes[ body.subType ] ) {

							bodyTypes[ body.subType ] = {
								label: body.subType,
								amount: 1
							}

						} else {
							bodyTypes[ body.subType ].amount++;
						}

					}

				});

			});

			Object.keys(bodyTypes).sort( (a,b) => {
					// just a dirty sort in between.

					if(a < b ) {
						return -1
					}
					if( b > a) {
						return 1
					}

					return 0;

				}).forEach( bodyTypeKey => {
					let bType = bodyTypes[bodyTypeKey];
	
					labels.push( bType.label);
					datasets[0].data.push( bType.amount );
				});

				console.log('Return chart: ', {
					labels: labels,
					datasets: datasets
				});

				return {
					labels: labels,
					datasets: datasets
				}

		}

	},

	surfaceTemperature: { 
		name: 'Surface temperature',
		description: 'Number of sites corresponding to body surface temperature in K',
		chartType: 'line',
		getData: (bodies, source) => {

			// Chart variables
			const labels = [];
			const datasets = [{
				data: [],
				backgroundColor: chartBgColors
			}];

			// Generator source specific variables (used for data mapping)
			
			let temps = {};
			let dataSet = [{ data: [] }];

			let minTemp = Number.POSITIVE_INFINITY;
			let maxTemp = Number.NEGATIVE_INFINITY;

			source.sites.forEach( site => {

				let bodyId = site.body.id;

				Object.keys(bodies).forEach( bodyKey => {

					let body = bodies[bodyKey];

					// body belongs to site
					if(bodyId == body.id) {

						let bodyTemp = body.surfaceTemperature;

						if( minTemp < bodyTemp ) { minTemp = bodyTemp }
						if( maxTemp > bodyTemp ) { maxTemp = bodyTemp }

						if( !temps[bodyTemp] ) {
							
							temps[bodyTemp] = {
								x: bodyTemp,
								y: 1
							}

						} else {

							temps[bodyTemp].y++;

						}

					}

				});

			});

			Object.keys(temps).forEach( dtemp => {


				labels.push(dtemp);
				dataSet[0].data.push( temps[dtemp].y );
			});

			return {
				labels: labels,
				datasets: dataSet
			}

		}

	},

	latLng: { 
		name: 'Lat/Lng distribution',
		description: 'Positions of sites based on lat/lng',
		chartType: 'scatter',
		getData: (bodies, source) => {

			// Chart variables
			const labels = [];
			const datasets = [{
				data: [],
				backgroundColor: chartBgColors
			}];

			// Generator source specific variables (used for data mapping)
			let latLng = [];

			source.sites.forEach( site => {

				let lat = parseFloat(site.latitude, 10);
				let lng = parseFloat(site.longitude, 10);

				if(lat && lng) {

					latLng.push({
						x: parseFloat(site.longitude, 10),
						y: parseFloat(site.latitude, 10)
					})

				}

			});

			datasets[0].data = latLng;
			datasets[0].borderColor = "#f92010";

			return {
				labels: labels,
				datasets: datasets
			}

		}

	},

	avgMaterials: { 
		name: 'Average materials',
		description: 'Average of materials present on bodies with sites',
		chartType: 'horizontalBar',
		getData: (bodies, source) => {

			// Chart variables
			const labels = [];
			const datasets = [{
				data: [],
				backgroundColor: chartBgColors
			}];

			// Generator source specific variables (used for data mapping)
			let materials = {}

			source.bodies.forEach( bodyId => {

				let body = bodies[bodyId];
				
				if(body && body.material) {

					Object.keys(body.material).forEach( key => {

						if( !materials[key] ) {
							materials[key] = 0;
						}

						let bodyMat = parseFloat( body.material[key], 10 );
						materials[key] += bodyMat;

					});

				}


			});

			Object.keys(materials).forEach( key => {
				materials[key] = materials[key]/source.bodies.length;
			});

			return {
				labels: Object.keys(materials),
				datasets: [{
					data: Object.values(materials),
					backgroundColor: "#36a2eb"
				}]
			}

		}

	},

}

export default chartGenerators;
