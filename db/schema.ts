import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const courses = pgTable("courses" , {
  id: serial("id").primaryKey(),
  tittle: text("title"),
  imageSrc: text("image_src").notNull(),
});

