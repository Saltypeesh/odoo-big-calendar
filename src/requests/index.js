import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useAppointments = () => {
  return useQuery({
    queryKey: ["GET_APPOINTMENTS"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:7000/appointments");
      return data;
    },
  });
};

export const useCreateAppointment = () => {
  const queryClient = useQueryClient();

  const { mutate: createAppointment, isPending: isCreating } = useMutation({
    mutationFn: async (appointment) => {
      console.log(appointment);

      const { data } = await axios.post("http://localhost:7000/appointments", {
        appointment,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["GET_APPOINTMENTS"]);
    },
  });
  return { isCreating, createAppointment };
};

export const useUpdateAppointment = () => {
  const queryClient = useQueryClient();

  const { mutate: updateAppointment, isPending: isUpdating } = useMutation({
    mutationFn: async (appointment) => {
      // console.log(appointment);

      const { data } = await axios.put("http://localhost:7000/appointments", {
        appointment,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["GET_APPOINTMENTS"]);
    },
  });
  return { isUpdating, updateAppointment };
};

export const useDeleteAppointment = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteAppointment, isPending: isDeleting } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axios.delete(
        `http://localhost:7000/appointments/${id}`
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["GET_APPOINTMENTS"]);
    },
  });
  return { isDeleting, deleteAppointment };
};

import axioss from "./axios";

// export const useAppointments = () => {
//   return useQuery({
//     queryKey: ["GET_APPOINTMENTS"],
//     queryFn: async () => {
//       const { data } = await axios.get("http://localhost:7000/appointments");
//       return data;
//     },
//   });
// };

export const useGetPlannedTasksByUser = (weekNum, year) => {
  return useQuery({
    queryKey: ["GET_PLANNEDTASKS"],
    queryFn: async () => {
      const res = await axioss.get(
        "/plannedTasks/user?weekNum=" + weekNum + "&year=" + year
      );
      return res.data;
    },
  });
};

//   // const token = localStorage.getItem("token");
//   const { mutate: getPlannedTasksByUser, isPending: isGetting } = useMutation({
//     mutationFn: async (weekNum, year) => {
//       console.log(weekNum, year);

//       // const res = await axioss.get(
//       //   "/plannedTasks/user?weekNum=" + weekNum + "&year=" + year
//       // );

//       // const res = await axios({
//       //   method: "get",
//       //   url: `https://d392hd1u5yd463.cloudfront.net/api/getPlannedTasksByTeam`,
//       //   headers: {
//       //     Authorization: `Bearer ${token}`,
//       //   },
//       // });

//       // return res;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["GET_APPOINTMENTS"]);
//     },
//   });
//   return { isGetting, getPlannedTasksByUser };
// };
