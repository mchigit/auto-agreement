"use client";

import {
  Button,
  Card,
  Checkbox,
  Input,
  Select,
  Textarea,
  Typography,
  Option,
} from "@material-tailwind/react";
import DatePicker from "react-datepicker";
import ReactSelect from "react-select";

import "react-datepicker/dist/react-datepicker.css";

import { useState } from "react";

const getTodayFormattedDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};

const paymentOptions = [
  { value: "Post-dated Cheques", label: "Post-dated Cheques" },
  { value: "EMT", label: "EMT" },
  { value: "Cash", label: "Cash" },
];

export default function LeaseAgreementForm() {
  const [startdate, setStartDate] = useState<Date>(new Date());
  const [partialRentDate, setPartialRentDate] = useState<Date>(new Date());

  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h3" color="blue-gray">
        Auto-generate Lease Agreement
      </Typography>
      <Typography color="gray" className="mt-2font-normal">
        Fill out the form, and we will generate Ontario Standard Lease Agreement
        based on the information you provided.
      </Typography>
      <form className="mt-12 mb-2 w-full">
        <Typography variant="h5" color="blue-gray">
          Landlord/Tenant Info
        </Typography>
        <div className="grid grid-cols-2 gap-y-4 gap-x-6 mt-4 mb-4">
          <Input size="lg" crossOrigin="" label="Landlord First Name" />
          <Input size="lg" crossOrigin="" label="Landlord Last Name" />
          <div className="col-span-2 flex justify-end">+ Add new Landlord</div>

          <Input size="lg" crossOrigin="" label="Tenant First Name" />
          <Input size="lg" crossOrigin="" label="Tenant Last Name" />
          <div className="col-span-2 flex justify-end">+ Add new Tenant</div>
        </div>
        {/* <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your Name
          </Typography>
          <Input
            size="lg"
            crossOrigin=""
            placeholder="name@mail.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your Email
          </Typography>
          <Input
            size="lg"
            crossOrigin=""
            placeholder="name@mail.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Password
          </Typography>
          <Input
            type="password"
            size="lg"
            crossOrigin=""
            placeholder="********"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div> */}
        <Typography variant="h5" color="blue-gray">
          Property Info
        </Typography>
        <div className="grid grid-cols-4 gap-6 mt-4">
          <Input crossOrigin="" label="Unit" />
          <Input crossOrigin="" label="Street Number" />
          <div className="col-span-2 w-full">
            <Input crossOrigin="" label="Street Address" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-6 mt-4">
          <Input crossOrigin="" label="City" />
          <Input crossOrigin="" label="Province" />
          <Input crossOrigin="" label="Postal Code" />
        </div>
        <div className="grid grid-cols-4 gap-6 mt-3">
          <div>
            <Typography variant="small">Condo Unit?</Typography>
            <Select>
              <Option>Yes</Option>
              <Option>No</Option>
            </Select>
          </div>
        </div>
        <Typography variant="h5" color="blue-gray" className="mt-8">
          Parking
        </Typography>
        <div className="grid grid-cols-2 gap-6 mt-4">
          <Input
            min={0}
            crossOrigin=""
            type="number"
            label="# of Parking spots"
          />
          <Input
            min={0}
            crossOrigin=""
            type="number"
            label="Parking Fee/month"
          />
          <div className="col-span-2">
            <Textarea label="Parking Description (Optional)" />
          </div>
        </div>
        <Typography variant="h5" color="blue-gray" className="mt-8">
          Lease Info
        </Typography>
        <div className="grid grid-cols-2 gap-6 mt-4 items-center">
          <DatePicker
            selected={startdate}
            onChange={(date) => {
              if (date) setStartDate(date);
            }}
            wrapperClassName="w-full"
            customInput={<Input crossOrigin="" label="Lease Start Date" />}
          />
          <Select label="Lease Terms">
            <Option>Fixed Term</Option>
            <Option>Monthly</Option>
            <Option>Other</Option>
          </Select>
        </div>
        <div className="grid grid-cols-3 gap-6 mt-4 items-center">
          <Input min={0} crossOrigin="" type="number" label="Rent" />
          <Input crossOrigin="" label="Pay to" />
          <ReactSelect
            placeholder="Payment Method"
            options={paymentOptions}
            closeMenuOnSelect={false}
            isMulti
          />
        </div>
        <div className="grid grid-cols-3 gap-6 mt-4 items-center">
          <Input min={0} crossOrigin="" type="number" label="Rent Deposit" />
          <Input min={0} crossOrigin="" type="number" label="Key Deposit" />
          <Checkbox label="Tenant Insurance Required" crossOrigin="" />
        </div>
        <Typography variant="h5" color="blue-gray" className="mt-8">
          Partial Months
        </Typography>
        <Typography variant="small" color="blue-gray" className="mt-2">
          Ignore if your lease starts on the first of the month.
        </Typography>
        <div className="mt-4 flex flex-col">
          <p>
            If the first rental period (e.g., month) is a partial period, the
            tenant will pay a partial rent of:
          </p>

          <Input
            min={0}
            crossOrigin=""
            type="number"
            label="Partial Month Rent"
            className="mt-2"
          />
          <p className="mt-4">on:</p>
          <DatePicker
            selected={partialRentDate}
            onChange={(date) => {
              if (date) setPartialRentDate(date);
            }}
            wrapperClassName="mt-2"
            customInput={<Input crossOrigin="" label="Partial Month Date" />}
          />
          <p className="mt-4">
            This partial rent covers the rental of the unit from
          </p>
          <div>
            <DatePicker
              selected={partialRentDate}
              onChange={(date) => {
                if (date) setPartialRentDate(date);
              }}
              wrapperClassName="w-1/3 mt-2 mr-4"
              customInput={<Input crossOrigin="" label="Covers from" />}
            />
            <DatePicker
              selected={partialRentDate}
              onChange={(date) => {
                if (date) setPartialRentDate(date);
              }}
              wrapperClassName="w-1/3 mt-2"
              customInput={<Input crossOrigin="" label="Covers to" />}
            />
          </div>
        </div>
        <Typography variant="h5" color="blue-gray" className="mt-8">
          Additional Terms
        </Typography>
        <Typography variant="small" color="blue-gray" className="mt-2">
          If you wish to include any additional terms to the lease, please enter
          them below.
        </Typography>
        <Button className="mt-6" fullWidth>
          sign up
        </Button>
      </form>
    </Card>
  );
}
