import { toast } from "sonner";
import { toggleFavoriteRestaurant } from "../_actions/restaurant";
import { useRouter } from "next/navigation";


interface useToggleFavoriteRestaurantProps {
  userId?: string;
  restaurantId: string
  restaurantIsFavorite?: boolean;

}

const useToggleFavoriteRestaurant = ({ 
  restaurantIsFavorite, 
  restaurantId, 
  userId, 
}: useToggleFavoriteRestaurantProps) => {
  const router = useRouter()
  
  const handleFavoriteClick = async () => {
    if(!userId) return;

    try{
      await toggleFavoriteRestaurant(userId, restaurantId)
      toast(
        restaurantIsFavorite
        ? "Restaurante removido dos favoritos"
        : "Restaurante favoritado",
      {
        action: {
          label: "Ver Favoritos",
          onClick: () => router.push("/my-favorite-restaurants"),
        }
      }
      )
    }catch(error){
      toast.error("Erro ao favoritar o restaurante")
    }
  }
  
  
  return { handleFavoriteClick };
}
 
export default useToggleFavoriteRestaurant;