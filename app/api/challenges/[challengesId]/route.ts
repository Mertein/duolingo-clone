import { NextResponse } from 'next/server';
import db from "@/db/drizzle"
import { challenges } from "@/db/schema"
import { eq } from "drizzle-orm"
import { isAdmin } from '@/lib/admin';


export const GET = async (
  req: Request, 
  {params} : {params: {challengesId: number}},
) => {

  if(!isAdmin()) {
    return new NextResponse("Unauthorized", {status: 403});
  };
  
  const data = await db.query.challenges.findMany({
    where: eq(challenges.id, params.challengesId)
  });

  return NextResponse.json(data[0]);
}


export const PUT = async (
  req: Request, 
  {params} : {params: {challengesId: number}},
) => {
  if(!isAdmin()) {
    return new NextResponse("Unauthorized", {status: 403});
  };

  const body = await req.json();
  
  const data= await db.update(challenges).set({
    ...body,
  }).where(eq(challenges.id, params.challengesId)).returning();

  return NextResponse.json(data[0]);
};

export const DELETE = async (
  req: Request, 
  {params} : {params: {challengesId: number}},
) => {

  if(!isAdmin()) {
    return new NextResponse("Unauthorized", {status: 403});
  };
  
  const data= await db.delete(challenges).where(eq(challenges.id, params.challengesId)).returning();

  return NextResponse.json(data[0]);
}
