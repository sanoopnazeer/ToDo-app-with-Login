import { axiosUserInstance } from "../axios";

export const addItem = async (item, id) => {
  const { data } = await axiosUserInstance.post("/addItem", { item, id });
  if (data) return data;
};

export const getAllNotes = async (id) => {
  const { data } = await axiosUserInstance.get(`/getAllNotes/${id}`);
  if (data) return data;
};

export const deleteNote = async (id) => {
    const { data } = await axiosUserInstance.delete(`/deleteNote/${id}`)
  if (data) return data;
}

export const handleComplete = async (id, isChecked) => {
  const { data } = await axiosUserInstance.patch(`/completeTask/${id}`, {isChecked})
  if (data) return data;
}

export const saveNote = async (id, item) => {
  const { data } = await axiosUserInstance.patch(`/saveNote/${id}`, {item})
  if (data) return data;
}