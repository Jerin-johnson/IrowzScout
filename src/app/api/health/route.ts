import { NextResponse } from "next/server";

import { connectToDatabase } from "@/infrastructure/database/connection";

export async function GET() {
  try {
    await connectToDatabase();

    return NextResponse.json({
      success: true,
      database: "connected",
    });
  } catch (error) {
    console.error("Database connection failed:", error);

    return NextResponse.json(
      {
        success: false,
        database: "disconnected",
      },
      {
        status: 500,
      },
    );
  }
}
