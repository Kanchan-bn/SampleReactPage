import React, { useState } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { useStyles } from './WineDetailsDisplay';

import { BreakdownDisplay } from './BreakdownDisplay';
import { getPercentBreakdown } from '../util/Utility';

export const WineDetails = props => {
    const classes = useStyles();

    const filterOptions = [
        {label: 'Year', value: 'Year'},
        {label: 'Variety', value: 'Variety'},
        {label: 'Region', value: 'Region'},
        {label: 'Year and Variety', value: 'YearVariety'},
    ];

    const [state, setStateVars] = useState({filter: 'Year', count: 5});
    const breakdownArray = getPercentBreakdown(state.filter, props.details).split('\n');

    const changeDisplayCount = value => {
        setStateVars({...state, count: value});
    }

    return (
        <section style={{marginLeft:'10em'}}>
            <h4>Wine composition</h4>
            <FormControl className={classes.formControl}>
                <InputLabel id="filterBy">Breakdown by </InputLabel>
                <Select
                    labelId="filterBy"
                    value={state.filter}
                    onChange={e => setStateVars({filter: e.target.value, count: 5})}
                    >
                    {filterOptions.map(item => <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>)}  
                </Select>
            </FormControl>
            <section>
                <BreakdownDisplay count={state.count} breakdown={breakdownArray} changeCount={changeDisplayCount} />
            </section>
        </section>
    )
}
