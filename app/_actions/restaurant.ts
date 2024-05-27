"use server";

import { revalidatePath } from "next/cache";
import { db } from "../_lib/prisma"


export const toggleFavoriteRestaurant = async (userId: string, restaurantId: string) => {
  
  const isFavorite = await db.useFavoriteRestaurant.findFirst({
    where:{
      userId,
      restaurantId
    }
  });
  
  if(isFavorite){
    await db.useFavoriteRestaurant.delete({
      where:{
        userId_restaurantId:{
          userId,
          restaurantId,
        }
      }
    })
    revalidatePath("/")
    return
  }
  
  await db.useFavoriteRestaurant.create({
    data: {
      userId,
      restaurantId
    }
  })
  revalidatePath("/")
}
