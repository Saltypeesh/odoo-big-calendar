import axios from "axios";

const url = "https://vnlisserver.onrender.com/api";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZDFjMTEzOGI4ZWQ5YjAzZDQ0YTViZiIsImlhdCI6MTcwODU3NjExOSwiZXhwIjoxNzQwMTEyMTE5fQ._3AQ5Z4IFewlJ0GbcSYt1rBOiw1-HzM1jozADYA2UTg";

const deleteTaskInPlannedTask = async (id) => {
  const res = await axios({
    method: "delete",
    url: `${url}/taskInPlannedTask/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

export default deleteTaskInPlannedTask;
