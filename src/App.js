import "./App.css";
import { useState } from "react";
import { sha256 } from "js-sha256";

function App() {
  const [userSeeds, setUserSeeds] = useState({
    user1: "",
    user2: "",
    user3: "",
  });
  const [serverSeed, setServerSeed] = useState("");
  const [resNumber, setResNumber] = useState(-1);
  const [error, setError] = useState("");

  const handleButtonClick = () => {
    if (serverSeed.length !== 64) {
      setError("Wrong server seed");

      return;
    }

    if (userSeeds.user1.length !== 20) {
      setError("Wrong user #1 seed");

      return;
    }

    if (userSeeds.user2.length !== 20) {
      setError("Wrong user #2 seed");

      return;
    }

    if (userSeeds.user3.length !== 20) {
      setError("Wrong user #3 seed");

      return;
    }

    const concatenatedString =
      serverSeed + userSeeds.user1 + userSeeds.user2 + userSeeds.user3;

    const hash = sha256(concatenatedString).toString();

    const hex = hash.substring(0, 8);
    const dec = parseInt(hex, 16);

    console.log(concatenatedString, "server + user1 + user2 + user3");
    console.log(hash, "hash");
    console.log(hex, "hex");
    console.log(dec, "dec");

    setResNumber(Math.floor((dec / 16 ** 8) * 54));
    setError("");
  };

  const handleChangeUserSeed = (value, userId) => {
    setUserSeeds((p) => ({ ...p, [userId]: value }));
  };

  return (
    <div className="component-container">
      <p style={{ color: "#3d55ab" }}>
        Синий цвет (2x) - 2; 4; 6; 8; 10; 12; 14; 16; 18; 20; 22; 24; 26; 28;
        30; 32; 34; 36; 38; 40; 42; 44; 46; 48; 50; 52
      </p>
      <p style={{ color: "#428c96" }}>
        Зеленый цвет (3x) - 3; 5; 7; 13; 15; 17; 23; 25; 27; 29; 31; 37; 39; 41;
        47; 49; 51
      </p>
      <p style={{ color: "#5356c7" }}>
        Фиолетовый цвет (5x) - 1; 9; 11; 19; 21; 33; 35; 43; 45; 53
      </p>
      <p style={{ color: "#dbb97b" }}>Золотой цвет (20x) - 0</p>

      {!error && resNumber !== -1 && (
        <h2 style={{ color: "#fff" }}>{resNumber}</h2>
      )}
      {error && <h2 style={{ color: "red" }}>{error}</h2>}

      <label style={{ color: "#fff" }}>
        User seed #1
        <input
          type="text"
          className="input-field"
          value={userSeeds.user1}
          onChange={(e) => handleChangeUserSeed(e.target.value, "user1")}
        />
      </label>

      <label style={{ color: "#fff" }}>
        User seed #2
        <input
          id="user1"
          type="text"
          value={userSeeds.user2}
          className="input-field"
          onChange={(e) => handleChangeUserSeed(e.target.value, "user2")}
        />
      </label>
      <label style={{ color: "#fff" }}>
        User seed #3
        <input
          id="user2"
          type="text"
          value={userSeeds.user3}
          className="input-field"
          onChange={(e) => handleChangeUserSeed(e.target.value, "user3")}
        />
      </label>
      <label style={{ color: "#fff" }}>
        Server seed
        <input
          id="user3"
          value={serverSeed}
          type="text"
          className="input-field"
          onChange={(e) => setServerSeed(e.target.value)}
        />
      </label>
      <button className="submit-button" onClick={handleButtonClick}>
        Get number
      </button>
    </div>
  );
}

export default App;
