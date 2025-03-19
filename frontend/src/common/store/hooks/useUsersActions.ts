import { useAppDispatch } from "./";
import {
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

  const updateTutor = (tutor:User) => {
    dispatch(updateTutorReducer(tutor));
  };

  const deleteTutor = (tutor:User) => {
    dispatch(deleteTutorReducer(tutor));
  };

  const restTutores = () => {
    dispatch(restTutoresReducer());
  };

  return {
    setTutores,
    updateTutor,
    deleteTutor,
    restTutores,
  };
};
