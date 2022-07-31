import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import userReducer from "./user.reducer";
import orderReducer from "./order.reducer";
import categoryReducer from "./category.reducer";
import productReducer from "./product.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  order: orderReducer,
  category: categoryReducer,
  product: productReducer,
});

export default rootReducer;
