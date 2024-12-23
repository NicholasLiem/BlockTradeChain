import { Link, Stack, Text } from "@chakra-ui/react"
import { DataListItem, DataListRoot } from "@/components/ui/data-list"
import {
  HoverCardArrow,
  HoverCardContent,
  HoverCardRoot,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

const TableDetailButton = ({itemid, exporttime, importtime}) => {
  return (
    <HoverCardRoot size="sm">
      <HoverCardTrigger asChild>
        <Link href="#" color='black'>See Details</Link>
      </HoverCardTrigger>
      <HoverCardContent>
        <HoverCardArrow />
        <Stack gap="4" direction="row">
          <Stack gap="3">
            <Stack gap="1">
              <Text textStyle="sm" fontWeight="semibold">
                Detail Transaction {itemid}
              </Text>
              <DataListRoot orientation="horizontal" mt={'2%'} color={'black'}>
                <DataListItem color='white' key={'exporttime'} label={'Export Time'} value={exporttime} />
                <DataListItem color='white' key={'importtime'} label={'Import Time'} value={importtime} />
              </DataListRoot>
            </Stack>
          </Stack>
        </Stack>
      </HoverCardContent>
    </HoverCardRoot>
  )
}

export default TableDetailButton;
