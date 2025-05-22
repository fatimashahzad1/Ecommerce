import AdminRouteGuard from "@/components/ui/AdminRouteGuard";

export default function AdminLayout({
    children,
}: {
    readonly children: React.ReactNode;
}) {
    return (
        <AdminRouteGuard>
            {children}
        </AdminRouteGuard>
    );
}
