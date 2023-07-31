import react from 'react';
import {useState, useEffect} from 'react';
import Plot from 'react-plotly.js';
import Searchstock from './SearchStock';

//Add input for stock name
//add drop down for interval change
//

const Stock = () => {

    const [xValue, setX] = useState([]);
    const [yValue, setY] = useState([]);
    let xHolder = [];
    let yHolder = [];

    const [stockData, setStockData] = useState([]);
    const [symbol, setSymbol] = useState('');

    let API_CALL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&interval=5min&outputsize=compact&apikey=YSL9IRXC7HE5FMTG`;


    const updateTicker = (inSymbol) => {
        setSymbol(inSymbol);
        console.log(symbol);
    }


    useEffect( () => {
        fetchStock();
    },[API_CALL]
    );
    //TODO make into useEffect
    const fetchStock = () => {
        const API_KEY = 'YSL9IRXC7HE5FMTG';
        


        fetch(API_CALL)
        .then( (response) => {
            return response.json();
        })
        .then( (data) => {
            setStockData(data);
            for(var key in data["Time Series (Daily)"]){
                xHolder.push(key);
                yHolder.push(data["Time Series (Daily)"][key]['1. open']);
            }
            
            setX(xHolder);
            setY(yHolder);
            console.log(yValue);
            xHolder = [];
            yHolder = [];
        });
    }

    


    return (
        <div>
            <h1>Stock Market</h1>
            <Searchstock onTicker = {updateTicker}/>
            <Plot
        data={[
          {
            x: xValue,
            y: yValue,
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'red'},
          }]}
          ></Plot>

          <button onClick= {fetchStock}></button>
        </div>
    )
}

export default Stock;