import React, {useEffect} from 'react';
import { Flex } from '@chakra-ui/react';
import PageHeading from '../widget/PageHeading';
import InformationCard from '../widget/InformationCard';
import isSessionValid from '../../util/isSessionValid';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
        var status = await isSessionValid()
        if (!status) {
            navigate('/login');
        }
    };

    checkSession();
  }, [navigate]); 

  return (
    <>
      <PageHeading text={'Hi, Nicholas Liem'}/>
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

export default HomePage;