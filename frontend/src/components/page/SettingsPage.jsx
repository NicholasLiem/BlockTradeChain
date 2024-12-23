import React from 'react';
import { Button, Flex } from '@chakra-ui/react';
import { DataListItem, DataListRoot } from "@/components/ui/data-list"
import PageHeading from '../widget/PageHeading';

const SettingsPage = () => {
  const stats = [
    { label: "Name", value: "Nicholas Liem", diff: -12, helpText: "Till date" },
    { label: "ID Wallet", value: "JNJKBWJKBNFJKNKL", diff: 12, helpText: "Last 30 days" },
  ]

  return (
    <>
      <Flex justify={'space-between'} width={'100%'} align={'center'}>
        <PageHeading text={'Settings'}/>
        <Button backgroundColor={'#262A41'} color={'white'}>Logout</Button>
      </Flex>
      <DataListRoot orientation="horizontal" mt={'2%'} color={'black'}>
        {stats.map((item) => (
          <DataListItem key={item.label} label={item.label} value={item.value} />
        ))}
      </DataListRoot>
    </>
  )
};

export default SettingsPage;