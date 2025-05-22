'use client';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import AdminDashboardSkeleton from "../skeleton/AdminDashboardSkeleton";

interface AdminRouteGuardProps {
    readonly children: React.ReactNode;
}

export default function AdminRouteGuard({ children }: AdminRouteGuardProps) {
    const { user, isAdmin, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const checkAdmin = async () => {
            const getCookie = (name: string) => {
                const value = `; ${document.cookie}`;
                const parts = value.split(`; ${name}=`);
                if (parts.length === 2) return parts.pop()!.split(';').shift();
            };
            const token = getCookie('firebaseToken');
            const res = await fetch('/api/verify-admin', {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
                // User is admin, show admin UI
            } else {
                // Not admin, redirect or hide admin UI
                router.replace('/');
            }
        };
        checkAdmin();
    }, [user, isAdmin, loading, router]);

    if (loading || !user) {
        return <AdminDashboardSkeleton />
    }

    if (!isAdmin) {
        return null;
    }

    return <>{children}</>;
} 