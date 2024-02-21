/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  useCreateAppointment,
  useDeleteAppointment,
  useUpdateAppointment,
} from "../requests";
import FormRow from "../ui/FormRow";

// const CustomTimeInput = ({ value, onChange }) => (
//   <input
//     value={value}
//     onChange={(e) => onChange && onChange(e.target.value)}
//     style={{ width: "100%" }}
//   />
// );

export default function EventForm({ appointment = {} }) {
  const [start, setStart] = useState(new Date(appointment.start));
  const [end, setEnd] = useState(new Date(appointment.end));

  //   const initialValues = useMemo(
  //     () => ({ ...appointment, status: "CI" }),
  //     [appointment]
  //   );

  const { id: updateId, ...updateValues } = appointment;
  const isUpdateSession = Boolean(updateId);

  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: isUpdateSession ? updateValues : {},
  });
  const { errors } = formState;

  const { createAppointment } = useCreateAppointment();
  const { updateAppointment } = useUpdateAppointment();
  const { deleteAppointment } = useDeleteAppointment();

  const onSubmit = async (values) => {
    let selectedAppointment = {
      ...values,
      start,
      end,
      isDraggable: true,
      isResizable: true,
    };

    if (!appointment.id) {
      createAppointment(selectedAppointment);
      reset();
    } else {
      selectedAppointment = { ...values, start, end, id: appointment.id };
      updateAppointment(selectedAppointment);
    }
  };

  useEffect(() => {
    setStart(new Date(appointment.start)); // Update start date
    setEnd(new Date(appointment.end)); // Update end date
  }, [appointment.start, appointment.end]);

  return (
    <div
      style={{
        boxShadow: "2px  2px  5px rgba(0,  0,  0,  0.1)",
        padding: "10px",
        borderRadius: "5px",
        background: "white",
        // width: "100%",
        // position: "absolute",
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h1 style={{ fontSize: "2em", marginBottom: "1em" }}>
              {isUpdateSession ? "Update" : "Create"} an appointment
            </h1>
          </div>
          {isUpdateSession && (
            <button
              aria-label="delete"
              onClick={() => {
                deleteAppointment(appointment.id);
              }}
              style={{
                backgroundColor: "red",
                color: "white",
                border: "none",
                borderRadius: "5px",
                padding: "5px  10px",
              }}
            >
              Delete
            </button>
          )}
        </div>

        <FormRow label="Location" error={errors?.location?.message}>
          <input
            style={{
              border: "1px solid #ddd",
              borderRadius: "5px",
              padding: "8px 12px",
            }}
            type="text"
            id="location"
            //   disabled={isCreating}
            {...register("location", {
              required: "This field is required",
            })}
          />
        </FormRow>

        <FormRow label="Resource" error={errors?.location?.message}>
          <input
            style={{
              border: "1px solid #ddd",
              borderRadius: "5px",
              padding: "8px 12px",
            }}
            type="text"
            id="resource"
            {...register("resource", {
              required: "This field is required",
            })}
          />
        </FormRow>

        <FormRow label="Address" error={errors?.location?.message}>
          <input
            style={{
              border: "1px solid #ddd",
              borderRadius: "5px",
              padding: "8px 12px",
            }}
            type="text"
            id="address"
            {...register("address", {
              required: "This field is required",
            })}
          />
        </FormRow>

        <FormRow label="status" error={errors?.location?.message}>
          <select {...register("status")}>
            <option value="CI">Checked In</option>
            <option value="P">Pending</option>
          </select>
        </FormRow>

        <div style={{ display: "flex", gap: "1em", marginTop: "1em" }}>
          <div style={{ flexBasis: "50%" }}>
            <label>Start Time</label>
            <DatePicker
              id="start"
              onChange={(date) => {
                setStart(date);
              }}
              selected={start}
              showTimeSelect
              dateFormat="MMMM d, yyyy h:mm aa"
            />
          </div>
          <div style={{ flexBasis: "50%" }}>
            <label>End Time</label>
            <DatePicker
              id="end"
              onChange={(date) => {
                setEnd(date);
              }}
              selected={end}
              showTimeSelect
              dateFormat="MMMM d, yyyy h:mm aa"
            />
          </div>
        </div>

        <button
          type="submit"
          style={{
            marginTop: "1em",
            backgroundColor: "blue",
            color: "white",
            border: "none",
            borderRadius: "5px",
            padding: "5px  10px",
          }}
        >
          {isUpdateSession ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
}
