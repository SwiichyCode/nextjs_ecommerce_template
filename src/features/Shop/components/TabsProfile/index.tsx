'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter } from 'next/navigation';

type TabsList = 'account' | 'orders';

export const TabsProfile = () => {
  const router = useRouter();

  const handleValueChange = (value: TabsList) => {
    if (value === 'account') {
      router.push('/shop/profile');
      return;
    }

    router.push(`/shop/profile/${value}`);
  };

  return (
    <Tabs
      defaultValue="account"
      onValueChange={(value) => handleValueChange(value as TabsList)}
    >
      <TabsList className="grid w-full max-w-96 grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="orders">Orders</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
