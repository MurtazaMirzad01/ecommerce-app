import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";


export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '$';
    const deliveryFee = 10;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItem, setCartItem] = useState({});

    const addToCart = async (itemId, size) => {

        if (!size) {
            toast.error('Please select Product size!');
            return;
        }
        let cartData = structuredClone(cartItem);
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        }
        else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        } setCartItem(cartData);
    }

    const getCartCount = () => {
        let TotalCount = 0;
        for (const Items in cartItem) {
            for (const size in cartItem[Items]) {
                try {
                    if (cartItem[Items][size]) {
                        TotalCount += cartItem[Items][size];
                    }
                } catch (error) {
                    console.error("Error accessing cart item:", error);
                }
            }
        }
        return TotalCount;
    }
    useEffect(() => {
        getCartCount();
    }, [cartItem])

    const value = {
        products, currency, deliveryFee, search, setSearch,
        showSearch, setShowSearch, cartItem, addToCart, getCartCount
    };
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;