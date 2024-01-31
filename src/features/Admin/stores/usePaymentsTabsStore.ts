import { create } from "zustand";

export type TabsState = "all" | "succeeded" | "canceled";

type PaymentsTabsState = {
  tab: TabsState;
  stateLength: Record<TabsState, number>;
  setTab: (tab: TabsState) => void;
  setLength: (length: Record<TabsState, number>) => void;
};

export const usePaymentsTabsStore = create<PaymentsTabsState>((set) => ({
  tab: "all",
  stateLength: {
    all: 0,
    succeeded: 0,
    canceled: 0,
  },
  setTab: (tab: TabsState) => set({ tab }),
  setLength: (length: Record<TabsState, number>) => {
    set({ stateLength: length });
  },
}));
