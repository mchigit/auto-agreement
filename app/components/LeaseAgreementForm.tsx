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
import { Controller, useFieldArray, useForm } from "react-hook-form";

import "react-datepicker/dist/react-datepicker.css";

import { useState } from "react";
import { LeaseFormFields } from "../types";
import { cleanupLeaseFormData, generateLeaseAgreement } from "../utils";

const paymentOptions = [
  { value: "Post-dated Cheques", label: "Post-dated Cheques" },
  { value: "EMT", label: "EMT" },
  { value: "Cash", label: "Cash" },
];

export default function LeaseAgreementForm() {
  const [startdate, setStartDate] = useState<Date>(new Date());
  const [partialRentDate, setPartialRentDate] = useState<Date>(new Date());

  const { register, getValues, control } = useForm<LeaseFormFields>({
    defaultValues: {
      landLordName: [
        {
          first: "",
          last: "",
        },
      ],
      tenantName: [
        {
          first: "",
          last: "",
        },
      ],
      unit: "",
      streetNumber: "",
      streetName: "",
      city: "",
      province: "Ontario",
      postalCode: "",
      isCondoUnit: "",
      parkingSpace: 0,
      parkingFee: 0,
      parkingDescription: "",
      termType: "",
      baseRent: 0,
      payee: "",
      paymentMethod: null,
      tenantInsuranceRequired: true,
      rentDeposit: 0,
      keyDeposit: 0,
      partialMonthRent: null,
    },
  });

  const { fields: landlordFields } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "landLordName", // unique name for your Field Array
    rules: {
      required: true,
    },
  });

  const { fields: tenantFields } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "tenantName", // unique name for your Field Array
    rules: {
      required: true,
    },
  });

  const onSubmit = async () => {
    const data = getValues();

    const dataForPost = cleanupLeaseFormData(data, startdate);

    await generateLeaseAgreement(dataForPost);
  };

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
        <div className="w-full">
          {landlordFields.map((item, index) => {
            return (
              <div key={item.id} className="grid grid-cols-2 gap-x-4 ">
                <Input
                  size="lg"
                  crossOrigin=""
                  label="Landlord First Name"
                  {...register(`landLordName.${index}.first`)}
                />
                <Input
                  size="lg"
                  crossOrigin=""
                  label="Landlord Last Name"
                  {...register(`landLordName.${index}.last`)}
                />
              </div>
            );
          })}

          <div className="col-span-2 flex justify-end mt-2 mb-6">
            + Add new Landlord
          </div>

          {tenantFields.map((item, index) => {
            return (
              <div key={item.id} className="grid grid-cols-2 gap-x-4 ">
                <Input
                  size="lg"
                  crossOrigin=""
                  label="Tenant First Name"
                  {...register(`tenantName.${index}.first`)}
                />
                <Input
                  size="lg"
                  crossOrigin=""
                  label="Tenant Last Name"
                  {...register(`tenantName.${index}.last`)}
                />
              </div>
            );
          })}

          <div className="col-span-2 flex justify-end mt-2 mb-6">
            + Add new Tenant
          </div>
        </div>
        <Typography variant="h5" color="blue-gray">
          Property Info
        </Typography>
        <div className="grid grid-cols-4 gap-6 mt-4">
          <Input
            crossOrigin=""
            label="Unit"
            {...register("unit", { required: false })}
          />
          <Input
            crossOrigin=""
            label="Street Number"
            {...register("streetNumber", { required: true })}
          />
          <div className="col-span-2 w-full">
            <Input
              crossOrigin=""
              label="Street Name"
              {...register("streetName", { required: true })}
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-6 mt-4">
          <Input
            crossOrigin=""
            {...register("city", { required: true })}
            label="City"
          />
          <Input
            crossOrigin=""
            {...register("province", { required: true })}
            label="Province"
          />
          <Input
            crossOrigin=""
            {...register("postalCode", { required: true })}
            label="Postal Code"
          />
        </div>
        <div className="grid grid-cols-4 gap-6 mt-3">
          <div>
            <Controller
              name="isCondoUnit"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select label="Condo Unit?" {...field}>
                  <Option value="yes">Yes</Option>
                  <Option value="no">No</Option>
                </Select>
              )}
            ></Controller>
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
            {...register("parkingSpace", { required: true })}
          />
          <Input
            min={0}
            crossOrigin=""
            type="number"
            label="Parking Fee/month"
            {...register("parkingFee", { required: false })}
          />
          <div className="col-span-2">
            <Textarea
              {...register("parkingDescription", { required: false })}
              label="Parking Description (Optional)"
            />
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
          <Controller
            name="termType"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select label="Lease Terms" {...field}>
                <Option value="fixed">Fixed Term</Option>
                <Option value="monthly">Monthly</Option>
                {/* <Option value="other">Other</Option> */}
              </Select>
            )}
          ></Controller>
        </div>
        <div className="grid grid-cols-3 gap-6 mt-4 items-center">
          <Input
            min={0}
            crossOrigin=""
            type="number"
            label="Rent"
            {...register("baseRent", { required: true })}
          />
          <Input
            crossOrigin=""
            label="Pay to"
            {...register("payee", { required: true })}
          />
          <Controller
            name="paymentMethod"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <ReactSelect
                placeholder="Payment Method"
                options={paymentOptions as any}
                closeMenuOnSelect={false}
                isMulti
                {...field}
              />
            )}
          ></Controller>
        </div>
        <div className="grid grid-cols-3 gap-6 mt-4 items-center">
          <Input
            min={0}
            crossOrigin=""
            type="number"
            label="Rent Deposit"
            {...register("rentDeposit", { required: false })}
          />
          <Input
            min={0}
            crossOrigin=""
            type="number"
            label="Key Deposit"
            {...register("keyDeposit", { required: false })}
          />
          <Checkbox
            label="Tenant Insurance Required"
            {...register("tenantInsuranceRequired", { required: true })}
            crossOrigin=""
          />
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
            {...register("partialMonthRent", { required: false })}
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
        <div className="mt-12 w-full flex items-center justify-center">
          <Button onClick={onSubmit}>Generate Lease Agreement</Button>
        </div>
      </form>
    </Card>
  );
}
