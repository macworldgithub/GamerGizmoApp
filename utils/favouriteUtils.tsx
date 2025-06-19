import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// export const toggleFavourite = async (
//     productId: string | number,
//     isFav: boolean,
//     setIsFavourite: (val: boolean) => void
// ) => {
//     const userId = await AsyncStorage.getItem("userId");
//     const token = await AsyncStorage.getItem("token");

//     if (!userId) {
//         alert("User not logged in.");
//         return;
//     }

//     try {
//         const productIdStr = productId.toString(); // ✅ Ensure it's a string

//         if (isFav) {
//             // Remove
//             await axios.delete(
//                 `https://backend.gamergizmo.com/product/favourite/removeFavourite?userId=${userId}&productId=${productIdStr}`,
//                 {
//                     headers: { Authorization: `Bearer ${token}` },
//                 }
//             );
//             alert("Removed from favorites!");
//             setIsFavourite(false);
//         } else {
//             // Add
//             await axios.post(
//                 `https://backend.gamergizmo.com/product/favourite/addToFavourite`,
//                 { userId, productId: productIdStr }, // ✅ Send string
//                 {
//                     headers: { Authorization: `Bearer ${token}` },
//                 }
//             );
//             alert("Added to favorites!");
//             setIsFavourite(true);
//         }
//     } catch (err: any) {
//         console.error("Toggle favorite error:", err.response?.data || err.message);
//         alert("Failed to update favorite.");
//     }
// };
export const toggleFavourite = async (
    productId: string | number,
    isFav: boolean,
    setIsFavourite: (val: boolean) => void
) => {
    const userId = await AsyncStorage.getItem("userId");
    const token = await AsyncStorage.getItem("token");

    if (!userId) {
        alert("User not logged in.");
        return;
    }

    try {
        const productIdStr = productId.toString();

        if (isFav) {
            // ✅ REMOVE from favorites
            await axios.delete(
                `https://backend.gamergizmo.com/product/favourite/removeFavourite?userId=${userId}&productId=${productIdStr}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            alert("Removed from favorites!");
            setIsFavourite(false);
        } else {
            // ✅ ADD to favorites
            const favCheck = await axios.get(
                `https://backend.gamergizmo.com/product/favourite/getAll?userId=${userId}`
            );
            const alreadyFav = favCheck.data?.data?.some(
                (f: any) => f.product.id.toString() === productIdStr
            );
            if (alreadyFav) {
                alert("Already in favorites.");
                setIsFavourite(true);
                return;
            }

            await axios.post(
                `https://backend.gamergizmo.com/product/favourite/addToFavourite`,
                { userId, productId: productIdStr },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            alert("Added to favorites!");
            setIsFavourite(true);
        }
    } catch (err: any) {
        console.error("Toggle favorite error:", err.response?.data || err.message);
        alert("Failed to update favorite.");
    }
};
