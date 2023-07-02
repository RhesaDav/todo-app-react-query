import { firebaseApp } from "@/helper/firebase";
import { getAuth, signInWithEmailAndPassword, AuthError } from "firebase/auth";
import { NextResponse } from "next/server";

type FirebaseError = {
  code: string;
  customData: Record<string, unknown>;
  name: string;
};

const auth = getAuth(firebaseApp);

export async function POST(request: Request) {
  const body = await request.text();
  const { email, password } = JSON.parse(body);
  console.log(body);

  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    console.log(result);
    return NextResponse.json(result.user, {
      status: 200,
    });
  } catch (error: unknown) {
    if (error) {
      const firebaseError = error as FirebaseError;
      if (firebaseError.code === "auth/wrong-password") {
        return NextResponse.json(
          {
            error: true,
            message: "Invalid password",
          },
          {
            status: 400,
          }
        );
      } else if (firebaseError.code === "auth/user-not-found") {
        return NextResponse.json(
          {
            error: true,
            message: "User not found",
          },
          {
            status: 400,
          }
        );
      } else {
        return NextResponse.json(
          {
            error: true,
            message: "Authentication error",
          },
          {
            status: 400,
          }
        );
      }
    } else {
      return NextResponse.json(
        {
          error: true,
          message: "Unknown error occurred",
        },
        {
          status: 500,
        }
      );
    }
  }
}
