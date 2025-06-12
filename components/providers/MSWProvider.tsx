// src/components/providers/MSWProvider.tsx
'use client';

import { useEffect, useState } from 'react';
import { worker } from '@/tests/mocks/msw/browser';
import { rest } from 'msw';

export function MSWProvider({ children }: { children: React.ReactNode }) {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        worker.start({ onUnhandledRequest: 'bypass' }).then(() => {
            // Check query param and override handler if needed
            const shouldFail = new URLSearchParams(window.location.search).get('fail');

            if (shouldFail === 'true') {
                worker.use(
                    rest.get('http://localhost:3000/api/categories', (req, res, ctx) => {
                        return res(ctx.status(500), ctx.json({ error: 'Forced Failure' }));
                    })
                );
            }

            setReady(true);
        });
    }, []);

    if (!ready) return null; // block render until ready

    return <>{children}</>;
}
