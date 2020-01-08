import React from 'react';

const Item = (props) => {
    const active = props.active === true ? "item-selected" : "";

    const onDel = (index) =>{
        props.onDeleteItem(index);
    }

    return (
        <div className={`item ${active}`} title={props.title} >
            <div>{props.title}</div>
            <button type="button" className="btn btn-outline-danger" onClick={e => onDel(props.index)}>Delete</button>
        </div>
    )
}

export default Item;
