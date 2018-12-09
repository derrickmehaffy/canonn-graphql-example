import React from 'react';
import css from '../css/style.css';

import ChartWrapper from './ChartWrapper.js';
import chartGenerators from '../js/chartGenerators.js';

class Wrapper extends React.Component {

    render() {

        console.log('Wrapper props: ', this.props);

        const bodies = this.props.bodies;
        const sources = this.props.sources;
        const sourceKeys = Object.keys(sources);

        console.log('chartGenerators');
        console.log(chartGenerators);

        console.log('chartGenerators.siteTypes');
        console.log( chartGenerators.siteTypes );

        console.log('chartGenerators.siteTypes');
        console.log(sources);
        console.log( chartGenerators.siteTypes.getData(bodies, sources.tssites) );

        return(
            <div className={css.wrapper}>
    
                <header className={css.header}>
                    <h1 className={css.alignCenter}>Canonn Sites body comparison</h1>
                    <h2 className={css.alignCenter}>Compares body properties of different ED site types.<br /> An example of graphQL for Strapi.</h2>
                </header>

                <div className={css.sourcesWrapper}>
                    { 
                        sourceKeys.map( sourceKey => {


                            let source = sources[sourceKey];
                            
                            if(source.typeNode) {

                                let data = chartGenerators.siteTypes.getData(bodies, sources[sourceKey]);
                                data.chartType = chartGenerators.siteTypes.chartType;

                                return(
                                    <div key={'types/'+sourceKey} className={css.source}>
    
                                        <div className={css.sourceHeader}>
                                            <h2 className={css.alignCenter}>{source.name}</h2>
                                            <p className={css.alignCenter}>Based on <strong>{source.sitesNumber}</strong> Sites located on <strong>{source.bodies.length}</strong> bodies.</p>
                                        </div>
    
                                        {/* Type distribution chart */}
                                        <ChartWrapper
                                            data={data}
                                        />
    
                                    </div>
                                )

                            } else {

                                return (
                                    <div key={'types/'+sourceKey} className={css.source}>
    
                                        <div className={css.sourceHeader}>
                                            <h2 className={css.alignCenter}>{source.name}</h2>
                                            <p className={css.alignCenter}>Based on <strong>{source.sitesNumber}</strong> Sites located on <strong>{source.bodies.length}</strong> bodies.</p>
                                        </div>
    
                                        {/* Type distribution chart */}
                                        <h3 className={css.alignCenter}>Sorry, no type field to compare found.</h3>
    
                                    </div>
                                )

                            }

                        })
                    }

                </div>

                {
                    Object.keys(chartGenerators).map( chartKey => {

                        if(chartKey != 'siteTypes') {

                            let chart = chartGenerators[chartKey];

                            return (

                                <div key={chartKey} className={css.sourcesWrapper}>

                                    {
                                        sourceKeys.map( sourceKey => {

                                            let source = sources[sourceKey];

                                            let data = chartGenerators[chartKey].getData(bodies, source);
                                                data.chartType = chartGenerators[chartKey].chartType;

                                            return(

                                                <div key={chartKey+'/'+sourceKey} className={css.source}>
                                                    <div className={css.sourceHeader}>
                                                        <h3 className={css.alignCenter}>{chart.name}</h3>  
                                                        <p className={css.alignCenter}>{chart.description}</p>  
                                                    </div>
                    
                                                    <ChartWrapper
                                                        chartType={chart.chartType}
                                                        data={data}
                                                    />
                    
                                                </div>

                                            )

                                        })
                                    }

                                </div>

                            )

                        }

                    })
                }

                <footer className={css.footer}>
                    <p>Made as a demo of graphQL for Strapi & Canonn.</p>
                    <p>Contact: Canonn Discord (ask for Vall or DMehaffy).</p>
                </footer>
    
            </div>
        );
    }
};

export default Wrapper;
