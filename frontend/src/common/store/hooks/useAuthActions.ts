import { useAppDispatch } from "@common/store/hooks/storeHook";
import { deleteAuthReducer, setAuthReducer } from "@common/store/slices/authSlice";
import { Auth } from "@pages/login/interfaces/Auth";

export const useAuthActions = () => {
  const dispatch = useAppDispatch();

  const setAuthAction = (auth: Auth) => {
    dispatch(setAuthReducer(auth));
  };

  const deleteAuthAction = () => {
    dispatch(deleteAuthReducer());
  };

  return { setAuthAction, deleteAuthAction };
};
