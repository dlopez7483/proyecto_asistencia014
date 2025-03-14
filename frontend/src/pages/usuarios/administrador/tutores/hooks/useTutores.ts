import { useUsersActions } from "@common/store/hooks/useUsersActions";
import { getUsuarios } from "../services/getUsuarios";

export const useTutores = () => {
  const { setTutores } = useUsersActions();

  const getTutores = async () => {
    getUsuarios().then((res) => {
      if (res.status === 200) {
        setTutores(res.auxiliares);
      } else {
        setTutores([]);
        console.log(res);
      }
    });
  };

  return { getTutores };
};
