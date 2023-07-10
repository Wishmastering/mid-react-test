import "./App.css";

function App() {
  return (
    <div className="page">
      <h1>Prueba Tecnica</h1>
      <header>
        <form>
          <label htmlFor="searchBar">Search Movie Here...</label>
          <input
            type="text"
            placeholder="Avengers, Matrix, LOTR..."
            name="searchBar"
          />
          <button type="submit"> Search </button>
        </form>
      </header>

      <main>Aqui Iran Los Resultados</main>

      <main>{/* Movies Will Go Here */}</main>
    </div>
  );
}

export default App;
