import React from "react";
import { HStack, Flex, Stack, Table } from "@chakra-ui/react";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/components/ui/pagination";
import ActionButton from "./ActionButton";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";
import { Toaster, toaster } from "@/components/ui/toaster"

const InboxTable = ({ data, onConfirm, onDeny, isLoading }) => {
  const [page, setPage] = useState(1);
  const [visibleData, setVisibleData] = useState([]);
  const pageSize = 5;

  useEffect(() => {
    const startIndex = (page - 1) * pageSize;
    setVisibleData(data.slice(startIndex, startIndex + pageSize))
  }, [page, data]);

  return (
    <Flex width='100%' height="100%" justify={'space-between'} direction={'column'}>
      <Table.Root size="sm" variant="outline" borderRadius={"lg"}>
        <Table.Header backgroundColor={"#262A41"}>
          <Table.Row>
            <Table.ColumnHeader>Product</Table.ColumnHeader>
            <Table.ColumnHeader>Qty</Table.ColumnHeader>
            <Table.ColumnHeader>Exporter</Table.ColumnHeader>
            <Table.ColumnHeader>Exported Time</Table.ColumnHeader>
            <Table.ColumnHeader>Actions</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {isLoading ? 
            <Table.Row key="XXXX" color={"black"}>
            <Table.Cell>
              <Skeleton flex="1" height="5" variant="pulse" />
            </Table.Cell>
            <Table.Cell>
              <Skeleton flex="1" height="5" variant="pulse" />
            </Table.Cell>
            <Table.Cell>
              <Skeleton flex="1" height="5" variant="pulse" />
            </Table.Cell>
            <Table.Cell>
              <Skeleton flex="1" height="5" variant="pulse" />
            </Table.Cell>
            <Table.Cell>
              <Skeleton flex="1" height="5" variant="pulse" />
            </Table.Cell>
          </Table.Row>
          :
          visibleData.map((item) => (
            <Table.Row key={item.transactionHash} color={"black"}>
              <Table.Cell>{item.product}</Table.Cell>
              <Table.Cell>{item.qty.toString()}</Table.Cell>
              <Table.Cell title={item.exporter}>
                {item.exporter}
              </Table.Cell>
              <Table.Cell>
                {typeof item.exportedTime === "string"
                  ? item.exportedTime
                  : new Date(Number(item.exportedTime) * 1000).toLocaleString()}
              </Table.Cell>
              <Table.Cell>
                {item.confirmedTime ? (
                  "Confirmed"
                ) : (
                  <Stack direction="row" spacing={2}>
                    <ActionButton
                      transactionHash={item.transactionHash}
                      onAction={onConfirm}
                      actionType="confirm"
                      triggerText="Click to Confirm"
                      dialogTitle="Import Goods?"
                      dialogDescription="Are you sure you want to import this item?"
                      buttonText="Confirm"
                      buttonColor="green"
                      toaster={toaster}
                    />
                    <ActionButton
                      transactionHash={item.transactionHash}
                      onAction={onDeny}
                      actionType="deny"
                      triggerText="Click to Deny"
                      dialogTitle="Deny Import?"
                      dialogDescription="Are you sure you want to deny importing this item?"
                      buttonText="Deny"
                      buttonColor="red"
                      toaster={toaster}
                    />
                  </Stack>
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Toaster />

      <Flex justify={"center"} width={"100%"}>
        <PaginationRoot
          count={data.length}
          pageSize={pageSize}
          defaultPage={1}
          onPageChange={(e) => setPage(e.page)}
        >
          <HStack wrap="wrap">
            <PaginationPrevTrigger color={"black"} />
            <PaginationItems color={"black"} />
            <PaginationNextTrigger color={"black"} />
          </HStack>
        </PaginationRoot>
      </Flex>
    </Flex>
  );
};

export default InboxTable;