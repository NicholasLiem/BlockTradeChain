import React from 'react';
import { Heading } from '@chakra-ui/react';

const PageHeading = ({text}) => {

  return (
    <>
      <Heading color={'#262A41'} size={'4xl'}>{text}</Heading>
    </>
  );
};

export default PageHeading;
