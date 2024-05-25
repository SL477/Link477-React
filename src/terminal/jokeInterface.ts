export interface JokeInterface {
  error: boolean;
  category: string;
  type: 'twopart' | 'single';
  joke: string;
  id: number;
  safe: boolean;
  lang: string;
  flags: { [index: string]: boolean };
  setup: string;
  delivery: string;
}
