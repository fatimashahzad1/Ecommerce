import { NextRequest, NextResponse } from 'next/server';
import { getDocs, collection, addDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebaseConfig';

export async function GET(req: NextRequest) {
  try {
    const snapshot = await getDocs(collection(db, 'products'));
    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return NextResponse.json(products, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message ?? 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const product = await req.json();
    const docRef = await addDoc(collection(db, 'products'), product);
    return NextResponse.json({ id: docRef.id, ...product }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message ?? 'Failed to add product' },
      { status: 500 }
    );
  }
}
