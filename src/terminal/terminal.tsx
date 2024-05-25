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

  const commands: { [index: string]: string } = {
    clear: 'Wipes the input',
    help: 'Shows the commands',
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
        newTerminalOutput.push([terminalText, helpOutput]);
        setTerminalOutput(newTerminalOutput);
      }

      const newHist = [...terminalHistory];
      newHist.push(terminalText);
      setTerminalHistory(newHist);
      clearTerminal();
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
              <span className={styles.blueText}>~</span>
              <span className={styles.greyText}>$</span>&nbsp;
            </span>
            <span>{priorCmd[0]}</span>
            <pre>{priorCmd[1]}</pre>
          </>
        );
      })}
      <span className={styles.terminalLabel}>
        guest@link477.com<span className={styles.greyText}>:</span>
        <span className={styles.blueText}>~</span>
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
