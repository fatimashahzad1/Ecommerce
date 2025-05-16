import { deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase/firebaseConfig';
import { NextResponse, NextRequest } from 'next/server';

// Update category
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const data = await req.json();
    await updateDoc(doc(db, 'categories', id), data);
    return NextResponse.json({ id, ...data }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message ?? 'Failed to update category' },
      { status: 500 }
    );
  }
}

// Delete category
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    await deleteDoc(doc(db, 'categories', id));
    return NextResponse.json({ id }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message ?? 'Failed to delete category' },
      { status: 500 }
    );
  }
}
