import react from 'react';
import {useState, useEffect} from 'react';
import Plot from 'react-plotly.js';
import Searchstock from './SearchStock';
import Dropdown from './Dropdown';

//add drop down for interval change
//add drop down for period of time

const Stock = () => {

    const [xValue, setX] = useState([]);
    const [yValue, setY] = useState([]);
    let xHolder = [];
    let yHolder = [];

    const [index, setIndex] = useState('Time Series (Daily)');
    const [symbol, setSymbol] = useState('');
    const [series, setSeries] = useState('TIME_SERIES_DAILY');

    const list = [
        {title: 'Daily',
        value: 'TIME_SERIES_DAILY',
        index: 'Time Series (Daily)'
        },
        {title: 'Weekly',
        value: 'TIME_SERIES_WEEKLY',
        index: "Weekly Time Series"},
        {title: 'Monthly',
        value: 'TIME_SERIES_MONTHLY',
        index: "Monthly Time Series"}
    ];

    let API_CALL = `https://www.alphavantage.co/query?function=${series}&symbol=${symbol}&outputsize=compact&apikey=YSL9IRXC7HE5FMTG`;


    const updateTicker = (inSymbol) => {
        setSymbol(inSymbol);
    }

    const updateSeries = (seriess, index) => {
        setSeries(seriess);
        setIndex(index);
        console.log(series);
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
        
            for(var key in data[index]){
                xHolder.push(key);
                yHolder.push(data[index][key]['1. open']);
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

          <Dropdown menu = {list} itemSelectCallBack={updateSeries}></Dropdown>

          <button onClick= {fetchStock}></button>
        </div>
    )
}

export default Stock;