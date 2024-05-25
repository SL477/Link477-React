import styles from './terminal.module.css';
import { useState, useEffect } from 'react';
import { JokeInterface } from './jokeInterface';

export const banner = `
.____    .__        __        _______________________ 
|    |   |__| ____ |  | __   /  |  \\______  \\______  \\
|    |   |  |/    \\|  |/ /  /   |  |_  /    /   /    /
|    |___|  |   |  \\    <  /    ^   / /    /   /    / 
|_______ \\__|___|  /__|_ \\ \\____   | /____/   /____/  
        \\/       \\/     \\/      |__|                  
`;

export default function Terminal() {
  const [terminalText, setTerminalText] = useState<string | null>('');
  const [terminalHistory, setTerminalHistory] = useState<string[]>([]);
  const [terminalOutput, setTerminalOutput] = useState<string[][]>([]);
  const [terminalPath, setTerminalPath] = useState('~');
  const [getJoke, setGetJoke] = useState(false);
  const [jokeText, setJokeText] = useState('');
  const [historyIndex, setHistoryIndex] = useState(0);
  const [getHistory, setGetHistory] = useState(false);
  const [terminalSpan, setTerminalSpanRef] = useState<HTMLSpanElement | null>();

  const commands: { [index: string]: string } = {
    cd: 'Change Directory',
    clear: 'Wipes the input',
    credits: 'Show the credits',
    echo: 'Display the given text',
    help: 'Shows the commands',
    joke: 'Gets a joke from the Joke API',
    ls: 'List the directory structure',
  };

  const fileDirectory: { [index: string]: string } = {
    education: `education
* Oxford Brookes: "Mathematics" 2009-2012
* City University of London: "Data Science" 2021-2022`,
    skills: `languages
* JavaScrip/TypeScript
* Python
* SQL
* C#
* VB.Net
* XSLT

tools
* Docker
* Git`,
  };

  const credits = `Inspired by https://www.freecodecamp.org/news/how-to-create-interactive-terminal-based-portfolio/, but I decided to make the terminal from scratch!
  
Libraries used:
* React
* Vite

https://patorjk.com/software/taag/ I used to create the ASCII art.

Joke API - https://jokeapi.dev/, for getting the jokes`;

  const clearTerminal = () => {
    if (terminalSpan) {
      terminalSpan.textContent = '';
    }
    setTerminalText('');
  };

  const runCommands = () => {
    if (terminalText) {
      const commandBeingRun = getCommandBeingRun();
      if (commandBeingRun === 'clear') {
        setTerminalOutput([]);
      } else if (commandBeingRun === 'help') {
        const newTerminalOutput = [...terminalOutput];
        let helpOutput = '';
        for (const key in commands) {
          helpOutput += `${key}: ${commands[key]}\n`;
        }
        newTerminalOutput.push([terminalText, helpOutput, terminalPath]);
        setTerminalOutput(newTerminalOutput);
      } else if (commandBeingRun === 'ls') {
        const splitTerminalText = terminalText.toLowerCase().split(' ');
        let requestedDirectory = terminalPath;
        if (splitTerminalText.length > 1) {
          requestedDirectory = splitTerminalText[1];
        }

        let lsOutput = '';
        let isError = false;
        if (['~', '..'].includes(requestedDirectory)) {
          for (const key in fileDirectory) {
            lsOutput += `${key}\n`;
          }
        } else if (
          requestedDirectory.startsWith('~/') &&
          requestedDirectory.replace('~/', '') in fileDirectory
        ) {
          lsOutput += fileDirectory[requestedDirectory.replace('~/', '')];
        } else if (
          terminalPath === '~' &&
          requestedDirectory in fileDirectory
        ) {
          lsOutput += fileDirectory[requestedDirectory];
        } else {
          lsOutput += 'Invalid directory';
          isError = true;
        }

        const newTerminalOutput = [...terminalOutput];
        if (isError) {
          newTerminalOutput.push([
            terminalText,
            lsOutput,
            terminalPath,
            styles.redText,
          ]);
        } else {
          newTerminalOutput.push([terminalText, lsOutput, terminalPath]);
        }
        setTerminalOutput(newTerminalOutput);
      } else if (commandBeingRun === 'cd') {
        const splitTerminalText = terminalText.toLowerCase().split(' ');
        if (splitTerminalText.length > 1) {
          // Changing
          let newDirectory = '';
          const requestedDirectory = splitTerminalText[1];
          if (requestedDirectory === '..' && terminalPath !== '~') {
            newDirectory = '~';
          } else if (
            terminalPath === '~' &&
            requestedDirectory in fileDirectory
          ) {
            newDirectory = `~/${requestedDirectory}`;
          } else if (
            terminalPath.startsWith('~/') &&
            requestedDirectory.startsWith('~/') &&
            requestedDirectory.replace('~/', '') in fileDirectory
          ) {
            newDirectory = requestedDirectory;
          }

          const newTerminalOutput = [...terminalOutput];
          if (newDirectory === '') {
            newTerminalOutput.push([
              terminalText,
              'Wrong directory',
              terminalPath,
              styles.redText,
            ]);
          } else {
            newTerminalOutput.push([terminalText, '', terminalPath]);
            setTerminalPath(newDirectory);
          }
          setTerminalOutput(newTerminalOutput);
        } else {
          // no change
          const newTerminalOutput = [...terminalOutput];
          newTerminalOutput.push([terminalText, '', terminalPath]);
          setTerminalOutput(newTerminalOutput);
        }
      } else if (commandBeingRun === 'echo') {
        let echoText = '';
        if (terminalText.toLowerCase().startsWith('echo')) {
          echoText = terminalText.substring(5);
        }

        const newTerminalOutput = [...terminalOutput];
        newTerminalOutput.push([
          terminalText,
          echoText,
          terminalPath,
          styles.greyText,
        ]);
        setTerminalOutput(newTerminalOutput);
      } else if (commandBeingRun === 'credits') {
        const newTerminalOutput = [...terminalOutput];
        newTerminalOutput.push([
          terminalText,
          credits,
          terminalPath,
          styles.greyText,
        ]);
        setTerminalOutput(newTerminalOutput);
      } else if (commandBeingRun === 'joke') {
        setGetJoke(true);
      } else {
        const newTerminalOutput = [...terminalOutput];
        newTerminalOutput.push([
          terminalText,
          `Command '${terminalText}' Not Found!`,
          terminalPath,
          styles.redText,
        ]);
        setTerminalOutput(newTerminalOutput);
      }

      const newHist = [...terminalHistory];
      newHist.push(terminalText);
      setTerminalHistory(newHist);
      clearTerminal();
    } else {
      const newTerminalOutput = [...terminalOutput];
      newTerminalOutput.push(['', '', terminalPath]);
      setTerminalOutput(newTerminalOutput);
    }
  };

  const selectLastElementOfTerminalText = () => {
    if (terminalSpan) {
      const range = document.createRange();
      range.setStart(terminalSpan, 1);
      range.collapse(true);

      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  };

  const getCommandBeingRun = () => {
    if (terminalText) {
      // eslint-disable-next-line no-irregular-whitespace
      const newTerminalText = terminalText.replace(/ /g, ' ');
      const newTerminalTextSplit = newTerminalText.split(' ');
      if (newTerminalTextSplit.length > 0) {
        const newCommand = newTerminalTextSplit[0].toLowerCase();
        if (newCommand in commands) {
          return newCommand;
        }
      }
    }
    return '';
  };

  const autoComplete = () => {
    if (terminalSpan) {
      if (terminalText?.includes(' ') || terminalText?.includes(' ')) {
        // there is a space
        const commandBeingRun = getCommandBeingRun();
        if (commandBeingRun === 'ls' || commandBeingRun === 'cd') {
          // eslint-disable-next-line no-irregular-whitespace
          const newTerminalText = terminalText.replace(/ /g, ' ');
          const newTerminalTextSplit = newTerminalText.split(' ');
          if (newTerminalTextSplit.length === 2) {
            const requestedDirectory = newTerminalTextSplit[1];
            const paths = [];
            for (const key in fileDirectory) {
              paths.push(key);
            }
            const match = paths.filter((e) =>
              new RegExp(
                `^${requestedDirectory.replace('~/', '')}.*`,
                'ig'
              ).test(e)
            );
            if (match.length > 0) {
              if (
                terminalPath === '~' ||
                (terminalPath !== '~' && requestedDirectory.startsWith('~/'))
              ) {
                const newCmd = `${commandBeingRun} ${requestedDirectory.startsWith('~/') ? '~/' : ''}${match[0]}`;
                setTerminalText(newCmd);
                terminalSpan.textContent = newCmd;
                selectLastElementOfTerminalText();
              }
            }
          }
        }
      } else {
        const words = [];
        for (const key in commands) {
          words.push(key);
        }
        const match = words.filter((e) =>
          new RegExp(`^${terminalText}.*`, 'ig').test(e)
        );
        if (match.length > 0) {
          setTerminalText(match[0]);
          terminalSpan.textContent = match[0];
          selectLastElementOfTerminalText();
        }
      }
      terminalSpan.focus();
    }
  };

  useEffect(() => {
    if (getJoke) {
      fetch(
        'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,racist,sexist,explicit'
      )
        .then((data) => data.json())
        .then((data: JokeInterface) => {
          let theJoke = '';
          if (data.type === 'single') {
            theJoke = data.joke;
          } else if (data.type === 'twopart') {
            theJoke = `${data.setup}
${data.delivery}`;
          } else {
            theJoke = 'Sorry, no joke';
          }

          let i = 1;
          const jokeIntervalId = setInterval(() => {
            setJokeText(theJoke.slice(0, i));
            i++;
            if (i >= theJoke.length) {
              clearInterval(jokeIntervalId);
              setGetJoke(false);
              const newTerminalOutput = [...terminalOutput];
              newTerminalOutput.push(['joke', theJoke, terminalPath]);
              setTerminalOutput(newTerminalOutput);
              setJokeText('');
            }
          }, 50);
        })
        .catch((ex) => {
          console.error(ex);
          setGetJoke(false);
          const newTerminalOutput = [...terminalOutput];
          newTerminalOutput.push(['joke', 'Sorry no joke', terminalPath]);
          setTerminalOutput(newTerminalOutput);
        });
    }
  }, [getJoke, terminalOutput, terminalPath]);

  useEffect(() => {
    if (terminalSpan) {
      terminalSpan.focus();
    }
  }, [terminalSpan]);

  useEffect(() => {
    if (getHistory) {
      if (terminalSpan) {
        terminalSpan.textContent = terminalHistory[historyIndex];
        setTerminalText(terminalHistory[historyIndex]);
        setGetHistory(false);
      }
    }
  }, [historyIndex, terminalHistory, getHistory, terminalSpan]);

  return (
    <div className={styles.terminalBox}>
      <pre className={styles.banner}>{banner}</pre>
      <p>Welcome to my Terminal Portfolio</p>
      {terminalOutput.map((priorCmd, j) => {
        return (
          <div key={j}>
            <span className={styles.terminalLabel}>
              guest@link477.com<span className={styles.greyText}>:</span>
              <span className={styles.blueText}>{priorCmd[2]}</span>
              <span className={styles.greyText}>$</span>&nbsp;
            </span>
            <span>{priorCmd[0]}</span>

            <pre className={priorCmd.length >= 4 ? priorCmd[3] : ''}>
              {priorCmd[1]}
            </pre>
          </div>
        );
      })}
      <span className={styles.terminalLabel}>
        guest@link477.com<span className={styles.greyText}>:</span>
        <span className={styles.blueText}>{terminalPath}</span>
        <span className={styles.greyText}>$</span>&nbsp;
      </span>
      {getJoke ? (
        <>
          <span className={styles.terminal}>Joke</span>
          <pre className={styles.outputText}>{jokeText}</pre>
        </>
      ) : (
        <span
          role="textbox"
          aria-label="Console text input"
          id="terminal"
          key="terminal"
          className={styles.terminal}
          contentEditable
          onInput={(e) => setTerminalText(e.currentTarget.textContent)}
          onKeyDown={(e) => {
            if (e.key == 'Enter') {
              runCommands();
              e.preventDefault();
            } else if (e.key == 'ArrowUp') {
              let newHistIndex = historyIndex - 1;
              if (newHistIndex < 0) {
                newHistIndex = terminalHistory.length - 1;
              }
              setHistoryIndex(newHistIndex);
              setGetHistory(true);
              e.preventDefault();
            } else if (e.key == 'ArrowDown') {
              let newHistIndex = historyIndex + 1;
              if (newHistIndex >= terminalHistory.length) {
                newHistIndex = 0;
              }
              setHistoryIndex(newHistIndex);
              setGetHistory(true);
              e.preventDefault();
            } else if (e.key === 'Tab') {
              autoComplete();
              e.preventDefault();
            }
          }}
          tabIndex={0}
          autoFocus={true}
          ref={(e) => setTerminalSpanRef(e)}
        ></span>
      )}
    </div>
  );
}
