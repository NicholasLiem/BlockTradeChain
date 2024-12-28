import React from 'react';
import { Heading } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';

const NavigationButton = ({ text, path }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    navigate(path);
  };

  return (
    <>
      <Heading
        onClick={handleClick}
        size={'5xl'}
        my={'2%'}
        opacity={location.pathname == path ? 1 : 0.5}
        _hover={{
          opacity: 1,
          transform: 'scale(1.3)', 
          cursor: 'pointer',
        }}
        transition="transform 0.3s ease, opacity 0.3s ease"
      >
        {text}
      </Heading>
    </>
  );
};

export default NavigationButton;
