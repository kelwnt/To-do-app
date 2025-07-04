import { Feather, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View
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
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.modal}>
              <Text style={styles.title}>Editar Tarefa</Text>

              <TextInput
                value={editTitle}
                onChangeText={setEditTitle}
                style={styles.input}
                placeholder="Título da tarefa"
              />

              <View style={styles.buttonRow}>
                <Pressable
                  style={styles.modalButton}
                  onPress={() => {
                    onUpdate(task.id, editTitle);
                    onClose();
                  }}
                >
                  <Feather name="save" size={20} color="#007bff" />
                  <Text style={styles.modalButtonText}>Salvar</Text>
                </Pressable>

                <Pressable
                  style={styles.modalButton}
                  onPress={() => {
                    onToggleDone(task.id);
                    onClose();
                  }}
                >
                  <FontAwesome
                    name={task.done ? "undo" : "check"}
                    size={20}
                    color={task.done ? "#999" : "#28a745"}
                  />
                  <Text style={styles.modalButtonText}>
                    {task.done ? "Desmarcar" : "Concluir"}
                  </Text>
                </Pressable>

                <Pressable
                  style={[styles.modalButton, { backgroundColor: "#fdd" }]}
                  onPress={() => {
                    onRemove(task.id);
                    onClose();
                  }}
                >
                  <MaterialIcons name="delete" size={20} color="red" />
                  <Text style={[styles.modalButtonText, { color: "red" }]}>
                    Excluir
                  </Text>
                </Pressable>
              </View>

              <Pressable onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Fechar</Text>
              </Pressable>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
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

  buttonRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "space-between",
    marginBottom: 16,
  },

  modalButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 8,
    flexGrow: 1,
    flexBasis: "30%",
  },

  modalButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },

  closeButton: {
    alignSelf: "center",
    marginTop: 4,
  },

  closeButtonText: {
    color: "#007bff",
    fontWeight: "bold",
  },
});