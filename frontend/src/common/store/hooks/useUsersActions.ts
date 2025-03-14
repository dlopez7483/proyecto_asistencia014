import { useAppDispatch } from "./useStoreHooks";
import {
  setNewTutorReducer,
  setTutoresReducer,
  updateTutorReducer,
  deleteTutorReducer,
  restTutoresReducer,
} from "../slices/usersSlice";
import { User } from "@common/interfaces/User";

export const useUsersActions = () => {
  const dispatch = useAppDispatch();

  const setTutores = (tutores:User[]) => {
    dispatch(setTutoresReducer(tutores));
  };

  const setNewTutor = (tutor:User) => {
    dispatch(setNewTutorReducer(tutor));
  };

  const updateTutor = (tutor:User) => {
    dispatch(updateTutorReducer(tutor));
  };

  const deleteTutor = (id_usuario:number) => {
    dispatch(deleteTutorReducer(id_usuario));
  };

  const restTutores = () => {
    dispatch(restTutoresReducer());
  };

  return {
    setTutores,
    setNewTutor,
    updateTutor,
    deleteTutor,
    restTutores,
  };
};
