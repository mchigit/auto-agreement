import { Input } from "@material-tailwind/react";

export default function AddressForm(props: { register: any, }) {
  const { register } = props;

  return (
    <>
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
    </>
  );
}
