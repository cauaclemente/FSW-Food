
interface RestaurantProps {
  restaurantId: string;
  userFavoriteRestaurants?: {
    userId: string;
    restaurantId: string;
    createdAt: Date;
  }[];
}

export const isRestaurantFavorited = ({ userFavoriteRestaurants, restaurantId }: RestaurantProps) =>  
    userFavoriteRestaurants?.some((fav) => fav.restaurantId == restaurantId,
  );
