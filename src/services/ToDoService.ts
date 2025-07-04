// src/services/ToDoService.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Task = {
  id: string;
  title: string;
  done: boolean;
};

export class ToDoService {
  private tasks: Task[] = [];

  async init() {
    const json = await AsyncStorage.getItem("TASKS");
    this.tasks = json ? JSON.parse(json) : [];
  }

  getAll(): Task[] {
    return this.tasks;
  }

  private async save() {
    await AsyncStorage.setItem("TASKS", JSON.stringify(this.tasks));
  }

  async add(title: string): Promise<void> {
    const newTask: Task = {
      id: Date.now().toString(),
      title: title.trim(),
      done: false,
    };
    this.tasks.push(newTask);
    await this.save();
  }

  async update(id: string, newTitle: string): Promise<void> {
    this.tasks = this.tasks.map((task) =>
      task.id === id ? { ...task, title: newTitle.trim() } : task
    );
    await this.save();
  }

  async toggleDone(id: string): Promise<void> {
    this.tasks = this.tasks.map((task) =>
      task.id === id ? { ...task, done: !task.done } : task
    );
    await this.save();
  }

  async remove(id: string): Promise<void> {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    await this.save();
  }

  // dentro da classe ToDoService
  async clear() {
    this.tasks = [];
    await this.save();
  }
}