import { courses } from './../../../db/schema';
import db from "@/db/drizzle"
import { isAdmin } from "@/lib/admin";
import { NextRequest, NextResponse } from "next/server";



export const GET = async () => {
  const data = await db.query.courses.findMany();

  if(!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  return NextResponse.json(data);
};

export const POST = async (req: NextRequest) => {
  if(!isAdmin()) {
    return new NextResponse("Unauthorized", {status: 401});
  };

  const body = await req.json();

  const data = await db.insert(courses).values({
    ...body
  }).returning();

  return NextResponse.json(data[0])
};