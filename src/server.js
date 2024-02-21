import express from "express";
import cors from "cors";
const app = express();

let appointments = [
  {
    id: 1,
    status: "CI",
    location: "New York",
    resource: "Dr Alex",
    address: "Building 5\nStreet 44\nNear Express Highway\nNew York",
    start: "2024-02-20T10:00:00",
    end: "2024-02-20T11:00:00",
    isDraggable: true,
    isResizable: true,
  },
  {
    id: 2,
    status: "P",
    location: "London",
    resource: "Dr Alex",
    address: "Building 5\nStreet 44\nNear Express Highway\nNew York",
    start: "2024-02-20T10:00:00",
    end: "2024-02-20T11:00:00",
    isDraggable: true,
    isResizable: true,
  },
  {
    id: 3,
    status: "CI",
    location: "Boston",
    resource: "Dr Alex",
    address: "Building 5\nStreet 44\nNear Express Highway\nNew York",
    isDraggable: true,
    isResizable: true,
  },
  {
    id: 4,
    status: "P",
    location: "LA",
    resource: "Dr Alex",
    address: "Building 5\nStreet 44\nNear Express Highway\nNew York",
    isDraggable: true,
    isResizable: true,
  },
];

app.use(cors({ credentials: true, origin: true }));
app.use(express.json());

app.get("/appointments", (req, res) => {
  res.send(appointments);
});

app.post("/appointments", (req, res) => {
  const { appointment } = req.body;
  const newAppointment = { ...appointment, id: appointments.length + 1 };
  appointments.push(newAppointment);
  res.send({ appointment: newAppointment });
});

app.put("/appointments", (req, res) => {
  const { appointment } = req.body;

  appointments = appointments.map((app) =>
    app.id === appointment.id ? appointment : app
  );
  res.send({ appointment });
});

app.delete("/appointments/:id", (req, res) => {
  const { id } = req.params;
  appointments = appointments.filter((app) => app.id !== Number(id));
  res.send({ id });
});

app.listen(7000, () => {
  console.log("listening on port 7000");
});
