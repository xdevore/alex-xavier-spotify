import React, { useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';

function GenreDropdown(props) {
  const [checkedItems, setCheckedItems] = useState(new Set());

  const handleCheckChange = (item, event) => {
    event.stopPropagation();  

    const newCheckedItems = new Set(checkedItems);
    if (newCheckedItems.has(item)) {
      newCheckedItems.delete(item);
    } else {
      newCheckedItems.add(item);
    }
    console.log("It starts her", newCheckedItems)
    props.getGenre(newCheckedItems)
    setCheckedItems(newCheckedItems);
  };

  return (
      <>
    <DropdownButton id="dropdown-basic-button" title="Search By Genres">
      <div style={{ maxHeight: '450px', overflowY: 'auto' }}>
        {Array.from(props.items).sort().map((item, index) => (
          <Dropdown.Item key={index} as="button" onClick={(e) => e.stopPropagation()}>
            <input
              type="checkbox"
              checked={checkedItems.has(item)}
              onChange={(e) => handleCheckChange(item, e)}
            />
            {' '}{item}
          </Dropdown.Item>
        ))}
      </div>
    </DropdownButton>
     <button onClick={() => {setCheckedItems(new Set()); props.getGenre(new Set())}}>Clear</button>
     </>
  );
}


export default GenreDropdown;
