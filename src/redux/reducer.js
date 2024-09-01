import { createReducer } from "@reduxjs/toolkit";

export const cartReducer = createReducer(
    {
        cartItems: [],
        subTotal: 0,
        shipping: 0,
        tax: 0,
        total: 0,
    },

    (builder) => {
        builder.addCase("addToCart",(state,action)=>{
            const item = action.payload;
            // note action.payload expect object
            const isItemExist = state.cartItems.find(i=>i.id===item.id);

            if(isItemExist){
                // agr phle se o item h toh cartitems pe iterate krege aur aur o item khojege jisko add krna chahte h, mil gya agar toh uske quantity ko 1 se badha denge
                state.cartItems.forEach(i=>{
                    if(i.id===item.id) i.quantity+=1;
                })
            }else{
                state.cartItems.push(item);
            }
        });
        builder.addCase("decrement",(state,action)=>{
            // abhi uper mtlb Cart mein sirf id bheje h jo action.payload mein aa gya object nhi h . nhi laga na pada 
            const item = state.cartItems.find((i)=>i.id===action.payload);
            if(item.quantity > 1){
                state.cartItems.forEach((i)=>{
                    if(i.id===item.id) i.quantity -= 1;
                })
            }
        });
        builder.addCase("deleteFromTask",(state,action)=>{
            // cartItems jo exist kr rha hain usme se filter kr rhe hain ki jo id dispacth hoke aayaa action.payload mein o equal nhi h o rkeha aur jo id match hoga o filter nhi hoga 
            state.cartItems = state.cartItems.filter(i=> i.id!==action.payload);
        });
        builder.addCase("calculatePrice",(state)=>{
            let sum=0;
            state.cartItems.forEach(i=>sum+=i.price * i.quantity);
            state.subTotal = sum;
            state.shipping = state.subTotal > 1000 ? 0 : 200;
            state.tax = +(state.subTotal * 0.18).toFixed();
            state.total = state.subTotal + state.tax + state.shipping;
        })
    }
);
