import { NextRequest, NextResponse } from 'next/server';
import { getDocs, collection, addDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebaseConfig';

export async function GET() {
  try {
    const snapshot = await getDocs(collection(db, 'categories'));
    const categories = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return NextResponse.json(categories, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message ?? 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const category = await req.json();
    const docRef = await addDoc(collection(db, 'categories'), category);
    return NextResponse.json({ id: docRef.id, ...category }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message ?? 'Failed to add category' },
      { status: 500 }
    );
  }
}
