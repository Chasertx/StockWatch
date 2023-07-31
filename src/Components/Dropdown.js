import {useState} from 'react';

const Dropdown = ({menu, itemSelectCallBack}) => {

    const [open, setOpen] = useState(false);

    const openDropdown = () => {
        setOpen(!open);
    }

    

    return(
        <div>
            <button onClick = {openDropdown}> Open </button>

            { open && <div>
                        <ul key = "data">
                            {menu.map( (item) => {
                                return(
                                <li key = {item.title}>
                                <button onClick = { () => {itemSelectCallBack(item.value, item.index)} }> {item.title} </button>
                                </li>
                                )
                            })}
                            
                        </ul>
                    </div>}
        </div>
    )
}

export default Dropdown;