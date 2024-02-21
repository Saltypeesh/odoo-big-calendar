import axios from "./axios";

const getPlannedTasksByUser = async (weekNum, month, year) => {
  // const token = localStorage.getItem("token");
  const res = await axios.get(
    "/plannedTasks/user?weekNum=" +
      weekNum +
      "&month=" +
      month +
      "&year=" +
      year
  );

  return res;
};

export default getPlannedTasksByUser;
