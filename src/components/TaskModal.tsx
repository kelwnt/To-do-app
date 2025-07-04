// components/TaskModal.tsx

import React, { useState } from "react";
import {
  Button,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Task } from "../services/ToDoService";

type Props = {
  visible: boolean;
  task: Task | null;
  onClose: () => void;
  onUpdate: (id: string, newTitle: string) => void;
  onToggleDone: (id: string) => void;
  onRemove: (id: string) => void;
};

export function TaskModal({
  visible,
  task,
  onClose,
  onUpdate,
  onToggleDone,
  onRemove,
}: Props) {
  const [editTitle, setEditTitle] = useState("");

  React.useEffect(() => {
    if (task) setEditTitle(task.title);
  }, [task]);

  if (!task) return null;

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Editar Tarefa</Text>

          <TextInput
            value={editTitle}
            onChangeText={setEditTitle}
            style={styles.input}
            placeholder="Título da tarefa"
          />

          <View style={styles.buttonGroup}>
            <Button
              title="Salvar"
              onPress={() => {
                onUpdate(task.id, editTitle);
                onClose();
              }}
            />
            <Button
              title={task.done ? "Desmarcar" : "Concluir"}
              onPress={() => {
                onToggleDone(task.id);
                onClose();
              }}
            />
            <Button
              title="Excluir"
              color="red"
              onPress={() => {
                onRemove(task.id);
                onClose();
              }}
            />
          </View>

          <Button title="Fechar" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#000000aa",
    padding: 24,
  },
  modal: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 12,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  buttonGroup: {
    flexDirection: "column",
    gap: 8,
    marginBottom: 10,
  },
});
