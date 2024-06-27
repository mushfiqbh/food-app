import mongoose from "mongoose";

export const connectDB = async () => {
  mongoose
    .connect(
      "mongodb+srv://mushfiqbh:Lq6AKM1g5tQDGxLb@cluster0.cppebjh.mongodb.net/Food-Del"
      // "mongodb://localhost:27017/food-app"
    )
    .then(() => {
      console.log("DB Connected");
    });
};
