import mongoose from "mongoose";

 export const connectDB = async () => {
  mongoose
    .connect(
      "mongodb://localhost:27017/food-app"
      // "mongodb+srv://mushfiqbh:Lq6AKM1g5tQDGxLb@cluster0.cppebjh.mongodb.net/Food-Del"
    )
    .then(() => {
      console.log("DB Connected");
    })
};

// https://food-app-backend-ugzt.onrender.com