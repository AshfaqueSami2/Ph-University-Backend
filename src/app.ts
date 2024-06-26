import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRoutes } from './app/modules/User/user.router';
import { AuthRoutes } from './app/modules/Auth/auth.route';
import globalErrorHandler from './middlewares/globalErrorhandler';
import { FacilityRoutes } from './app/modules/Facility/facility.route';
import { BookingsRoutes } from './app/modules/Booking/booking.route';
import notFound from './middlewares/notFound';
import cookieParser from 'cookie-parser';
import noDataFound from './middlewares/noDataFound';

const app: Application = express();

//parser
app.use(express.json());
app.use(cors());
app.use(cookieParser())

//application routes
app.use('/', UserRoutes);
app.use('/', AuthRoutes);
app.use('/', FacilityRoutes);
app.use('/',BookingsRoutes);


//not found
app.use(notFound);

//not data found
app.use(noDataFound)

const getAController = (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
};

app.use(globalErrorHandler);

app.get('/', getAController);

export default app;
