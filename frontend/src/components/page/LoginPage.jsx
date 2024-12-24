import React from 'react';
import { Flex } from '@chakra-ui/react';
import PageHeading from '../widget/PageHeading';
import InformationCard from '../widget/InformationCard';

const LoginPage = () => {
  const items = [
    { id: 1, name: "Laptop", category: "Electronics", price: 999.99 },
    { id: 2, name: "Coffee Maker", category: "Home Appliances", price: 49.99 },
    { id: 3, name: "Desk Chair", category: "Furniture", price: 150.0 },
    { id: 4, name: "Smartphone", category: "Electronics", price: 799.99 },
    { id: 5, name: "Headphones", category: "Accessories", price: 199.99 },
    { id: 6, name: "Headphones", category: "Accessories", price: 199.99 },
    { id: 7, name: "Headphones", category: "Accessories", price: 199.99 },
    { id: 8, name: "Headphones", category: "Accessories", price: 199.99 },
    { id: 9, name: "Headphones", category: "Accessories", price: 199.99 },
    { id: 10, name: "Headphones", category: "Accessories", price: 199.99 },
  ]

  return (
    <>
      <PageHeading text={'Empo'}/>
      <Flex mt={'2%'} gap={'1%'} justify={'space-between'} width={'100%'}>
        <InformationCard value='23.59' title='Clock' description='Current Time (GMT+7)'/>
        <InformationCard value='1' title='Transactions' description='Total transactions'/>
      </Flex>
      <Flex mt={'2%'} gap={'1%'} justify={'space-between'} width={'100%'}>
        <InformationCard value='1' title='Ready' description='Goods arrived to be imported'/>
        <InformationCard value='30' title='Imported' description='Confirmed Imported Goods'/>
      </Flex>
      <Flex mt={'2%'} gap={'1%'} justify={'space-between'} width={'100%'}>
        <InformationCard value='1' title='Departed' description='Goods exported'/>
        <InformationCard value='30' title='Confirmed' description='Successful transaction'/>
      </Flex>
    </>
  );
};

export default LoginPage;