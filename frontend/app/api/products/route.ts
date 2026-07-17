import { NextResponse } from "next/server";
import { products } from "@/services/productsData";

export async function GET() {
  return NextResponse.json(products);
}
