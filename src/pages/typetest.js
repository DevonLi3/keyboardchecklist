//this will be the typetest file

import { useState, useEffect, useRef } from 'react';
import {count, generate, wordList} from 'random-words';
import 'bootstrap/dist/css/bootstrap.min.css';

const NUMB_OF_WORDS = 200;
const SECONDS = 60;

function TypeTest() {
  const [words, setWords] = useState([]);
  const [countDown, setCountDown] = useState(SECONDS);
  const [currInput, setCurrInput] = useState('');
  const [currWordIndex, setCurrWordIndex] = useState(0);
  const [currCharIndex, setCurrCharIndex] = useState(-1);
  const [currChar, setCurrChar] = useState('');
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [status, setStatus] = useState('waiting');
  const textInput = useRef(null);

  useEffect(() => {
    setWords(generateWords());
  }, []);

  useEffect(() => {
    if (status === 'started') {
      textInput.current.focus();
    }
  }, [status]);

  function generateWords() {
    return new Array(NUMB_OF_WORDS).fill(null).map(() => generate());
  }

  function start() {
    if (status === 'finished') {
      setWords(generateWords());
      setCurrWordIndex(0);
      setCorrect(0);
      setIncorrect(0);
      setCurrCharIndex(-1);
      setCurrChar('');
    }

    if (status !== 'started') {
      setStatus('started');
      let interval = setInterval(() => {
        setCountDown((prevCountdown) => {
          if (prevCountdown === 0) {
            clearInterval(interval);
            setStatus('finished');
            setCurrInput('');
            return SECONDS;
          } else {
            return prevCountdown - 1;
          }
        });
      }, 1000);
    }
  }

  function handleKeyDown({ keyCode, key }) {
    // space bar
    if (keyCode === 32) {
      checkMatch();
      setCurrInput('');
      setCurrWordIndex(currWordIndex + 1);
      setCurrCharIndex(-1);
    } else if (keyCode === 8) {
      // backspace
      setCurrCharIndex(currCharIndex - 1);
      setCurrChar('');
    } else {
      setCurrCharIndex(currCharIndex + 1);
      setCurrChar(key);
    }
  }

  function checkMatch() {
    const wordToCompare = words[currWordIndex];
    const doesItMatch = wordToCompare === currInput.trim();
    if (doesItMatch) {
      setCorrect(correct + 1);
    } else {
      setIncorrect(incorrect + 1);
    }
  }

  function getCharClass(wordIdx, charIdx, char) {
    if (wordIdx === currWordIndex && charIdx === currCharIndex && currChar && status !== 'finished') {
      if (char === currChar) {
        return 'bg-success text-white';
      } else {
        return 'bg-danger text-white';
      }
    } else if (wordIdx === currWordIndex && currCharIndex >= words[currWordIndex].length) {
      return 'bg-danger text-white';
    } else {
      return '';
    }
  }

  return (
    <div className="TypeTest">
      <div className="container mt-5">
        <div className="text-center mb-4">
          <h2>{countDown}</h2>
        </div>
        <div className="mb-4">
          <input
            ref={textInput}
            disabled={status !== 'started'}
            type="text"
            className="form-control"
            onKeyDown={handleKeyDown}
            value={currInput}
            onChange={(e) => setCurrInput(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <button className="btn btn-info w-100" onClick={start}>
            Start
          </button>
        </div>
        {status === 'started' && (
          <div className="card">
            <div className="card-body">
              <div className="content">
                {words.map((word, i) => (
                  <span key={i}>
                    <span>
                      {word.split('').map((char, idx) => (
                        <span className={getCharClass(i, idx, char)} key={idx}>
                          {char}
                        </span>
                      ))}
                    </span>
                    <span> </span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
        {status === 'finished' && (
          <div className="row mt-4">
            <div className="col text-center">
              <p className="h5">Words per minute:</p>
              <p className="h1 text-primary">{correct}</p>
            </div>
            <div className="col text-center">
              <p className="h5">Accuracy:</p>
              {correct !== 0 ? (
                <p className="h1 text-info">{Math.round((correct / (correct + incorrect)) * 100)}%</p>
              ) : (
                <p className="h1 text-info">0%</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TypeTest;
