import React from "react";
import { HStack, Flex, Stack, Table } from "@chakra-ui/react";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/components/ui/pagination";
import ConfirmButton from "./ConfirmButton";

const ImportTable = ({ data, onConfirm }) => {
  return (
    <Stack width="full" gap="5">
      <Table.Root size="sm" variant="outline" borderRadius={"lg"}>
        <Table.Header backgroundColor={"#262A41"}>
          <Table.Row>
            <Table.ColumnHeader>Product</Table.ColumnHeader>
            <Table.ColumnHeader>Qty</Table.ColumnHeader>
            <Table.ColumnHeader>Exporter</Table.ColumnHeader>
            <Table.ColumnHeader>Exported Time</Table.ColumnHeader>
            <Table.ColumnHeader>Confirmed Time</Table.ColumnHeader>
            <Table.ColumnHeader>Actions</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((item) => (
            <Table.Row key={item.transactionHash} color={"black"}>
              <Table.Cell>{item.product}</Table.Cell>
              <Table.Cell>{item.qty.toString()}</Table.Cell>
              <Table.Cell title={item.exporter}>
                {item.exporter.substring(0, 10)}...
              </Table.Cell>
              <Table.Cell>
                {typeof item.exportedTime === "string"
                  ? item.exportedTime
                  : new Date(Number(item.exportedTime) * 1000).toLocaleString()}
              </Table.Cell>
              <Table.Cell>
                {item.confirmedTime
                  ? typeof item.confirmedTime === "string"
                    ? item.confirmedTime
                    : new Date(Number(item.confirmedTime) * 1000).toLocaleString()
                  : "Not Confirmed"}
              </Table.Cell>
              <Table.Cell>
                {item.confirmedTime ? (
                  "Confirmed"
                ) : (
                  <ConfirmButton
                    transactionHash={item.transactionHash}
                    onConfirm={onConfirm}
                  />
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      <Flex justify={"center"} width={"100%"}>
        <PaginationRoot count={data.length} pageSize={5} page={1}>
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

export default ImportTable;