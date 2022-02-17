import { useEffect, useState } from "react";

interface RepositoryDataResponse {
  name: string;
  description: string;
}

function App() {
  const [repositories, setRepositories] = useState<
    Array<RepositoryDataResponse>
  >([]);

  useEffect(() => {
    fetch("http://api.github.com/users/alexandresantosm/repos")
      .then((response) => response.json())
      .then((data) => {
        setRepositories(data);
      });
  }, []);

  return (
    <>
      <h1>Lista de repositórios no GitHub</h1>

      <ul>
        {repositories.map((repository, index) => (
          <li key={`${repository.name}_${index}`}>
            <strong>{repository.name}</strong>
            <p>{repository.description}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
