// app/index.tsx
import { ConfirmModal } from "@/src/components/ConfirmModal";
import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
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
  const [confirmVisible, setConfirmVisible] = useState(false);

  useEffect(() => {
    const load = async () => {
      await todoService.init();
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

  const handleClearAll = async () => {
    await todoService.clear();
    setTasks([]);
    setConfirmVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do List 📝</Text>

      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Digite uma tarefa"
          placeholderTextColor="#999" // cinza visível em qualquer tema
          value={input}
          onChangeText={setInput}
          style={styles.input}
        />
        <Pressable style={styles.addButton} onPress={handleAdd}>
          <AntDesign name="pluscircleo" size={24} color="#007bff" />
          <Text style={styles.addButtonText}>Adicionar</Text>
        </Pressable>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.taskCard,
              item.done && styles.taskCardDone,
            ]}
          >
            <TaskItem task={item} onPress={handleSelectTask} />
          </View>
        )}
        contentContainerStyle={styles.taskList}
        ListFooterComponent={
          tasks.length > 0 ? (
            <Pressable
            style={styles.clearButton}
            onPress={() => setConfirmVisible(true)}
          >
            <AntDesign name="delete" size={20} color="#dc3545" />
            <Text style={styles.clearButtonText}>Limpar tudo</Text>
          </Pressable>
          ) : null
        }
      />




      <TaskModal
        visible={modalVisible}
        task={selectedTask}
        onClose={() => setModalVisible(false)}
        onUpdate={handleUpdate}
        onToggleDone={handleToggleDone}
        onRemove={handleRemove}
      />

<ConfirmModal
        visible={confirmVisible}
        message="Tem certeza que deseja apagar todas as tarefas?"
        onCancel={() => setConfirmVisible(false)}
        onConfirm={handleClearAll}
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
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#e6f0ff",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
  },
  addButtonText: {
    color: "#007bff",
    fontWeight: "bold",
  },
  taskList: {
    paddingBottom: 32,
    gap: 12,
  },
  taskCard: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  taskCardDone: {
    backgroundColor: "#e8e8e8",
    opacity: 0.7,
  },
  clearButton: {
    marginTop: 20,
    alignSelf: "center",
    flexDirection: "row",
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ff4444",
  },
  clearButtonText: {
    color: "#ff4444",
    fontWeight: "bold",
  },
});
