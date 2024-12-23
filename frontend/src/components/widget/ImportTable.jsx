import { HStack, Flex, Stack, Table } from "@chakra-ui/react"
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/components/ui/pagination"
import ConfirmButton from "./ConfirmButton";

const ImportTable = ({data}) => {
  return (
    <Stack width="full" gap="5">
      <Table.Root size="sm" variant="outline" borderRadius={'lg'}>
        <Table.Header backgroundColor={'#262A41'}>
          <Table.Row>
            <Table.ColumnHeader>Product</Table.ColumnHeader>
            <Table.ColumnHeader>Qty</Table.ColumnHeader>
            <Table.ColumnHeader>Exporter</Table.ColumnHeader>
            <Table.ColumnHeader>Exported Time</Table.ColumnHeader>
            <Table.ColumnHeader>Confirmed Time</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((item) => (
            <Table.Row key={item.id} color={'black'}>
              <Table.Cell >{item.product}</Table.Cell>
              <Table.Cell>{item.qty}</Table.Cell>
              <Table.Cell>{item.exporter}</Table.Cell>
              <Table.Cell>{item.exportedtime}</Table.Cell>
              <Table.Cell>{item.confirmedtime == '' ? <ConfirmButton/> : item.confirmedtime}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      <Flex justify={'center'} width={'100%'}>
        <PaginationRoot count={data.length * 5} pageSize={5} page={1}>
          <HStack wrap="wrap">
            <PaginationPrevTrigger color={'black'}/>
            <PaginationItems color={'black'}/>
            <PaginationNextTrigger color={'black'}/>
          </HStack>
        </PaginationRoot>
      </Flex>
    </Stack>
  )
}

export default ImportTable;

