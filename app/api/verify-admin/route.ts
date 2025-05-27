import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/firebase/firebaseAdminConfig';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.split('Bearer ')[1];
  if (!token) {
    return NextResponse.json({ error: 'No token' }, { status: 401 });
  }

  try {
    const decoded = await adminAuth.verifyIdToken(token);
    const userDoc = await adminDb.doc(`users/${decoded.uid}`).get();
    const userData = userDoc.data();
    if (!userDoc.exists || !userData || !userData.isAdmin) {
      return NextResponse.json({ error: 'Not admin' }, { status: 403 });
    }
    return NextResponse.json({ isAdmin: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}
