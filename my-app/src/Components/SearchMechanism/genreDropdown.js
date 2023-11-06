import React, { useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import '../buttonStyle.css';

function GenreDropdown(props) {
  const [checkedItems, setCheckedItems] = useState([]);

  const handleCheckChange = (item, event) => {
    event.stopPropagation();

    let newCheckedItems;
    if (checkedItems.includes(item)) {
      newCheckedItems = checkedItems.filter(i => i !== item); 
    } else {
      newCheckedItems = [...checkedItems, item]; 
    }
    console.log("It starts here", newCheckedItems);
    props.getGenre(newCheckedItems); 
    setCheckedItems(newCheckedItems);
  };

  
  return (
    <div className="input-group px-3">
      <div className="my-auto">
        <DropdownButton id="dropdown-basic-button" title="Search By Genres"  variant = "light">
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {Array.from(props.items).sort().map((item, index) => (
              <Dropdown.Item key={index} as="button" onClick={(e) => e.stopPropagation()}>
                <input
                  type="checkbox"
                  checked={checkedItems.includes(item)} 
                  onChange={(e) => handleCheckChange(item, e)}
                />
                {' '}{item}
              </Dropdown.Item>
            ))}
          </div>
        </DropdownButton>
      </div>
      <Button className = "btn btn-spotify-clear" onClick={() => {setCheckedItems([]); props.getGenre([]);}}>
        Clear
      </Button>
    </div>
  );
}



export default GenreDropdown;
