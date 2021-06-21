import { useState, useEffect } from 'react';
import './App.css';
import LoadingDog from './Dog.js';
import dogFacts from './dogFacts.json';

const dogFactsCount = dogFacts.length;
const loadingMainStyle = { padding: '5rem' }
const loadedMainStyle = { padding: 0 }

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function App() {
  const [dogImageUrl, setDogImageUrl] = useState('');
  const [dogFact, setDogFact] = useState('');
  const isLoading = !dogImageUrl;
  const imageStyle = {
    margin: 'auto',
    minWidth: '250px',
    width: 'auto',
    height: '250px',
    background: `url(${dogImageUrl}) no-repeat center`
  };

  useEffect(() => {
    document.title = 'Dogs Facts';
    setTimeout(fetchData, 3000);

    async function fetchData() {
      const dogImageResponse = await fetch('https://random.dog/woof.json');
      const dogImage = await dogImageResponse.json();

      if (dogImage) {
        setDogImageUrl(dogImage.url);
        setDogFact(dogFacts[getRandomInt(dogFactsCount)].fact)
      }
    }

  }, []);

  return (
    <>
      <header>
        <h1> Dog Facts </h1>
      </header>
      <main className="App" style={isLoading ? loadingMainStyle : loadedMainStyle}>
        {isLoading ?
          (<LoadingDog />) :
          (<div alt="random dog" className="App-logo image-container" style={imageStyle}></div>)
        }
        <p>{dogFact}</p>
      </main>
      <footer className="footer">
        <a
          aria-label="Link to github project"
          className="App-link"
          href="https://github.com/elisecode247/dog-facts"
          target="_blank"
          rel="noopener noreferrer"
        >
          github
        </a>
      </footer>
    </>
  );
}

export default App;
