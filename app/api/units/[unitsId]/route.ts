import { NextResponse } from 'next/server';
import db from "@/db/drizzle"
import { units } from "@/db/schema"
import { eq } from "drizzle-orm"
import { isAdmin } from '@/lib/admin';


export const GET = async (
  req: Request, 
  {params} : {params: {unitsId: number}},
) => {

  if(!isAdmin()) {
    return new NextResponse("Unauthorized", {status: 403});
  };
  
  const data = await db.query.units.findMany({
    where: eq(units.id, params.unitsId)
  });

  return NextResponse.json(data[0]);
}


export const PUT = async (
  req: Request, 
  {params} : {params: {unitsId: number}},
) => {
  if(!isAdmin()) {
    return new NextResponse("Unauthorized", {status: 403});
  };

  const body = await req.json();
  
  const data= await db.update(units).set({
    ...body,
  }).where(eq(units.id, params.unitsId)).returning();

  return NextResponse.json(data[0]);
};

export const DELETE = async (
  req: Request, 
  {params} : {params: {unitsId: number}},
) => {

  if(!isAdmin()) {
    return new NextResponse("Unauthorized", {status: 403});
  };
  
  const data= await db.delete(units).where(eq(units.id, params.unitsId)).returning();

  return NextResponse.json(data[0]);
}
