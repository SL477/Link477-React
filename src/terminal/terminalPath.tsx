import styles from './terminal.module.css';

interface TerminalPathProps {
  path: string;
}

export default function TerminalPath(props: TerminalPathProps) {
  return (
    <span className={styles.terminalLabel}>
      guest@link477.com<span className={styles.greyText}>:</span>
      <span className={styles.blueText}>{props.path}</span>
      <span className={styles.greyText}>$</span>&nbsp;
    </span>
  );
}
