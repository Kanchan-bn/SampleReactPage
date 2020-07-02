import React from 'react';

export const BreakdownDisplay = props => {
    const data = props.breakdown.slice(0, props.count).map((detail, i) => <p key={i}>{detail}</p>);
    
    const component = <a href='#' onClick={() => props.changeCount(props.count + 5)} style={{textDecoration: 'none', color:'blue'}}>display more...</a>;

    const displayMoreLink = props.count < props.breakdown.length ? component : null;
    return (
        <>
            {data}
            {displayMoreLink}
        </>
        )
}