import React from 'react';
import { Flex } from '@chakra-ui/react';
import PageHeading from '../widget/PageHeading';
import InformationCard from '../widget/InformationCard';
import ImportTable from '../widget/ImportTable';

const InboxPage = () => {
  const items = [
    {
      id: 1,
      product: "Laptop",
      qty: 50,
      exporter: "TechCorp",
      exportedtime: "2024-12-20 14:00:00",
      confirmedtime: "2024-12-21 10:00:00",
    },
    {
      id: 2,
      product: "Smartphone",
      qty: 200,
      exporter: "GadgetWorld",
      exportedtime: "2024-12-19 12:00:00",
      confirmedtime: "",
    },
    {
      id: 3,
      product: "Headphones",
      qty: 150,
      exporter: "AudioMax",
      exportedtime: "2024-12-18 15:30:00",
      confirmedtime: "2024-12-19 09:00:00",
    },
    {
      id: 4,
      product: "Gaming Console",
      qty: 75,
      exporter: "PlayWare",
      exportedtime: "2024-12-17 16:45:00",
      confirmedtime: "",
    },
    {
      id: 5,
      product: "Tablet",
      qty: 120,
      exporter: "TabMakers",
      exportedtime: "2024-12-16 10:15:00",
      confirmedtime: "2024-12-17 08:30:00",
    },
    {
      id: 6,
      product: "Smartwatch",
      qty: 80,
      exporter: "TimeTech",
      exportedtime: "2024-12-15 09:00:00",
      confirmedtime: "",
    },
    {
      id: 7,
      product: "Camera",
      qty: 40,
      exporter: "PixelPerfect",
      exportedtime: "2024-12-14 14:30:00",
      confirmedtime: "2024-12-15 11:45:00",
    },
    {
      id: 8,
      product: "Monitor",
      qty: 65,
      exporter: "ScreenWorks",
      exportedtime: "2024-12-13 13:00:00",
      confirmedtime: "",
    },
    {
      id: 9,
      product: "Keyboard",
      qty: 90,
      exporter: "KeyTech",
      exportedtime: "2024-12-12 11:00:00",
      confirmedtime: "2024-12-13 09:30:00",
    },
    {
      id: 10,
      product: "Mouse",
      qty: 110,
      exporter: "ClickCraft",
      exportedtime: "2024-12-11 10:45:00",
      confirmedtime: "",
    },
  ];

  return (
    <>
      <PageHeading text={'Inbox'}/>
      <Flex my={'2%'} gap={'1%'} justify={'space-between'} width={'100%'}>
        <InformationCard value='23.59' title='Clock' description='Current Time (GMT+7)'/>
        <InformationCard value='1' title='Ready' description='Goods arrived to be imported'/>
        <InformationCard value='30' title='Imported' description='Confirmed Imported Goods'/>
      </Flex>
      <ImportTable data={items}/>
    </>
  );
};

export default InboxPage;