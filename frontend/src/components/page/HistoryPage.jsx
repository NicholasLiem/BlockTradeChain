import React, {useEffect} from 'react';
import { Flex } from '@chakra-ui/react';
import PageHeading from '../widget/PageHeading';
import RadioCard from '../widget/RadioCard';
import HistoryTable from '../widget/HistoryTable';
import isSessionValid from '../../util/isSessionValid';
import { useNavigate } from 'react-router-dom';

const HistoryPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSessionValid()) {
      navigate('/login');
    }
  }, [navigate]); 

  const items = [
    {
      id: 1,
      product: "Product A",
      qty: 100,
      exporter: "Exporter X",
      importer: "Importer Y",
      itemexporttime: "2024-01-10 14:30:00",
      itemimporttime: "2024-01-12 16:45:00",
    },
    {
      id: 2,
      product: "Product B",
      qty: 50,
      exporter: "Exporter Z",
      importer: "Importer W",
      itemexporttime: "2024-01-11 09:15:00",
      itemimporttime: "2024-01-13 11:00:00",
    },
    {
      id: 3,
      product: "Product C",
      qty: 150,
      exporter: "Exporter A",
      importer: "Importer B",
      itemexporttime: "2024-01-15 08:00:00",
      itemimporttime: "2024-01-17 10:30:00",
    },
    {
      id: 4,
      product: "Product D",
      qty: 200,
      exporter: "Exporter C",
      importer: "Importer D",
      itemexporttime: "2024-01-20 14:45:00",
      itemimporttime: "2024-01-22 16:15:00",
    },
    {
      id: 5,
      product: "Product E",
      qty: 300,
      exporter: "Exporter E",
      importer: "Importer F",
      itemexporttime: "2024-01-25 12:30:00",
      itemimporttime: "2024-01-27 14:00:00",
    },
    {
      id: 6,
      product: "Product F",
      qty: 120,
      exporter: "Exporter G",
      importer: "Importer H",
      itemexporttime: "2024-02-01 10:30:00",
      itemimporttime: "2024-02-03 12:00:00",
    },
    {
      id: 7,
      product: "Product G",
      qty: 250,
      exporter: "Exporter I",
      importer: "Importer J",
      itemexporttime: "2024-02-05 14:00:00",
      itemimporttime: "2024-02-07 16:30:00",
    },
    {
      id: 8,
      product: "Product H",
      qty: 90,
      exporter: "Exporter K",
      importer: "Importer L",
      itemexporttime: "2024-02-10 08:30:00",
      itemimporttime: "2024-02-12 11:00:00",
    },
    {
      id: 9,
      product: "Product I",
      qty: 70,
      exporter: "Exporter M",
      importer: "Importer N",
      itemexporttime: "2024-02-15 13:00:00",
      itemimporttime: "2024-02-17 15:30:00",
    },
    {
      id: 10,
      product: "Product J",
      qty: 180,
      exporter: "Exporter O",
      importer: "Importer P",
      itemexporttime: "2024-02-20 09:00:00",
      itemimporttime: "2024-02-22 11:45:00",
    },
  ];

  return (
    <>
      <PageHeading text={'History'}/>
      <Flex my={'2%'} gap={'1%'} justify={'space-between'} width={'100%'}>
        <RadioCard/>
      </Flex>
      <HistoryTable data={items}/>
    </>
  );
};

export default HistoryPage;