"use client";
import { AppDispatch, RootState } from "@/store";
import { clearUser, fetchUser, initializeFromStorage } from "@/store/userSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AuthProvider({ children }: { readonly children: React.ReactNode }) {
    const dispatch: AppDispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);

    useEffect(() => {
        if (!user.info && !user.token && !user.loading && !user.error) {
            dispatch(initializeFromStorage());
        }
    }, [dispatch, user.info, user.token, user.loading, user.error]);

    useEffect(() => {
        if (user.token && !user.info && !user.loading && !user.error) {
            dispatch(fetchUser());
        }
    }, [dispatch, user.token, user.info, user.loading, user.error]);

    useEffect(() => {
        if (!user.token && !user.loading) {
            dispatch(clearUser());
        }
    }, [dispatch, user.token, user.loading]);

    return <>{children}</>;
}
