"use client";

import { Restaurant } from "@prisma/client";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { searchForRestaurants } from "./search";
import Header from "../_components/header";
import RestaurantItem from "../_components/restaurant-item";

interface UserFavoriteRestaurant {
  userId: string;
  restaurantId: string;
  createdAt: Date;
}
interface RestaurantProps {
  userFavoriteRestaurants: UserFavoriteRestaurant[];
}

const Restaurants = ({ userFavoriteRestaurants }: RestaurantProps) => {
  const searchParams = useSearchParams();
  const [restaurant, setRestaurant] = useState<Restaurant[]>([]);

  const searchFor = searchParams.get("search");

  useEffect(() => {
    const fetchRestaurants = async () => {
      const searchFor = searchParams.get("search");
      if (!searchFor) return;
      const foundRestaurants = await searchForRestaurants(searchFor);
      setRestaurant(foundRestaurants);
    };

    fetchRestaurants();
  }, [searchParams]);

  if (!searchFor) {
    return notFound();
  }

  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h2 className=" mb-6 text-lg font-semibold">
          {" "}
          Restaurantes Encontrados
        </h2>
        <div className="flex w-full flex-col gap-6 md:grid md:grid-cols-4">
          {restaurant.map((restaurants) => (
            <RestaurantItem
              key={restaurants.id}
              restaurant={restaurants}
              className="min-w-full max-w-full"
              userFavoriteRestaurants={userFavoriteRestaurants}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Restaurants;
