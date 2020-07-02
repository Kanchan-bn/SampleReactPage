import React, { useState } from 'react';
import { WineDetails } from './WineDetails';
import file1 from '../json/11YVCHAR001.json';
import file2 from '../json/11YVCHAR002.json';
import file3 from '../json/15MPPN002-VK.json';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const wineDetailSectionStyle = {
    height: '4em',
    paddingBottom: '1em'
}

export const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: '10em'
    }
}));

const NO_DATA = 'No data available';

export const WineDetailsDisplay = () => {
    const classes = useStyles();

    const [state, setStateVars] = useState({file: 'file1', data: file1, descDisabled: true, stateDisabled: true, productState: '', productDesc: ''});

    const fileNameOptions = [
        {value:'file1', label:'file1'},
        {value:'file2', label:'file2'},
        {value:'file3', label:'file3'}
    ];

    const setData = (value) => {
        switch(value) {
            case 'file1' : setStateVars({...state, file: value, data: file1, productState: '', productDesc: ''}); break;
            case 'file2': setStateVars({...state, file: value, data: file2, productState: '', productDesc: ''}); break;
            case 'file3': setStateVars({...state, file: value, data: file3, productState: '', productDesc: ''}); break;
            default: setStateVars({...state, file:value, data:file1, productState: '', productDesc: ''});
        }
    };

    const disableDesc = () => {
        if(!state.descDisabled) {
            setStateVars({...state, descDisabled: true});
        }
        // Enhance to save the edit to the JSON file
    }

    const disableState = () => {
        if(!state.stateDisabled) {
            setStateVars({...state, stateDisabled: true});
        }
        // Enhance to save the edit to the JSON file
    }

    const stateChanged = (value) => {
        setStateVars({...state, productState: value});
    }

    const descChanged = (value) => {
        setStateVars({...state, productDesc: value});
    }

    return (
        <>
            <h1 style={{textAlign: 'center'}}>Wine details</h1>
            <AppBar position="static">
                <Toolbar style={{marginLeft:'2em'}}>
                    <FormControl className={classes.formControl}>
                    <InputLabel id="filterBy" style={{color: 'white'}}>Choose file</InputLabel>
                        <Select
                            labelId="filterBy"
                            value={state.file}
                            onChange={e => setData(e.target.value)}
                            style={{color: 'white', borderBottom: '1px solid white'}}
                            >
                            {fileNameOptions.map(item => <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>)}  
                        </Select>
                    </FormControl>
                    <p style={{flexGrow:1}}>&nbsp;</p>
                    <Button color="inherit">Blend</Button>
                    <Button color="inherit">Notify</Button>
                    <Button color="inherit">Abort</Button>
                    <Button color="inherit">Delete</Button>
                </Toolbar>
            </AppBar>
            <section style={{display: "grid", gridTemplateColumns: "repeat(2, 1fr)"}}>
                <section style={{display: "grid", gridTemplateColumns: "repeat(2, 1fr)", paddingTop:'2em'}}>
                    <section style={{textAlign:'right', marginRight: '1em'}}>
                        <section>Lot code: </section>
                        <section style={wineDetailSectionStyle}>Description:</section>
                        <section>Volume: </section>
                        <section>Tank: </section>
                        <section style={wineDetailSectionStyle}>State of the product: </section>
                        <section>Owner: </section>
                    </section>
                    <section style={{marginRight: '1em'}}>
                        <section>{state.data.lotCode || NO_DATA} </section>
                            <section style={wineDetailSectionStyle}> 
                                <ClickAwayListener onClickAway={disableDesc}>
                                    <TextField disabled={state.descDisabled} 
                                        id="standard-disabled" 
                                        value={state.productDesc || state.data.description || NO_DATA} 
                                        onClick={() => setStateVars({...state, descDisabled: false})} 
                                        multiline
                                        rowsMax={4} style={{width:'60%'}}
                                        onChange={e => descChanged(e.target.value)}  />
                                </ClickAwayListener>
                            </section>
                        <section>{Math.round(state.data.volume) || NO_DATA}</section>
                        <section>{state.data.tankCode || NO_DATA}</section>
                        <section style={wineDetailSectionStyle}>
                            <ClickAwayListener onClickAway={disableState}>
                                <TextField disabled={state.stateDisabled} 
                                    id="standard-disabled" 
                                    value={state.productState || state.data.productState || NO_DATA} 
                                    onClick={() => setStateVars({...state, stateDisabled: false})} 
                                    style={{width:'60%'}}
                                    onChange={e => stateChanged(e.target.value)} />
                            </ClickAwayListener>
                        </section>
                        <section>{state.data.ownerName || NO_DATA}</section>
                    </section>
                </section>
                    <WineDetails details={state.data.components} />
            </section>
        </>
    )
}