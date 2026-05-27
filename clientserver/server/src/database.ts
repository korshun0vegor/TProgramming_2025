import Database from "better-sqlite3";

export const db = new Database("students.sqlite");

db.exec(`
  CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER NOT NULL,
    student_group TEXT NOT NULL
  )
`);

const count = db.prepare("SELECT COUNT(*) as count FROM students").get() as {
  count: number;
};

if (count.count === 0) {
  const addStudent = db.prepare("INSERT INTO students (name, age, student_group) VALUES (?, ?, ?)");

  addStudent.run("Ivan Ivanov", 19, "IS-21");
  addStudent.run("Anna Smirnova", 20, "IS-22");
  addStudent.run("Petr Petrov", 18, "IS-21");
}
