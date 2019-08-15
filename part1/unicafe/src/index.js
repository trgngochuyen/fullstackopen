import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Statistics = (props) => {
    return (
        <tr>
            <td>{props.text}</td>
            <td>{props.value}</td>
        </tr>   
    )
}

const Button = ({text, onClick}) => <button onClick={onClick}>{text}</button>
const App = () => {
    //Save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const sum = good + neutral + bad
    const avg = (good - bad)/sum
    const pos = good*100/sum + '%'
    
    if (good === 0 && neutral === 0 && bad === 0) {
        return(
            <div>
                <h2>Give Feedback</h2>
                <Button onClick={() => setGood(good + 1)} text='good'/>
                <Button onClick={() => setNeutral(neutral + 1)} text='neutral'/>
                <Button onClick={() => setBad(bad + 1)} text='bad'/>
                <h2>Statistics</h2>
                <p>No feedback given</p>
            </div>
        )
    } return(
        <div>
            <h2>Give Feedback</h2>
            <Button onClick={() => setGood(good + 1)} text='good'/>
            <Button onClick={() => setNeutral(neutral + 1)} text='neutral'/>
            <Button onClick={() => setBad(bad + 1)} text='bad'/>
            <h2>Statistics</h2>
            <table>
                <tbody>
                    <Statistics text='good' value={good} />
                    <Statistics text='neutral' value={neutral} />
                    <Statistics text='bad' value={bad} />
                    <Statistics text='all' value={sum} />
                    <Statistics text='average' value={avg} />
                    <Statistics text='positive' value={pos} />
                </tbody>
            </table>
        </div>
    )
}
ReactDOM.render(<App />, document.getElementById('root'));

