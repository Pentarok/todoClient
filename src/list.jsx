import React from 'react';

const List = (props) => {
  const items = props.item;
  items.sort((a,b)=> a.name.localeCompare(b.name));
  const listItems = items.map((item) => (
    <li key={item.id}>
      <span>{item.name}</span>
      <span>{item.quantity}</span>
    </li>
  ));
  
  return (
    <div className="list">
        <h4 className='category'>{props.category}</h4>
      <ol>{listItems}</ol>
    </div>
  );
};

export default List;
