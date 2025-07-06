"use client";
import { AppDispatch, RootState } from "@/store";
import { clearToken, clearUser } from "@/store/userSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AuthGuard({ children }: { readonly children: React.ReactNode }) {
    const router = useRouter();
    const token = useSelector((state: RootState) => state.user.token);
    const initializing = useSelector((state: RootState) => state.user.initializing);

    const dispatch: AppDispatch = useDispatch();
    const error = useSelector((state: RootState) => state.user.error);

    useEffect(() => {
        if (!initializing && !token) {
            router.replace("/login");
        }
    }, [router, token, initializing]);

    useEffect(() => {
        if (error) {
            dispatch(clearUser());
            dispatch(clearToken());
            router.replace("/login");
        }
    }, [error, router, dispatch]);

    return <>{children}</>;
}
