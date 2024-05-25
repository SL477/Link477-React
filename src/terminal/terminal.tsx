import styles from './terminal.module.css';
import { useState } from 'react';

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

  const commands: { [index: string]: string } = {
    cd: 'Change Directory',
    clear: 'Wipes the input',
    help: 'Shows the commands',
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

  const clearTerminal = () => {
    const terminalSpan = document.getElementById('terminal');
    if (terminalSpan) {
      terminalSpan.textContent = '';
    }
    setTerminalText('');
  };

  const runCommands = () => {
    if (terminalText) {
      if (terminalText.toLowerCase() === 'clear') {
        setTerminalOutput([]);
      } else if (terminalText.toLowerCase() === 'help') {
        const newTerminalOutput = [...terminalOutput];
        let helpOutput = '';
        for (const key in commands) {
          helpOutput += `${key}: ${commands[key]}\n`;
        }
        newTerminalOutput.push([terminalText, helpOutput, terminalPath]);
        setTerminalOutput(newTerminalOutput);
      } else if (
        terminalText.toLowerCase().startsWith('ls ') ||
        terminalText.toLowerCase() === 'ls'
      ) {
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
      } else if (
        terminalText.toLowerCase() === 'cd' ||
        terminalText.toLowerCase().startsWith('cd ')
      ) {
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

  return (
    <div className={styles.terminalBox}>
      <pre className={styles.banner}>{banner}</pre>
      <p>Welcome to my Terminal Portfolio</p>
      {terminalOutput.map((priorCmd) => {
        return (
          <>
            <span className={styles.terminalLabel}>
              guest@link477.com<span className={styles.greyText}>:</span>
              <span className={styles.blueText}>{priorCmd[2]}</span>
              <span className={styles.greyText}>$</span>&nbsp;
            </span>
            <span>{priorCmd[0]}</span>

            <pre className={priorCmd.length >= 4 ? priorCmd[3] : ''}>
              {priorCmd[1]}
            </pre>
          </>
        );
      })}
      <span className={styles.terminalLabel}>
        guest@link477.com<span className={styles.greyText}>:</span>
        <span className={styles.blueText}>{terminalPath}</span>
        <span className={styles.greyText}>$</span>&nbsp;
      </span>
      <span
        id="terminal"
        className={styles.terminal}
        contentEditable
        onInput={(e) => setTerminalText(e.currentTarget.textContent)}
        onKeyDown={(e) => {
          if (e.key == 'Enter') {
            runCommands();
            e.preventDefault();
          }
        }}
        tabIndex={1}
      ></span>
    </div>
  );
}
