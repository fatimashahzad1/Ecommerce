import React from 'react';
import { Skeleton } from '../ui/skeleton';

const AdminDashboardSkeleton = () => (
    <div className="p-4 md:p-8 max-w-3xl mx-auto bg-gray-50 min-h-[80vh] flex flex-col items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-10 w-full">
            <Skeleton className="h-12 w-2/3 mb-8 rounded mx-auto" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Skeleton className="h-24 rounded-xl w-full" />
                <Skeleton className="h-24 rounded-xl w-full" />
            </div>
        </div>
    </div>
);

export default AdminDashboardSkeleton; 