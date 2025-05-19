import { LineType } from "@/types";
import { create } from "zustand";

interface DrawingState {
  lines: LineType[];
  addLine: (line: LineType) => void;
  setLines: (lines: LineType[]) => void;
}

export const useStore = create<DrawingState>((set) => ({
  lines: [],
  addLine: (line) => set((state) => ({ lines: [...state.lines, line] })),
  setLines: (lines) => set({ lines }),
}));
