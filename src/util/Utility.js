export const getPercentBreakdown = (filter, data) => {
    switch(filter) {
        case 'Year': return wineYearBreakdown(data);
        case 'Variety': return wineVarietyBreakDown(data);
        case 'Region': return wineRegionBreakDown(data);
        case 'YearVariety': return wineYearVarietyBreakDown(data);
        default: return wineYearBreakdown(data);
    }
}


const wineYearBreakdown = data => {
    let reducedArray = data.reduce((acc, item) => {
        const foundIndex = acc.findIndex(accitem => accitem.year === item.year);
        if(foundIndex !== -1) {
            acc[foundIndex].percentage += item.percentage;
        }else{
            acc.push({"percentage": item.percentage, "year": item.year});
        }
        return sortItems(acc);
    },[]);

    return getResultString(reducedArray);
}

const wineVarietyBreakDown = data => {
    let reducedArray = data.reduce((acc, item) => {
        const foundIndex = acc.findIndex(accitem => accitem.variety === item.variety);
        if(foundIndex !== -1) {
            acc[foundIndex].percentage += item.percentage;
        }else{
            acc.push({"percentage": item.percentage, "variety": item.variety});
        }
        return sortItems(acc);
    },[]);

    return getResultString(reducedArray);
}

const wineRegionBreakDown = data => {
    let reducedArray = data.reduce((acc, item) => {
        const foundIndex = acc.findIndex(accitem => accitem.region === item.region);
        if(foundIndex !== -1) {
            acc[foundIndex].percentage += item.percentage;
        }else{
            acc.push({"percentage": item.percentage, "region": item.region});
        }
        return sortItems(acc);
    },[]);

    return getResultString(reducedArray);
}

const wineYearVarietyBreakDown = data => {
    let reducedArray = data.reduce((acc, item) => {
        const foundIndex = acc.findIndex(accitem => accitem.year === item.year && accitem.variety === item.variety);
        if(foundIndex !== -1) {
            acc[foundIndex].percentage += item.percentage;
        }else{
            acc.push({"percentage": item.percentage, "year": item.year, "variety": item.variety});
        }
        return sortItems(acc);
    },[]);

    return getResultString(reducedArray);
}


const sortItems = items => {
    return items.sort((item1, item2) => item2.percentage - item1.percentage);
}

const getResultString = arrayObject => {
    let resultString = '';

    if(arrayObject.length === 0) {
        return resultString;
    }
    
    const objLength = Object.keys(arrayObject[0]).length;
    arrayObject.forEach(obj => {
        for(let i=0; i< objLength; i++) {
            resultString += Object.values(obj)[i];
            if(i === 0) {
                resultString += '% -';
            }
            if(i < objLength - 1){
                resultString += ' ';
            }
        }
        resultString += '\n ';  
    });
    // console.log(resultString);
    return resultString.trim();
}
