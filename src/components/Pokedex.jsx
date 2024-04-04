import React, { useState, useEffect } from "react";
import axios from "axios";

const GameCard = ({ game, onToggleStatus, onDelete }) => (
  <div className="game-card">
    <h3>{game.name}</h3>
    <p>Developer: {game.developer}</p>
    <p>Year: {game.year}</p>
    <p>Platform: {game.platform}</p>
    <p>Classification: {game.classification}</p>
    <p>Status: {game.status ? "Available" : "Not Available"}</p>
    <button onClick={() => onToggleStatus(game.id)}>Toggle Status</button>
    <button onClick={() => onDelete(game.id)}>Delete Game</button>
  </div>
);

const Searchbar = ({ onSearch }) => (
  <input
    type="text"
    placeholder="Search games..."
    onChange={(e) => onSearch(e.target.value)}
    className="search-bar"
  />
);

const CreateGameForm = ({ onGameCreate }) => {
  const [formData, setFormData] = useState({
    name: '',
    developer: '',
    year: '',
    platform: '',
    classification: '',
    status: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onGameCreate(formData);
    // Reset form
    setFormData({
      name: '',
      developer: '',
      year: '',
      platform: '',
      classification: '',
      status: false,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="create-game-form">
      <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
      <input type="text" name="developer" placeholder="Developer" value={formData.developer} onChange={handleChange} required />
      <input type="number" name="year" placeholder="Year" value={formData.year} onChange={handleChange} required />
      <input type="text" name="platform" placeholder="Platform" value={formData.platform} onChange={handleChange} required />
      <input type="text" name="classification" placeholder="Classification" value={formData.classification} onChange={handleChange} required />
      <label>
        Status: <input type="checkbox" name="status" checked={formData.status} onChange={handleChange} />
      </label>
      <button type="submit">Create Game</button>
    </form>
  );
};

export const GamePokedex = () => {
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState("");
  const [visibleGames, setVisibleGames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/games`);
        setGames(response.data);
      } catch (error) {
        console.error("Error fetching game data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filteredGames = games.filter((game) =>
      game.name.toLowerCase().includes(search.toLowerCase())
    );
    setVisibleGames(filteredGames);
  }, [games, search]);

  const handleSearch = (searchTerm) => {
    setSearch(searchTerm);
  };

  const createGame = async (gameData) => {
    try {
      const response = await axios.post(`http://127.0.0.1:5000/create_game`, gameData);
      setGames([...games, response.data]);
    } catch (error) {
      console.error("Error creating a game:", error);
    }
  };

  const updateGameStatus = async (gameId) => {
    try {
      await axios.get(`http://127.0.0.1:5000/games_update/${gameId}`);
      setGames(games.map(game => game.id === gameId ? { ...game, status: !game.status } : game));
    } catch (error) {
      console.error("Error updating game status:", error);
    }
  };

  const deleteGame = async (gameId) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/games_delete/${gameId}`);
      setGames(games.filter(game => game.id !== gameId));
    } catch (error) {
      console.error("Error deleting game:", error);
    }
  };

  return (
    <>
      <CreateGameForm onGameCreate={createGame} />
      <Searchbar onSearch={handleSearch} />
      <div className="games-container">
        {visibleGames.map((game, index) => (
          <GameCard 
            key={`${game.name}-${index}`} 
            game={game} 
            onToggleStatus={updateGameStatus} 
            onDelete={deleteGame} 
          />
        ))}
      </div>
    </>
  );
};
