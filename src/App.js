import './App.css';
import {Wheel} from 'react-custom-roulette'
import {useState} from "react";
import {Button, Div} from "@vkontakte/vkui";

const options = [
    {option: 'Чеклист и как его составить?'},
    {option: 'Функциональное и не функциональное тестирование'},
    {option: 'HTTP Запрос'},
    {option: 'Автомат'},
    {option: 'Особенности тестирования мобильных приложений'},
    {option: 'Особенности тестирования WEB Приложений'},
    {option: 'Тестирование безопасности'},
    {option: 'По второй?'},
    {option: 'UI Автотесты'},
    {option: 'Написать чеклист'},
    {option: 'Провести функциональное тестирование'},
    {option: 'Провести тестирование верстки'},
    {option: 'Автомат'},
    {option: 'Провести тестирование  на отказ и восстановление'},
    {option: 'Провести тестирование производительности'},
    {option: 'Написать автотесты'},
    {option: 'Провести тестирование API'},
]


function getRandomColors() {
    let response = []
    fetch("https://raw.githubusercontent.com/Margaret2/pantone-colors/master/pantone-colors.json")
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            for (let i = 0; i < options.length; i++) {
                let randNum = Math.ceil(Math.random() * data.values.length);
                response.push(data.values[randNum])
            }
        })
        .catch((err) => {
            console.log(err);
        });
    return response
}


function getRandomIndex() {
    return Math.floor(Math.random() * options.length)
}

function App() {
    const [mustSpin, setMustSpin] = useState(false);
    const [colors, setColors] = useState(getRandomColors());
    const [prize, setPrize] = useState(getRandomIndex)
    const [needShowPrize, setNeedShowPrize] = useState(false)
    const [text, setText] = useState('Нажми на кнопку, чтобы покрутить')
    return (
        <Div>
        <Div style={{
            float: "left",
            height: "100vh",
            width: "50vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "black"
        }}>
            <Wheel
                mustStartSpinning={mustSpin}
                prizeNumber={prize}
                data={options}
                backgroundColors={colors}
                textColors={['#ffffff']}
                fontSize={6}
                onStopSpinning={() => {
                    setMustSpin(false);
                    setNeedShowPrize(true)
                }}
            />
        </Div>
        <Div style={{
            float: "right",
            height: "100vh",
            width: "50vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "black",
           }}>
            <Div>
            <Button mode="overlay_outline" onClick={() => {
                setMustSpin(true);
                setPrize(getRandomIndex());
                setNeedShowPrize(false)
                setText('Крутимся, вертимся, вращаемся')
            }}>Покрутить</Button>
            </Div>
            <Div style={{color: "#ffffff",  padding: "10px"}}>{needShowPrize ? options[prize].option : text}</Div>
        </Div>
        </Div>
)

}

export default App;
