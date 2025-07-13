"use client";
import { AppDispatch, RootState } from "@/store";
import { clearToken, clearUser } from "@/store/userSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslations } from "next-intl";

export default function AuthGuard({ children }: { readonly children: React.ReactNode }) {
    const router = useRouter();
    const token = useSelector((state: RootState) => state.user.token);
    const initializing = useSelector((state: RootState) => state.user.initializing);
    const t = useTranslations('AuthGuard');

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

    if (initializing) {
        return (
            <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-400">
                    {t('loading')}
                </p>
            </div>
        );
    }

    if (!token) {
        return null;
    }

    return <>{children}</>;
}
