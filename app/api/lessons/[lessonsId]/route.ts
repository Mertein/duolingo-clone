import { NextResponse } from 'next/server';
import db from "@/db/drizzle"
import { lessons } from "@/db/schema"
import { eq } from "drizzle-orm"
import { isAdmin } from '@/lib/admin';


export const GET = async (
  req: Request, 
  {params} : {params: {lessonsId: number}},
) => {

  if(!isAdmin()) {
    return new NextResponse("Unauthorized", {status: 403});
  };
  
  const data = await db.query.lessons.findMany({
    where: eq(lessons.id, params.lessonsId)
  });

  return NextResponse.json(data[0]);
}


export const PUT = async (
  req: Request, 
  {params} : {params: {lessonsId: number}},
) => {
  if(!isAdmin()) {
    return new NextResponse("Unauthorized", {status: 403});
  };

  const body = await req.json();
  
  const data= await db.update(lessons).set({
    ...body,
  }).where(eq(lessons.id, params.lessonsId)).returning();

  return NextResponse.json(data[0]);
};

export const DELETE = async (
  req: Request, 
  {params} : {params: {lessonsId: number}},
) => {

  if(!isAdmin()) {
    return new NextResponse("Unauthorized", {status: 403});
  };
  
  const data= await db.delete(lessons).where(eq(lessons.id, params.lessonsId)).returning();

  return NextResponse.json(data[0]);
}
