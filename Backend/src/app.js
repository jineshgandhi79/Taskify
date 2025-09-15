import express from "express"
const app = express();
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import cors from "cors";
import taskRoutes from "./routes/task.routes.js";

const port = process.env.PORT || 5000;

const startApp = function() {
    try {

        app.use(cookieParser());
        app.use(express.json());
        app.use(express.urlencoded({extended:true}));

        app.use(cors({origin:process.env.FRONTEND_URL,credentials: true}));

        app.use('/api/auth',authRoutes);
        app.use('/api/task', taskRoutes);


        app.listen(port,() => {
            console.log(`App listening on port : ${port}`);
        })
    } catch (error) {
        console.error("Error starting app",error);
    }
}

export default startApp;