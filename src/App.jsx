import React from "react";
import { Select, Button, Radio } from "antd";
import { SwapOutlined } from "@ant-design/icons";
import './styles/App.css';
import { Line } from "@ant-design/plots";
import { useToday, useCurrencyConverter } from "./hooks";
import currencies from "./constants";


const App = () => {
    const today = useToday();

    const {
        loaded,
        config,
        convert, 
        swap,
        from, updateFrom,
        to, updateTo,
        value, updateValue,
        chart, updateChart
    } = useCurrencyConverter();    

    if(loaded) return(
        <div className="App">
            <h1>Currency Converter</h1>
            <span>{today}</span>

            <div className="currencies-row">
                <div className="currency-card">
                    <span>Form</span>
                    <Select
                        className="currency-choice"
                        options={currencies}
                        value={from}
                        onChange={updateFrom}
                        size="large"
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        showSearch
                    />
                    <input
                        value={value}
                        onChange={updateValue}
                        placeholder="0"
                    />
                </div>

                <Button className="swap-button" type="primary" onClick={swap}>
                    <SwapOutlined className="swap-icon"/>
                </Button>

                <div className="currency-card">
                    <span>To</span>
                    <Select
                        className="currency-choice"
                        options={currencies}
                        value={to}
                        onChange={updateTo}
                        size="large"
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        showSearch
                    />
                    <input value={convert()} readOnly/>
                </div>
            </div>

            <div className="history-chart">
                <div className="chart-options">
                    <Radio.Group
                        value={chart}
                        onChange={updateChart}
                        buttonStyle="solid"
                    >
                        <Radio.Button value="1M">1M</Radio.Button>
                        <Radio.Button value="3M">3M</Radio.Button>
                        <Radio.Button value="6M">6M</Radio.Button>
                        <Radio.Button value="1Y">1Y</Radio.Button>
                    </Radio.Group>
                </div>
                <Line {...config}/>
            </div>
        </div>
    );
}

export default App