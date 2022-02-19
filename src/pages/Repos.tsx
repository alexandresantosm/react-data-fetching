import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { Repository } from "../entities/Repository";

export function Repos() {
  const { data: repositories, isFetching } = useQuery(
    "repos",
    async () => {
      const response = await axios.get<Array<Repository>>(
        "https://api.github.com/users/alexandresantosm/repos"
      );

      return response.data;
    },
    {
      staleTime: 1000 * 60, // 1 minute
    }
  );
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
