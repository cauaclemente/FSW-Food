import Header from "@/app/_components/header";
import RestaurantItem from "@/app/_components/restaurant-item";
import { db } from "@/app/_lib/prisma";

const RecommendedRestaurants = async () => {
  const restaurant = await db.restaurant.findMany({});

  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h2 className="text-lg font-semibold">Restaurantes Recomendado</h2>
      </div>
      <div className="flex w-full flex-col gap-6 px-5 md:grid md:grid-cols-4">
        {restaurant.map((restaurant) => (
          <RestaurantItem
            key={restaurant.id}
            restaurant={restaurant}
            className="h-full min-w-full"
          />
        ))}
      </div>
    </>
  );
};

export default RecommendedRestaurants;
