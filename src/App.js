import React, { useState } from "react";
import { Input } from "./components/Input";

const App = () => {
  const [music, setMusic] = useState({});
  const [loveMatch, setLoveMatch] = useState({});
  const [artistQuery, setArtistQuery] = useState("");
  const [artist, setArtist] = useState("");
  const [firstPerson, setFirstPerson] = useState("");
  const [secondPerson, setSecondPerson] = useState("");

  const date = new Date();
  const sumCurrentDate = date.getDay() + date.getMonth() + 1;

  const handleChangeOnArtist = (e) => {
    let artistName = e.target.value;
    // console.log(artistName);
    // artistName = artistName.split(" ");
    // let newArtistName = artistName.map((elem) => {
    //   return elem[0].toUpperCase();
    // });
    // newArtistName.join(" ");
    setArtist(artistName);

    let query = artistName.split(" ").join("%20");
    console.log(query);
    setArtistQuery(query);
  };
  console.log(artist);

  const handleChangeOnFirstPerson = (e) => {
    setFirstPerson(e.target.value);
  };

  const handleChangeOnSecondPerson = (e) => {
    setSecondPerson(e.target.value);
  };

  const getDataFromApi = () => {
    fetch(
      `https://love-calculator.p.rapidapi.com/getPercentage?fname=${firstPerson}&sname=${secondPerson}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "love-calculator.p.rapidapi.com",
          "x-rapidapi-key":
            "ad4b660582msh74bf0dee7a84de3p15fae8jsnf3bc76d8541e",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setLoveMatch(data);
      })
      .catch((err) => {
        console.log(err);
      });

    fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${artistQuery}`, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
        "x-rapidapi-key": "ad4b660582msh74bf0dee7a84de3p15fae8jsnf3bc76d8541e",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setMusic(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const selectMusic = (loveMatch) => {
    const todaySong = (sumCurrentDate * loveMatch.percentage) % 24;
    if (music.data) {
      return music.data[todaySong].title_short;
    }
    return "";
  };
  return (
    <>
      <Input text="Artista" handleChange={handleChangeOnArtist} />
      <Input text="Seu Nome" handleChange={handleChangeOnFirstPerson} />
      <Input text="Crush" handleChange={handleChangeOnSecondPerson} />
      <button onClick={getDataFromApi}>Match</button>

      <div>
        {loveMatch.percentage && (
          <>
            <p>
              O nível de compatibilidade entre {firstPerson} e {secondPerson} é:{" "}
              {loveMatch.percentage}%
            </p>

            <p>{loveMatch.result}</p>

            <p>A música que {artist} fez para vocês é:</p>
            <p>{selectMusic(loveMatch)}</p>
          </>
        )}
      </div>
    </>
  );
};

export default App;
