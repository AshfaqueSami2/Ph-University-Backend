import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TBooking } from './booking.interface';
import { Facility } from '../Facility/facility.model';
// import { calculatePayableAmount } from '../../utils/calculatePayableAmount';
import { Booking } from './booking.model';
import {
  calculatePayableAmount,
  combineDateAndTime,
} from '../../utils/calculatePayableAmount';

const createBookingIntoDB = async (bookingData: Partial<TBooking>) => {
  const { facility, date, startTime, endTime } = bookingData;

  if (!facility || !date || !startTime || !endTime ) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Facility, date, startTime, endTime, and user are required',
    );
  }

  const facilityData = await Facility.findById(facility);
  if (!facilityData) {
    throw new AppError(httpStatus.NOT_FOUND, 'Facility not found');
  }

  const combinedStartTime = combineDateAndTime(date, startTime);
  const combinedEndTime = combineDateAndTime(date, endTime);

  const payableAmount = calculatePayableAmount(
    combinedStartTime,
    combinedEndTime,
    facilityData.pricePerHour,
  );

  
  const newBooking = new Booking({
    ...bookingData,
    startTime,
    endTime,
    payableAmount,
    isBooked: 'confirmed',
  });
  const result = await newBooking.save();
  return result;
};

export const BookingServices = {
  createBookingIntoDB,
};