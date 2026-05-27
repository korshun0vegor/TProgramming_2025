import { useEffect, useState } from "react";
import type { FormEvent } from "react";

type Student = {
  id: number;
  name: string;
  age: number;
  student_group: string;
};

export default function App() {
  const [students, setStudents] = useState<Student[]>([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [group, setGroup] = useState("");
  const [error, setError] = useState("");

  async function loadStudents() {
    const response = await fetch("/api/students");
    const studentsFromServer = (await response.json()) as Student[];
    setStudents(studentsFromServer);
  }

  useEffect(() => {
    void loadStudents();
  }, []);

  async function addStudent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (name === "" || age === "" || group === "") {
      setError("Заполните все поля");
      return;
    }

    const response = await fetch("/api/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        age: Number(age),
        student_group: group,
      }),
    });

    if (response.ok) {
      setName("");
      setAge("");
      setGroup("");
      setError("");
      await loadStudents();
    } else {
      setError("Не получилось добавить студента");
    }
  }

  async function deleteStudent(id: number) {
    await fetch(`/api/students/${id}`, {
      method: "DELETE",
    });

    await loadStudents();
  }

  return (
    <main className="page">
      <h1>Список студентов</h1>

      <form className="student-form" onSubmit={addStudent}>
        <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Имя" />

        <input
          value={age}
          onChange={(event) => setAge(event.target.value)}
          placeholder="Возраст"
          type="number"
        />

        <input
          value={group}
          onChange={(event) => setGroup(event.target.value)}
          placeholder="Группа"
        />

        <button type="submit">Добавить</button>
      </form>

      {error !== "" && <p className="error">{error}</p>}

      <div className="students">
        {students.map((student) => (
          <div className="student" key={student.id}>
            <div>
              <b>{student.name}</b>
              <p>
                Возраст: {student.age}, группа: {student.student_group}
              </p>
            </div>

            <button type="button" onClick={() => void deleteStudent(student.id)}>
              Удалить
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
