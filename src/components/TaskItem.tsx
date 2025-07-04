// components/TaskItem.tsx

import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { Task } from "../services/ToDoService";

type Props = {
  task: Task;
  onPress: (task: Task) => void;
};

export function TaskItem({ task, onPress }: Props) {
  return (
    <Pressable onPress={() => onPress(task)}>
      <Text style={[styles.text, task.done && styles.textDone]}>
        • {task.title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    marginVertical: 6,
  },
  textDone: {
    textDecorationLine: "line-through",
    color: "#999",
  },
});