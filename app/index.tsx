// app/index.tsx
import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { TaskItem } from "../src/components/TaskItem";
import { TaskModal } from "../src/components/TaskModal";
import { Task, ToDoService } from "../src/services/ToDoService";

const todoService = new ToDoService();

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    const load = async () => {
      await todoService.init(); // ← carrega do AsyncStorage
      setTasks(todoService.getAll());
    };
    load();
  }, []);

  const handleAdd = async () => {
    if (input.trim() === "") return;
    await todoService.add(input);
    setTasks(todoService.getAll());
    setInput("");
  };

  const handleSelectTask = (task: Task) => {
    setSelectedTask(task);
    setModalVisible(true);
  };

  const handleUpdate = async (id: string, newTitle: string) => {
    await todoService.update(id, newTitle);
    setTasks(todoService.getAll());
  };

  const handleToggleDone = async (id: string) => {
    await todoService.toggleDone(id);
    setTasks(todoService.getAll());
  };

  const handleRemove = async (id: string) => {
    await todoService.remove(id);
    setTasks(todoService.getAll());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do List 📝</Text>

      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Digite uma tarefa"
          value={input}
          onChangeText={setInput}
          style={styles.input}
        />
        <Button title="Adicionar" onPress={handleAdd} />
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem task={item} onPress={handleSelectTask} />
        )}
        contentContainerStyle={{ paddingVertical: 12 }}
      />

      <TaskModal
        visible={modalVisible}
        task={selectedTask}
        onClose={() => setModalVisible(false)}
        onUpdate={handleUpdate}
        onToggleDone={handleToggleDone}
        onRemove={handleRemove}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  inputGroup: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
  },
});
