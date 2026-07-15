// npm i @reduxjs/toolkit react-redux
import { configureStore, createSlice,combineReducers,type PayloadAction } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const stock = createSlice({
    name : 'stock',
    initialState : [4,4,4],
    reducers : {
        changeStock(): any { 
            return [ 5, 5, 5 ];
        }
    }
})

export interface CartItem{
    id : number;
    name : string;
    quantity : number;
    reward : number;
}

export interface CartArray{
    cart1 : CartItem[];
}

const cart2 = createSlice({
    name : 'cart',
    initialState : {
        cart1 : [
            {id : 1, name : '브라키디오스', quantity:1, reward : 27000},
            {id : 2, name : '네로미에르', quantity:1, reward : 35000},
            {id : 3, name : '진오우거', quantity:1, reward : 29000}, 
        ]
    } as CartArray,

    reducers : {
        plusCount(state,action){
            const existingItem = state.cart1.find((item)=>item.id === action.payload);

            if(existingItem){
                existingItem.quantity++;
            }
        },
        minusCount(state,action){
            const existingItem = state.cart1.find((item)=>item.id === action.payload);

            if(existingItem && existingItem.quantity > 0){
                existingItem.quantity--;
            }
        },
        addItem(state, action){
            console.log("cart2: ");
            console.log(action.payload);
            const existingItem = state.cart1.find((item)=>item.id === action.payload.id);
            console.log("cart3: ");
            console.log(existingItem);
            if(existingItem){
                existingItem.quantity++;
            }else{
                state.cart1.push({
                    id : action.payload.id,
                    name : action.payload.name,
                    quantity : 1,
                    reward : action.payload.reward,
                });
            }
        },
        resetCart(state){
            state.cart1 = [];
        },
    }
})

export type Theme = "light" | "dark" | "auto";

interface ThemeState {
  value: Theme;
}

const initialState: ThemeState = { 
    value: "auto",
 };

const themeSlice = createSlice({
    name: "theme", 
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<Theme>) => {
            state.value = action.payload;
            //글로벌 효과
            document.documentElement.setAttribute("data-bs-theme", action.payload);
        },
    },
});

export const { setTheme } = themeSlice.actions;
export const { changeStock } = stock.actions;
export const {plusCount,minusCount,addItem,resetCart} = cart2.actions;

const rootReducer = combineReducers({
    stock : stock.reducer,
    cart3 : cart2.reducer,
    theme:themeSlice.reducer,
});


const persistConfig = {
    key : 'root',
    storage,
};


const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
});


export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>; //state 타입 지정
export type AppDispatch = typeof store.dispatch; //Dispatch 타입 지정





