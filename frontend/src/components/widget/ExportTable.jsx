import { HStack, Flex, Stack, Table } from "@chakra-ui/react";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/components/ui/pagination"
import TableDetailButton from "./TableDetailButton";

const ExportTable = ({ data }) => {
  return (
    <Stack width="full" gap="5">
      <Table.Root size="sm" variant="outline" borderRadius={"lg"}>
        <Table.Header backgroundColor={"#262A41"}>
          <Table.Row>
            <Table.ColumnHeader>Product</Table.ColumnHeader>
            <Table.ColumnHeader>Qty</Table.ColumnHeader>
            <Table.ColumnHeader>Exported To</Table.ColumnHeader>
            <Table.ColumnHeader>Details</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((item) => (
            <Table.Row key={item.id} color={"black"}>
              <Table.Cell>{item.product}</Table.Cell>
              <Table.Cell>{item.qty}</Table.Cell>
              <Table.Cell>{item.exportto}</Table.Cell>
              <Table.Cell><TableDetailButton itemid={item.id} exporttime={item.exportedtime} importtime={item.confirmedtime} origin={item.origin} target={item.target} exchangeRate={item.exchangeRate} exchangeRateTimestamp={item.exchangeRateTimestamp}/></Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      <Flex justify={"center"} width={"100%"}>
        <PaginationRoot count={data.length * 5} pageSize={5} page={1}>
          <HStack wrap="wrap">
            <PaginationPrevTrigger color={"black"} />
            <PaginationItems color={"black"} />
            <PaginationNextTrigger color={"black"} />
          </HStack>
        </PaginationRoot>
      </Flex>
    </Stack>
  );
};

export default ExportTable;