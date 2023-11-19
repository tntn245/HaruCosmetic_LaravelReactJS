/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { createContext, useState, useEffect } from 'react'
import { PRODUCTS, PRODUCTSCART } from '../components/products';
import axios from '../api/axios.js';


export const ShopContext = createContext({});
const shopcontext = (props) => {
  const [cartItems, setCartItems] = useState(PRODUCTSCART);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalProducts, settotalProducts] = useState(0);
  const products = PRODUCTS;
  const [favorites, setFavorites] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const loadFavs = (userID) => {
    if (userID !== 0) {
      axios.post("/api/get-favs", { userID })
        .then(
          (response) => {
            setFavorites(response.data);
            console.log(response.data);
          }
        )
        .catch(function (error) {
          console.log(error.message);
        });
    }
  }

  const addToFavs = (userID, productID) => {
    if(userID!==0){
      axios.post("/api/add-to-favs", { userID, productID })
        .then(
          (response) => {
            setFavorites(response.data);
            console.log(response);
          }
        )
        .catch(function (error) {
          console.log(error.message);
        });
    }
  };

  const removeFromFavs = (userID, productID) => {
    if(userID!==0){
      axios.post("/api/remove-from-favs", { userID, productID })
        .then(
          (response) => {
            console.log(response);
          }
        )
        .catch(function (error) {
          console.log(error.message);
        });
    }
  };

  const loadProductsCart = () => {
    const userID = JSON.parse(localStorage.getItem('user')).id;
    const PRODUCTSCART = [];

    axios.post("/api/get-cart", { userID })
      .then(
        (response) => {
          PRODUCTSCART.push(...response.data);
          setCartItems(PRODUCTSCART);
        }
      )
      .catch(function (error) {
        console.log(error.message);
      });
  }

  const getTotalCartAmount = () => {
    var total = Number(0);
    for (let i = 0; i < cartItems.length; i++) {
      let itemInfo = PRODUCTS.find((product) => product.id === Number(cartItems[i].product_id));

      let itemPrice = itemInfo.price;
      if (itemPrice === null)
        itemPrice = 0;

      total += Number(itemPrice);
    }
    setTotalAmount(total);
    return totalAmount;
  };

  const getTotalCartProducts = () => {
    let total = 0;
    for (const item in cartItems) {
      total += cartItems[item].quantity;
    }
    settotalProducts(total);
    return totalProducts;
  };


  const addToCart = (productID, userID) => {
    if (userID !== 0) {
      try {
        axios.post("/api/add-to-cart", { userID, productID })
          .then(
            (response) => {
              console.log(response);
              for (let i = 0; i < cartItems.length; i++) {
                if (cartItems[i].id === productID) {
                  cartItems[i].quantity++;
                  break;
                }
              }
            }
          )
          .catch(function (error) {
            throw error;
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const removeToCart = (productID, userID) => {
    if (userID !== 0) {
      try {
        axios.post("/api/remove-to-cart", { userID, productID })
          .then((response) => {
            console.log(response);
            for (let i = 0; i < cartItems.length; i++) {
              if (cartItems[i].id === productID) {
                cartItems[i].quantity--;
                break;
              }
            }
          })
          .catch((error) => {
            throw error;
          });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const updateCartItemCount = (newQuantity, productID, userID) => {
    try {
      axios.post("/api/update-to-cart", { newQuantity, productID, userID })
        .then(
          (response) => {
            console.log(response);
          }
        )
        .catch(function (error) {
          throw error;
        });
    } catch (error) {
      console.log(error);
    }
  };

  const clearCart = (userID) => {
    try {
      axios.post("/api/clear-cart", { userID })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      console.error(error);
    }
  };

  const resetCart = () => {
    setCartItems([]);
  };

  const [selectedProduct, setSelectedProduct] = useState(null);

  const viewProductDetails = (productId) => {
    setSelectedProduct(productId);
  };

  const closeProductDetails = () => {
    setSelectedProduct(null);
  };

  const filterByPrice = (minPrice, maxPrice) => {
    const filteredProducts = products.filter((product) => {
      const price = product.price;
      return price >= minPrice && price <= maxPrice;
    });

    setFilteredProducts(filteredProducts);
  };
  const contextValue = {
    cartItems,
    favorites,
    totalAmount,
    totalProducts,
    loadProductsCart,
    addToCart,
    removeToCart,
    updateCartItemCount,
    getTotalCartAmount,
    getTotalCartProducts,
    clearCart,
    resetCart,
    viewProductDetails,
    closeProductDetails,
    selectedProduct,
    products,
    loadFavs,
    addToFavs,
    removeFromFavs,
    filterByPrice,
  };

  console.log("ShopContext ", cartItems);

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};


export default shopcontext