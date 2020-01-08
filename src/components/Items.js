import React from 'react';

import Item from './Item';


const Items = (props) => {

    return (
        <div>
            {props.values.map((item, i) =>
                <Item key={i} index={i} title={item.title} active={item.active} onDeleteItem={props.onDeleteItem}/>
            )}
        </div>
    )
}

export default Items;