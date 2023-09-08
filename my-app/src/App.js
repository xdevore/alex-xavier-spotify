import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <meta charset="utf-8"/>
        <title>My Spotify Profile</title>
        <form>
          <label>
            username:
            <input type="text" name="name" />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <script src="src/script.js" type="module"></script>
      </header>
    </div>
  );
}

export default App;
