import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";

interface RepositoryDataResponse {
  name: string;
  description: string;
}

function App() {
  const { data: repositories, isFetching } = useQuery("repos", async () => {
    const response = await axios.get<Array<RepositoryDataResponse>>(
      "https://api.github.com/users/alexandresantosm/repos"
    );

    return response.data;
  });
  return (
    <>
      <h1>Lista de repositórios no GitHub</h1>
      {isFetching && <p>Carregando...</p>}

      <ul>
        {repositories?.map((repository, index) => (
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
