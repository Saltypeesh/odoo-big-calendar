import axios from "axios";

const url = "https://vnlisserver.onrender.com/api";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZDFjMTEzOGI4ZWQ5YjAzZDQ0YTViZiIsImlhdCI6MTcwODU3NjExOSwiZXhwIjoxNzQwMTEyMTE5fQ._3AQ5Z4IFewlJ0GbcSYt1rBOiw1-HzM1jozADYA2UTg";

const updateTaskInPlannedTask = async (task) => {
  const res = await axios({
    method: "patch",
    url: `${url}/taskInPlannedTask/${task._id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      title: task.title,
      startDate: task.start,
      endDate: task.end,
    },
  });
  console.log(res);
  return res;
};

export default updateTaskInPlannedTask;
