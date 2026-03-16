import { NextResponse } from "next/server";
import cocktails from "./cocktails.json";

export async function GET() {
  return NextResponse.json(cocktails);
}
