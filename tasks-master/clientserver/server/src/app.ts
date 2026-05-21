import express from "express";

import { db } from "./database.js";

type Student = {
  id: number;
  name: string;
  age: number;
  student_group: string;
};

export function createApp() {
  const app = express();

  app.use(express.json());

  app.get("/", (_req, res) => {
    res.send("Student server is working");
  });

  app.get("/api/students", (_req, res) => {
    const students = db
      .prepare("SELECT id, name, age, student_group FROM students ORDER BY id")
      .all() as Student[];

    res.json(students);
  });

  app.post("/api/students", (req, res) => {
    const name = String(req.body.name ?? "").trim();
    const age = Number(req.body.age);
    const studentGroup = String(req.body.student_group ?? "").trim();

    if (!name || !Number.isInteger(age) || age < 16 || !studentGroup) {
      res.status(400).json({ message: "Enter name, age and group" });
      return;
    }

    const result = db
      .prepare("INSERT INTO students (name, age, student_group) VALUES (?, ?, ?)")
      .run(name, age, studentGroup);

    const student = db
      .prepare("SELECT id, name, age, student_group FROM students WHERE id = ?")
      .get(result.lastInsertRowid) as Student;

    res.status(201).json(student);
  });

  app.delete("/api/students/:id", (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      res.status(400).json({ message: "Invalid id" });
      return;
    }

    const result = db.prepare("DELETE FROM students WHERE id = ?").run(id);

    if (result.changes === 0) {
      res.status(404).json({ message: "Student not found" });
      return;
    }

    res.status(204).send();
  });

  return app;
}
