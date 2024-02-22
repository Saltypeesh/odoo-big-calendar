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

// ---------------------

const url = "https://vnlisserver.onrender.com/api";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZDFjMTEzOGI4ZWQ5YjAzZDQ0YTViZiIsImlhdCI6MTcwODU3NjExOSwiZXhwIjoxNzQwMTEyMTE5fQ._3AQ5Z4IFewlJ0GbcSYt1rBOiw1-HzM1jozADYA2UTg";

export const useGetPlannedTasksByUser = (weekNum, year) => {
  return useQuery({
    queryKey: ["GET_PLANNEDTASKS"],
    queryFn: async () => {
      const res = await axios({
        method: "get",
        url: `${url}/plannedTasks/user?weekNum=${weekNum}&year=${year}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
  });
};

export const useCreateTaskInPlannedTask = () => {
  const queryClient = useQueryClient();
  const plannedTaskId = "65d1cccbefd1211377cedbed";

  const { mutate: createTaskInPlannedTask, isPending: isCreating } =
    useMutation({
      mutationFn: async (task) => {
        console.log(task);
        const res = await axios({
          method: "post",
          url: `${url}/plannedTasks/${plannedTaskId}/addTask`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            ...task,
          },
        });
        console.log(res);
        return res;
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["GET_PLANNEDTASKS"]);
      },
    });
  return { isCreating, createTaskInPlannedTask };
};

export const useUpdateTaskInPlannedTask = () => {
  const queryClient = useQueryClient();

  const { mutate: updateTaskInPlannedTask, isPending: isUpdating } =
    useMutation({
      mutationFn: async (task) => {
        console.log(task);
        const res = await axios({
          method: "patch",
          url: `${url}/taskInPlannedTask/${task._id}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            title: task.title,
            startDate: task.startDate,
            endDate: task.endDate,
          },
        });
        console.log(res);
        return res;
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["GET_PLANNEDTASKS"]);
      },
    });
  return { isUpdating, updateTaskInPlannedTask };
};

export const useDeleteTaskInPlannedTask = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteTaskInPlannedTask, isPending: isDeleting } =
    useMutation({
      mutationFn: async (id) => {
        console.log("test");
        const res = await axios({
          method: "delete",
          url: `${url}/taskInPlannedTask/${id}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        return res;
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["GET_PLANNEDTASKS"]);
      },
    });
  return { isDeleting, deleteTaskInPlannedTask };
};
