import { HStack, Flex, Stack, Table } from "@chakra-ui/react";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/components/ui/pagination";
import TableDetailButton from "./TableDetailButton";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";

const ExportTable = ({ data, isLoading }) => {
  const [page, setPage] = useState(1);
  const [visibleData, setVisibleData] = useState([]);
  const pageSize = 5; 

  useEffect(() => {
    const startIndex = (page - 1) * pageSize;
    console.log(startIndex)
    setVisibleData(data.slice(startIndex, startIndex + pageSize))
  }, [page, data]);

  return (
    <Flex width='100%' height="100%" justify={'space-between'} direction={'column'}>
      <Table.Root size="sm" variant="outline" borderRadius={"lg"}>
        <Table.Header backgroundColor={"#262A41"}>
          <Table.Row>
            <Table.ColumnHeader>Product</Table.ColumnHeader>
            <Table.ColumnHeader>Qty</Table.ColumnHeader>
            <Table.ColumnHeader>Exported To</Table.ColumnHeader>
            <Table.ColumnHeader>Status</Table.ColumnHeader>
            <Table.ColumnHeader>Details</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {isLoading ? (
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
          ) : (
            visibleData.map((item) => (
              <Table.Row key={item.id} color={"black"}>
                <Table.Cell>{item.product}</Table.Cell>
                <Table.Cell>{item.qty}</Table.Cell>
                <Table.Cell>{item.exportto}</Table.Cell>
                <Table.Cell>{item.status}</Table.Cell>
                <Table.Cell>
                  <TableDetailButton
                    itemid={item.id}
                    exporttime={item.exportedtime}
                    importtime={item.confirmedtime}
                    origin={item.origin}
                    target={item.target}
                    rate={item.exchangeRate}
                    ratetime={item.exchangeRateTimeStamp}
                  />
                </Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table.Root>

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

export default ExportTable;
