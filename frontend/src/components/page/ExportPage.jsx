import React from 'react';
import { Flex } from '@chakra-ui/react';
import PageHeading from '../widget/PageHeading.jsx';
import InformationCard from '../widget/InformationCard.jsx';
import ExportTable from '../widget/ExportTable.jsx';
import AddNewButton from '../widget/AddNewButton.jsx';

const ExportPage = () => {
  const items = [
    {
      id: 1,
      product: "Laptop",
      qty: 50,
      exportto: "United States",
      exportedtime: "2024-12-20 14:00:00",
      confirmedtime: "2024-12-21 10:00:00",
    },
    {
      id: 2,
      product: "Smartphone",
      qty: 200,
      exportto: "Germany",
      exportedtime: "2024-12-19 12:00:00",
      confirmedtime: "",
    },
    {
      id: 3,
      product: "Headphones",
      qty: 150,
      exportto: "Canada",
      exportedtime: "2024-12-18 15:30:00",
      confirmedtime: "2024-12-19 09:00:00",
    },
    {
      id: 4,
      product: "Gaming Console",
      qty: 75,
      exportto: "Japan",
      exportedtime: "2024-12-17 16:45:00",
      confirmedtime: "",
    },
    {
      id: 5,
      product: "Tablet",
      qty: 120,
      exportto: "United Kingdom",
      exportedtime: "2024-12-16 10:15:00",
      confirmedtime: "2024-12-17 08:30:00",
    },
    {
      id: 6,
      product: "Smartwatch",
      qty: 80,
      exportto: "Australia",
      exportedtime: "2024-12-15 09:00:00",
      confirmedtime: "",
    },
    {
      id: 7,
      product: "Camera",
      qty: 40,
      exportto: "France",
      exportedtime: "2024-12-14 14:30:00",
      confirmedtime: "2024-12-15 11:45:00",
    },
    {
      id: 8,
      product: "Monitor",
      qty: 65,
      exportto: "South Korea",
      exportedtime: "2024-12-13 13:00:00",
      confirmedtime: "",
    },
    {
      id: 9,
      product: "Keyboard",
      qty: 90,
      exportto: "India",
      exportedtime: "2024-12-12 11:00:00",
      confirmedtime: "2024-12-13 09:30:00",
    },
    {
      id: 10,
      product: "Mouse",
      qty: 110,
      exportto: "Singapore",
      exportedtime: "2024-12-11 10:45:00",
      confirmedtime: "",
    },
  ];
  
  return (
    <>
      <Flex justify={'space-between'} width={'100%'} align={'center'}>
        <PageHeading text={'Export'}/>
        <AddNewButton/>
      </Flex>
      <Flex my={'2%'} gap={'1%'} justify={'space-between'} width={'100%'}>
      <InformationCard value='23.59' title='Clock' description='Current Time (GMT+7)'/>
        <InformationCard value='1' title='Departed' description='Goods exported'/>
        <InformationCard value='30' title='Confirmed' description='Successful transaction'/>
      </Flex>
      <ExportTable data={items}/>
    </>
  );
};

export default ExportPage;