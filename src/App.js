import './App.css';
import {useState} from "react";

function App() {
  const [hexString, setHexString] = useState('');
  const [resNumber, setResNumber] = useState(-1);
  const [error, setError] = useState('');

  const handleButtonClick = () => {
    if (hexString.length !== 64) {
      setError('Wrong input');

      return;
    }

    const hex = hexString.substring(0, 8);
    const dec = parseInt(hex, 16);
    setResNumber(Math.floor((dec / 16 ** 8) * 54));
    setError('');
  };

  return (
      <div className="component-container">
        <p style={{color: "#3d55ab"}}>Синий цвет (2x) - 2; 4; 6; 8; 10; 12; 14; 16; 18; 20; 22; 24; 26; 28; 30; 32; 34; 36; 38; 40; 42; 44; 46; 48; 50; 52</p>
        <p style={{color: "#428c96"}}>Зеленый цвет (3x) - 3; 5; 7; 13; 15; 17; 23; 25; 27; 29; 31; 37; 39; 41; 47; 49; 51</p>
        <p style={{color: "#5356c7"}}>Фиолетовый цвет (5x) - 1; 9; 11; 19; 21; 33; 35; 43; 45; 53</p>
        <p style={{color: "#dbb97b"}}>Золотой цвет (20x) - 0</p>
        {!error && resNumber !== -1 && <h2 style={{color: '#fff'}}>{resNumber}</h2>}
        {error && <h2 style={{color: 'red'}}>{error}</h2>}
        <input type="text" className="input-field" onChange={(e) => setHexString(e.currentTarget.value)} />
        <button className="submit-button" onClick={handleButtonClick}>
          Get number
        </button>
      </div>
  );
}

export default App;
