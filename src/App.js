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
  const isPhotoLoading = !dogImageUrl;
  const isFactLoading = !dogFact;
  const imageStyle = {
    margin: 'auto',
    minWidth: '250px',
    width: 'auto',
    height: '250px'
  };

  useEffect(() => {
    document.title = 'Dogs Facts';
    setDogImageUrl('');
    fetchDogImage().then(() => {
      setDogFact(dogFacts[getRandomInt(dogFactsCount)].fact)
    });
  }, []);

  async function fetchDogImage() {
    const dogImageResponse = await fetch('https://random.dog/woof.json');
    const dogImage = await dogImageResponse.json();

    if (dogImage) {
      setTimeout(() => setDogImageUrl(dogImage.url), 3000);
    }
  }

  function handleClickNewPhoto() {
    setDogImageUrl('');
    fetchDogImage();
  }

  function handleClickNewFact() {
    setDogFact('');
    setTimeout(() => setDogFact(dogFacts[getRandomInt(dogFactsCount)].fact), 1000);
  }

  return (
    <>
      <header>
        <h1> Dog Facts </h1>
      </header>
      <main className="App" style={isPhotoLoading ? loadingMainStyle : loadedMainStyle}>
        {isPhotoLoading ?
          (<LoadingDog />) :
          (<img alt="random dog" className="App-logo image-container" src={dogImageUrl} style={imageStyle} />)
        }
        <p>{dogFact}</p>
        <div>
          <button onClick={handleClickNewPhoto}>
            {isPhotoLoading ? 'loading...' : 'Get New Photo' }
          </button>
          <button onClick={handleClickNewFact}>
            {isFactLoading ? 'loading...' : 'Get New Fact'}
          </button>
        </div>
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
