import React from 'react';
import css from '../css/style.css';

import {
    HorizontalBar,
    Bar,
    Pie,
    Doughnut,
    Line,
    Scatter
} from 'react-chartjs-2';

class ChartWrapper extends React.Component {

    render() {

        const data = this.props.data;

        if(data) {

            switch(data.chartType) {

                case 'doughnout': {

                    return(
                        <Doughnut 
                            data={{
                                labels: data.labels,
                                datasets: data.datasets
                            }}
                        />
                    )
                }

                case 'pie': {

                    return(
                        <Pie 
                            data={{
                                labels: data.labels,
                                datasets: data.datasets
                            }}
                        />
                    )

                }

                case 'line': {

                    return(
                        <Line
                            height={240}
                            options={{

                                legend: {
                                    display: false
                                },

                                scales: {
                                    xAxes: [{
                                        ticks: {
                                            stepSize: 5
                                        }
                                    }]
                                }

                            }}
                            data={{
                                labels: data.labels,
                                datasets: [{
                                    data: data.datasets[0].data,
                                    label: 'Number of sites',
                                    borderColor: "#3e95cd",
                                    borderWidth: 1,
                                    fill: false
                                }]
                            }}
                        />
                    )

                }

                case 'scatter': {

                    return(
                        <Scatter
                            options={{

                                legend: {
                                    display: false
                                },

                                tooltips: {
                                    enabled: false
                                },

                                scales: {
                                    xAxes: [{
                                        type: 'linear',
                                        position: 'bottom',
                                        ticks: {
                                            min: -180,
                                            max: 180,
                                            stepSize: 45
                                        }
                                    }],

                                    yAxes: [{
                                        ticks: {
                                            min: -90,
                                            max: 90,
                                            stepSize: 45
                                        }
                                    }]
                                }

                            }}
                            data={{
                                datasets: data.datasets
                            }}
                        />
                    )

                }

                case 'horizontalBar': {

                    return(
                        <HorizontalBar
                            height={500}
                            options={{

                                legend: {
                                    display: false
                                }

                            }}
                            data={data}
                        />
                    )

                }

            }


        } else {

            return (
                <div className={css.sourceChart}>
                    <h3 className={css.alignCenter}>No data available.</h3>
                </div>
            )

        }

        

    }

};

export default ChartWrapper;
