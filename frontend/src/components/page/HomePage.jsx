import { useEffect } from 'react';
import { Flex, Text, Button } from '@chakra-ui/react';
import PageHeading from '../widget/PageHeading';
import SummaryCard from '../widget/SummaryCard';
import isSessionValid from '../../util/isSessionValid';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

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

  const handleLogout = async () => {
    Cookies.remove('walletId');
    Cookies.remove('password');
    navigate('/login');
  };

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
          <Button
              backgroundColor={'#262A41'}
              color={'white'}
              onClick={handleLogout}
            >
              Logout
          </Button>
        </Flex>
        <Text color={'gray.500'}>Wallet ID: {Cookies.get('walletId')}</Text>
        <Flex direction={'column'} align={'center'} justify={'center'} height={'100%'}>
        <Flex mt="2%" gap="2%" justify="center" wrap="wrap" width="100%">
          <Flex direction="row" width="100%" gap="2%" mb="4" justify="center">
            <SummaryCard value="23.59" title="Current Time" description="GMT+7" />
            <SummaryCard value="1" title="Inbox" description="Total transactions" />
            <SummaryCard value="1" title="Imported" description="Goods arrived to be imported" />
          </Flex>

          <Flex direction="row" width="100%" gap="2%" mb="4" justify="center">
            <SummaryCard value="30" title="Export Departed" description="Confirmed Imported Goods" />
            <SummaryCard value="1" title="Export Confirmed" description="Goods exported" />
            <SummaryCard value="30" title="Export Cancelled" description="Successful transaction" />
          </Flex>
        </Flex>
      </Flex>
      
    </>
  );
};

export default HomePage;
