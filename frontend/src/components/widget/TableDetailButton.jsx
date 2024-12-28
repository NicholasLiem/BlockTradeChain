import { Link, Stack, Text } from "@chakra-ui/react"
import { DataListItem, DataListRoot } from "@/components/ui/data-list"
import {
  HoverCardArrow,
  HoverCardContent,
  HoverCardRoot,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

const TableDetailButton = ({ itemid, exporttime, importtime, origin, target, exchangeRate, exchangeRateTimestamp }) => {
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
                <DataListItem
                  color="white"
                  key="exchangeRate"
                  label="Exchange Rate"
                  value={(Number(exchangeRate) / 1e18).toFixed(12)}
                />
                <DataListItem color='white' key={'exchangeRateTimestamp'} label={'Exchange Rate TS'} value={exchangeRateTimestamp} />
              </DataListRoot>
            </Stack>
          </Stack>
        </Stack>
      </HoverCardContent>
    </HoverCardRoot>
  )
}

export default TableDetailButton;
