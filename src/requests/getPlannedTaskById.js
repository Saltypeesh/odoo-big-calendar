import axios from "axios";

const url = "https://vnlisserver.onrender.com/api";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZDFjMTEzOGI4ZWQ5YjAzZDQ0YTViZiIsImlhdCI6MTcwODU3NjExOSwiZXhwIjoxNzQwMTEyMTE5fQ._3AQ5Z4IFewlJ0GbcSYt1rBOiw1-HzM1jozADYA2UTg";

const getPlannedTaskById = async (weekNum, year) => {
  // const token = localStorage.getItem("token");
  const res = await axios({
    method: "get",
    url: `${url}/plannedTasks/user?weekNum=${weekNum}&year=${year}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // console.log(res);
  return res;
};

export default getPlannedTaskById;
