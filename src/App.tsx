import { useEffect, useState } from "react";
import axios from "axios";
import { useFetch } from "./hooks/useFetch";

interface RepositoryDataResponse {
  name: string;
  description: string;
}

function App() {
  const { data: repositories, isFetching } = useFetch<
    Array<RepositoryDataResponse>
  >("http://api.github.com/users/alexandresantosm/repos");

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
