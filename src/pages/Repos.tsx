import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

interface RepositoryDataResponse {
  name: string;
  description: string;
}

export function Repos() {
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
            <Link to={`repos/${repository.name}`}>{repository.name}</Link>
            <p>{repository.description}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
