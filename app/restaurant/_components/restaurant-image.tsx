"use client";

import { isRestaurantFavorited } from "@/app/_components/_helpers/restaurant";
import { Button } from "@/app/_components/ui/button";
import useToggleFavoriteRestaurant from "@/app/_hooks/use-toggle-favorite-restaurant";
import { Restaurant } from "@prisma/client";
import { ChevronLeftIcon, HeartIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface UserFavoriteRestaurant {
  userId: string;
  restaurantId: string;
  createdAt: Date;
}
interface RestaurantImageProps {
  restaurant: Pick<Restaurant, "id" | "name" | "imageUrl">;
  userFavoriteRestaurants: UserFavoriteRestaurant[];
}

const RestaurantImage = ({
  restaurant,
  userFavoriteRestaurants,
}: RestaurantImageProps) => {
  const { data } = useSession();
  const router = useRouter();

  const isFavorite = isRestaurantFavorited({
    restaurantId: restaurant.id,
    userFavoriteRestaurants,
  });

  const { handleFavoriteClick } = useToggleFavoriteRestaurant({
    restaurantId: restaurant.id,
    userId: data?.user?.id,
    restaurantIsFavorite: isFavorite,
  });

  const handleBackClick = () => router.back();

  return (
    <div className="relative h-[250px] w-full md:h-[400px]">
      <Image
        src={restaurant.imageUrl}
        alt={restaurant.name}
        fill
        className="object-cover"
      />
      <Button
        className="absolute left-4 top-4 rounded-full bg-white text-foreground hover:text-white"
        size="icon"
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>

      <Button
        size="icon"
        className={` absolute right-4 top-4  rounded-full bg-gray-500 ${isFavorite && "bg-primary hover:bg-gray-700"}
        `}
        onClick={handleFavoriteClick}
      >
        <HeartIcon size={16} className="fill-white" />
      </Button>
    </div>
  );
};

export default RestaurantImage;
