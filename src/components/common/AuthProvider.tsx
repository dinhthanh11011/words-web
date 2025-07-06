"use client";
import { AppDispatch, RootState } from "@/store";
import { clearUser, fetchUser, setToken } from "@/store/userSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AuthProvider({ children }: { readonly children: React.ReactNode }) {
    const dispatch: AppDispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken && !user.token) {
            dispatch(setToken(savedToken));
        }
    }, [dispatch, user.token]);

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
