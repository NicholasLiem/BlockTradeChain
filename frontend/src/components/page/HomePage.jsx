import { useEffect } from 'react';
import { Flex, Text } from '@chakra-ui/react';
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
      <Flex 
        justify="space-between" 
        align="center"
        width="100%" 
        mt="2%"
        minHeight="80px"
      >
        <PageHeading text={'Welcome back! Let’s track your shipments.'} />
        <Flex align="center">
          <Text fontSize="4xl" fontWeight="bold" color="#262A41" mr="2">
            {23.59}
          </Text>
          <Text fontSize="sm" color="gray.500">
            (GMT+7)
          </Text>
        </Flex>
      </Flex>

      <Flex mt="2%" gap="2%" justify="center" wrap="wrap" width="100%">
        <Flex direction="row" width="100%" gap="2%" mb="4" justify="center">
          <InformationCard value="1" title="Transactions" description="Total transactions" />
          <InformationCard value="1" title="Ready" description="Goods arrived to be imported" />
        </Flex>

        <Flex direction="row" width="100%" gap="2%" mb="4" justify="center">
          <InformationCard value="30" title="Imported" description="Confirmed Imported Goods" />
          <InformationCard value="1" title="Departed" description="Goods exported" />
          <InformationCard value="30" title="Confirmed" description="Successful transaction" />
        </Flex>
      </Flex>
    </>
  );
};

export default HomePage;
