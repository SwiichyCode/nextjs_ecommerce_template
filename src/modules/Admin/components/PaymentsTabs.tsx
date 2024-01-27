"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  type TabsState,
  usePaymentsTabsStore,
} from "../stores/usePaymentsTabsStore";

type TabTriggerProps = {
  value: TabsState;
  text: string;
};

const TabTrigger = ({ value, text }: TabTriggerProps) => {
  const { stateLength } = usePaymentsTabsStore();
  return (
    <TabsTrigger
      value={value}
      className="box-border flex max-h-[66px] w-3/12 flex-col items-start gap-2 border bg-white px-4 py-2 shadow-none data-[state=active]:border-[#4945FF]"
    >
      <span className="text-base font-medium text-[#414552]">{text}</span>{" "}
      <span className="font-bold text-[#414552]">{stateLength[value]}</span>
    </TabsTrigger>
  );
};

export const PaymentsTabs = () => {
  const { setTab } = usePaymentsTabsStore();

  return (
    <Tabs
      defaultValue="all"
      onValueChange={(value) => setTab(value as TabsState)}
    >
      <TabsList className="flex h-[66px] w-full justify-start gap-2">
        <TabTrigger value="all" text="All" />
        <TabTrigger value="succeeded" text="Succeeded" />
        <TabTrigger value="canceled" text="Failed" />
      </TabsList>
    </Tabs>
  );
};
