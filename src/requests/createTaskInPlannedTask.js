import axios from "axios";

const url = "https://vnlisserver.onrender.com/api";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZDFjMTEzOGI4ZWQ5YjAzZDQ0YTViZiIsImlhdCI6MTcwODU3NjExOSwiZXhwIjoxNzQwMTEyMTE5fQ._3AQ5Z4IFewlJ0GbcSYt1rBOiw1-HzM1jozADYA2UTg";

const createTaskInPlannedTask = async (task) => {
  const plannedTaskId = "65d1cccbefd1211377cedbed";

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
};

export default createTaskInPlannedTask;
