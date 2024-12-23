import { Flex } from "@chakra-ui/react"
import {
  RadioCardItem,
  RadioCardRoot,
} from "@/components/ui/radio-card"

const RadioCard = () => {
  return (
    <RadioCardRoot defaultValue="next" width={'100%'}>
      <Flex justify={'space-between'} gap={'2%'} >
        <RadioCardItem 
            color={'black'}
            width={'100%'}
            label={'My Transaction'}
            description={'Only List Transaction Related To Me'}
            key={'person'}
            value={'person'}
        />
        <RadioCardItem
            color={'black'}
            width={'100%'}
            label={'All Transaction'}
            description={'List All Transaction in Chain'}
            key={'all'}
            value={'all'}
          />
      </Flex>
    </RadioCardRoot>
  )
}

export default RadioCard;
