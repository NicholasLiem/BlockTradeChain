import { Link, Stack, Text } from "@chakra-ui/react"
import { DataListItem, DataListRoot } from "@/components/ui/data-list"
import {
  HoverCardArrow,
  HoverCardContent,
  HoverCardRoot,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

const TableDetailButton = ({ itemid, exporttime, importtime, origin, target, rate, ratetime }) => {
  return (
    <HoverCardRoot size="lg">
      <HoverCardTrigger asChild>
        <Link href="#" color="black">See Details</Link>
      </HoverCardTrigger>
      <HoverCardContent
        width="100%"
      >
        <HoverCardArrow />
        <Stack gap="4" direction="row">
          <Stack gap="3">
            <Stack gap="1">
              <Text textStyle="sm" fontWeight="semibold">
                Detail Transaction
              </Text>
              <DataListRoot orientation="horizontal" mt={'2%'} color={'black'}>
                <DataListItem color='white' key={'exporttime'} label={'Export Time'} value={exporttime} />
                <DataListItem color='white' key={'importtime'} label={'Import Time'} value={importtime ? importtime : 'Not Confirmed'} />
                {origin && <DataListItem color='white' key={'origin'} label={'Sent Currency'} value={origin} />}
                {target && <DataListItem color='white' key={'target'} label={'Recipient Currency'} value={target} />}
                {rate && <DataListItem color='white' key={'rate'} label={'Conversion Rate'} value={Number(rate / 1e6).toFixed(6)} />}
                {ratetime && <DataListItem color='white' key={'ratetime'} label={'Using Rate on'} value={ratetime} />}
              </DataListRoot>
            </Stack>
          </Stack>
        </Stack>
      </HoverCardContent>
    </HoverCardRoot>
  )
}

export default TableDetailButton;
