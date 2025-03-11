import { RootState, AppDispatch } from "..";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;