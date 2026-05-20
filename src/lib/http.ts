import { NextResponse } from "next/server";

export function apiSuccess<T>(data: T, message?: string, status = 200) {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
    },
    { status },
  );
}

export function apiError(message: string, status = 400, errors?: Record<string, string>) {
  return NextResponse.json(
    {
      success: false,
      message,
      errors,
    },
    { status },
  );
}
