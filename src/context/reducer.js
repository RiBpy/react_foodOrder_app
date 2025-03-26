import { fetchCart, fetchData } from "../utils/fetchLocalStorageData"

const userData=fetchData()
const cartInfo=fetchCart()
const initialState={
    user:userData,
    foodItems:null,
    cartShow:false,
    cartItems:cartInfo,
    searchItem:"",
    loading:true,
}
const actionType={
    SET_USER:"SET_USER",
    SET_FOOD_ITEMS:"SET_FOOD_ITEMS",
    SET_CART_SHOW:"SET_CART_SHOW",
    SET_CARTITEMS:"SET_CARTITEMS",
    SET_SEARCH_ITEM:"SET_SEARCH_ITEM",
    SET_LOADING:"SET_LOADING",
}

const reducer=(state,action)=>{
    switch(action.type){
        case actionType.SET_USER:return{...state,user:action.user}; //what ever action type i am sending if that is equal to SET_USER then set the case.That wil keep state value and user will be changed based on action
        case actionType.SET_FOOD_ITEMS:return{...state,foodItems:action.foodItems};
        case actionType.SET_CART_SHOW:return{...state,cartShow:action.cartShow};
        case actionType.SET_CARTITEMS:return{...state,cartItems:action.cartItems};
        case actionType.SET_SEARCH_ITEM:return{...state,searchItem:action.searchItem};
        case actionType.SET_LOADING:return{...state,loading:action.loading};
            default:return state;
    }
}
export { reducer, initialState, actionType }

