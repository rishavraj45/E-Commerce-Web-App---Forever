import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '$';
    const delievery_fee = 10;
    const [search,setSearch] = useState('');
    const [showSearch,setShowSearch] = useState(false); //true then display the search bar
    const [cartItems,setCartItems] = useState({});

    const addToCart = async (itemId,size) => {
        if(!size){
            toast.error('Select Product Size')
            return;
        }
        let cartData = structuredClone(cartItems);  //creating copy of the object
        if(cartData[itemId]) {
            if(cartData[itemId][size]) {
                cartData[itemId][size] +=1;
            }
            else {
                cartData[itemId][size] =1;
            }
        }
        else {
            cartData[itemId] = {};
            cartData[itemId][size] =1;
        }
        setCartItems(cartData);

    }

    useEffect(()=>{
        console.log(cartItems)
    },[cartItems])

    const value = {
        products , currency , delievery_fee ,
        search , setSearch , showSearch , setShowSearch,
        cartItems, addToCart
    }
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}


export default ShopContextProvider;