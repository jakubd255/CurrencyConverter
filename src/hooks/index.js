import getDate from "../functions";
import { useEffect, useState } from "react";
import axios from "axios";


export const useCurrencyConverter = () => {
    const [data, setHistory] = useState(null);
    const [rates, setRates] = useState(null);
    const [from, setFrom] = useState("USD");
    const [to, setTo] = useState("EUR");
    const [value, setValue] = useState(1);
    const [chart, setChart] = useState("3M");

    const updateFrom = value => {
        if(value === to) swap();
        else setFrom(value);
    }
    const updateTo = value => {
        if(value === from) swap();
        else setTo(value);
    }
    const updateValue = event => setValue(event.target.value);
    const updateChart = event => setChart(event.target.value);
    


    useEffect(() => {
        axios.get("https://api.exchangerate.host/latest").then(response => setRates(response.data.rates));
    });

    useEffect(() => {
        const ms = new Date().getTime();
        let fromMs = ms;

        switch(chart)
        {
            case "1M": fromMs -= (30*24*3600*1000); break;
            case "3M": fromMs -= (90*24*3600*1000); break;
            case "6M": fromMs -= (183*24*3600*1000); break;
            case "1Y": fromMs -= (365*24*3600*1000); break;
        }

        axios.get(`https://api.exchangerate.host/timeseries?start_date=${getDate(fromMs)}&end_date=${getDate(ms)}`).then(response => {
            let history = Object.entries(response.data.rates).map(date => 
                ({
                    date: date[0], 
                    Rates: (1/date[1][from]*date[1][to])
                })
            );

            if(isNaN(history[history.length-1].Rates)) history.pop();
            setHistory(history);
        });
    }, [from, to, chart]);



    const swap = () => {
        const temp = from;
        setFrom(to);
        setTo(temp);
    }
    const convert = () => {
        if(value == 0 || value == null)
            return 0;
        else
        {
            const base = value/rates[from];
            const target = base*rates[to];

            return target.toFixed(2);
        }
    }


    
    const min = data ? (([...data].sort((d1, d2) => d1.Rates - d2.Rates))[0].Rates) : 0

    const config = {
        data,
        padding: "auto",
        xField: "date",
        yField: "Rates",
        xAxis: {tickCount: 10},
        yAxis: {min: min}
    };



    return {
        loaded: (rates && data), 
        config,
        convert, 
        swap,
        from, updateFrom,
        to, updateTo,
        value, updateValue,
        chart, updateChart
    };
}



export const useToday = () => {
    const [today] = useState(() => {
        const dateObject = new Date();
        const year = dateObject.getFullYear();
        let month = dateObject.getMinutes();
        let day = dateObject.getDate();
        let hour = dateObject.getHours();
        let minutes = dateObject.getMinutes()
    
        if(day <= 9) day = "0"+day;
        if(month <=9 ) month = "0"+month;
        if(hour <=9 ) hour = "0"+hour;
        if(minutes <=9 ) minutes = "0"+minutes;
    
        return `${hour}:${minutes} ${year}-${month}-${day}`;
    });

    return today;
}