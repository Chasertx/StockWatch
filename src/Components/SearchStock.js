import {useState} from 'react';

const Searchstock = (  {onTicker} ) => {
    
    const [ticker, setTicker] = useState('');

        const updateTicker = ( e => {
            setTicker(e.target.value);
        });

        const buttonClick = () => {
            onTicker(ticker);
        }

        return( 
            <div>
                <label className= 'searchContainer'>Ticker Symbol: </label>
                <input type="text" className= 'stockSearch' onChange= {updateTicker} />
                <button onClick= {buttonClick}>Submit</button>
            </div>
        )
}

export default Searchstock;