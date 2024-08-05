import { NextResponse } from 'next/server';
import db from "@/db/drizzle"
import { challengesOptions } from "@/db/schema"
import { eq } from "drizzle-orm"
import { isAdmin } from '@/lib/admin';


export const GET = async (
  req: Request, 
  {params} : {params: {challengesOptionsId: number}},
) => {

  if(!isAdmin()) {
    return new NextResponse("Unauthorized", {status: 403});
  };
  
  const data = await db.query.challengesOptions.findMany({
    where: eq(challengesOptions.id, params.challengesOptionsId)
  });

  return NextResponse.json(data[0]);
}


export const PUT = async (
  req: Request, 
  {params} : {params: {challengesOptionsId: number}},
) => {
  if(!isAdmin()) {
    return new NextResponse("Unauthorized", {status: 403});
  };

  const body = await req.json();
  
  const data= await db.update(challengesOptions).set({
    ...body,
  }).where(eq(challengesOptions.id, params.challengesOptionsId)).returning();

  return NextResponse.json(data[0]);
};

export const DELETE = async (
  req: Request, 
  {params} : {params: {challengesOptionsId: number}},
) => {

  if(!isAdmin()) {
    return new NextResponse("Unauthorized", {status: 403});
  };
  
  const data= await db.delete(challengesOptions).where(eq(challengesOptions.id, params.challengesOptionsId)).returning();

  return NextResponse.json(data[0]);
}
