import { firebaseApp, database } from "@/helper/firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { NextResponse } from "next/server";

const dbInstance = collection(database, "todo");

export async function GET(request: Request) {
  try {
    const querySnapshot = await getDocs(dbInstance);
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return NextResponse.json(data, {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: true,
        message: "Failed to fetch data",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { taskName, status } = body;

    if (!taskName || !status) {
      return NextResponse.json(
        {
          error: true,
          message: "Missing taskName or status",
        },
        {
          status: 400,
        }
      );
    }

    const docRef = await addDoc(dbInstance, {
      createdOn: new Date(),
      taskName,
      status,
    });

    return NextResponse.json(
      {
        id: docRef.id,
        taskName,
        status,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: true,
        message: "Failed to create a new document",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id") as string;
    const body = await request.json();
    const { taskName, status } = body;

    if (!taskName || !status) {
      return NextResponse.json(
        {
          error: true,
          message: "Missing taskName or status",
        },
        {
          status: 400,
        }
      );
    }

    let docRef;

    if (id) {
      docRef = doc(database, "todo", id);
      const docSnapshot = await getDoc(docRef);

      if (!docSnapshot.exists()) {
        return NextResponse.json(
          {
            error: true,
            message: "Document not found",
          },
          {
            status: 404,
          }
        );
      }
    } else {
      docRef = await addDoc(collection(database, "todo"), {
        taskName,
        status,
      });
    }

    await setDoc(docRef, {
      taskName,
      status,
    });

    return NextResponse.json(
      {
        id: docRef.id,
        taskName,
        status,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: true,
        message: "Failed to update the document",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        {
          error: true,
          message: "Missing id parameter",
        },
        {
          status: 400,
        }
      );
    }

    const docRef = doc(database, "todo", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json(
        {
          error: true,
          message: "Document not found",
        },
        {
          status: 404,
        }
      );
    }

    await deleteDoc(docRef);

    return NextResponse.json(
      {
        message: "Document deleted successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: true,
        message: "Failed to delete the document",
      },
      {
        status: 500,
      }
    );
  }
}
