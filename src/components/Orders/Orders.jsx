import React, { useState } from 'react';
import Cart from '../Cart/Cart';
import { Link, useLoaderData } from 'react-router-dom';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Orders.css'
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';


const Orders = () => {
    const savedCart =useLoaderData();
    const [cart, setCart] = useState(savedCart)
    console.log(cart);
    const handleRemoveFromCart = (id) =>{
        const remaining = cart.filter(pd => pd.id !== id);
        setCart(remaining);
        removeFromDb(id);
    }

    const handleClearCart = () => {
        setCart([])
        deleteShoppingCart()
    }

    // console.log(savedCart);
    return (
        <div className='shop-container'>
            <div className='review-container'>
            {
                cart.map(product => <ReviewItem
                key={product.id}
                product={product}
                handleRemoveFromCart={handleRemoveFromCart}
                ></ReviewItem>)
            }
            </div>
            <div>
                <Cart
                cart={cart}
                handleClearCart={handleClearCart}
                >
                   <Link className='proceed-link' to="/checkout">
                    <button className='btn-proceed'>Proceed Checkout</button>
                   </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Orders;