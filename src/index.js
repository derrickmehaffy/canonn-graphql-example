import React from 'react';
import ReactDOM from 'react-dom';

import { getBodies, getSources } from './api/canonn.js';
import { sources } from './api/sources.schema.js';

import css from './css/style.css';

import Wrapper from './components/Wrapper.js';

class App extends React.Component {

    constructor() {
        super();

        this.state = {
            loading: true,
            bodies: {},
            sources: {}
        }

    }

    componentDidMount() {

        console.log('App mounted');
        console.log('Pulling Canonn API DATA');

        const bodiesObj = {};
        const sourceObj = {};

        // Fill in sources data before getting reply from Canonn API
        sources.forEach( source => {

            sourceObj[source.qlNode] = {
                name: source.name,
                qlNode: source.qlNode,
                sitesNumber: 0,
                typeNode: source.typeNode,
                bodies: [],
                sites: []
            };

        });

        // Get all the data from the API - graphQL
        getBodies().then( bodiesData => {

            bodiesData.bodies.forEach( body => {
                bodiesObj[body.id] = body;
            });

            getSources().then( results => {

                Object.keys(sourceObj).forEach( sourceKey => {

                    results.forEach( result => {
                        if(result[sourceKey]) {

                            result[sourceKey].forEach( site => {

                                let sourceSites = sourceObj[sourceKey];
                                let bodyId = parseInt(site.body.id);

                                sourceSites.sites.push(site);

                                if( sourceSites.bodies.indexOf( bodyId ) == -1 ) {
                                    sourceSites.bodies.push( bodyId );
                                }

                                sourceObj[sourceKey].sitesNumber++;

                            });
                            
                        }
                    });
                    
                });

                console.log('Ok...');

                this.setState({
                    loading: false,
                    bodies: bodiesObj,
                    sources: sourceObj
                });

                console.log('State', this.state);

            });

        });

    }

    render() {

        if( this.state.loading ) {
            return ( <div className={css.loading}>Loading CANONN API [graphQL] Data...</div> )
        } else {
            return (
                <Wrapper 
                    bodies={this.state.bodies}
                    sources={this.state.sources}
                />
            )
        }

    }
};

export default App;

ReactDOM.render(<App />, document.getElementById("app"));
