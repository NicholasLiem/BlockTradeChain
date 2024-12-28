import React, { useState } from 'react';
import { Flex, Input, Stack } from "@chakra-ui/react";
import { createListCollection } from "@chakra-ui/react"
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import {
  PopoverArrow,
  PopoverBody,
  PopoverCloseTrigger,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select"

const AddNewButton = ({ onNewExport }) => {
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [value, setValue] = useState('');
  const [recipient, setRecipient] = useState('');
  const [currency, setCurrency] = useState('');
  const [target, setTarget] = useState('');
  const [rate, setRate] = useState(0);

  const currencies = createListCollection({
    items: [
      "USD", "AED", "AFN", "ALL", "AMD", "ANG", "AOA", "ARS", "AUD", "AWG", 
      "AZN", "BAM", "BBD", "BDT", "BGN", "BHD", "BIF", "BMD", "BND", "BOB", 
      "BRL", "BSD", "BTN", "BWP", "BYN", "BZD", "CAD", "CDF", "CHF", "CLP", 
      "CNY", "COP", "CRC", "CUP", "CVE", "CZK", "DJF", "DKK", "DOP", "DZD", 
      "EGP", "ERN", "ETB", "EUR", "FJD", "FKP", "FOK", "GBP", "GEL", "GGP", 
      "GHS", "GIP", "GMD", "GNF", "GTQ", "GYD", "HKD", "HNL", "HRK", "HTG", 
      "HUF", "IDR", "ILS", "IMP", "INR", "IQD", "IRR", "ISK", "JEP", "JMD", 
      "JOD", "JPY", "KES", "KGS", "KHR", "KID", "KMF", "KRW", "KWD", "KYD", 
      "KZT", "LAK", "LBP", "LKR", "LRD", "LSL", "LYD", "MAD", "MDL", "MGA", 
      "MKD", "MMK", "MNT", "MOP", "MRU", "MUR", "MVR", "MWK", "MXN", "MYR", 
      "MZN", "NAD", "NGN", "NIO", "NOK", "NPR", "NZD", "OMR", "PAB", "PEN", 
      "PGK", "PHP", "PKR", "PLN", "PYG", "QAR", "RON", "RSD", "RUB", "RWF", 
      "SAR", "SBD", "SCR", "SDG", "SEK", "SGD", "SHP", "SLE", "SLL", "SOS", 
      "SRD", "SSP", "STN", "SYP", "SZL", "THB", "TJS", "TMT", "TND", "TOP", 
      "TRY", "TTD", "TVD", "TWD", "TZS", "UAH", "UGX", "UYU", "UZS", "VES", 
      "VND", "VUV", "WST", "XAF", "XCD", "XDR", "XOF", "XPF", "YER", "ZAR", 
      "ZMW", "ZWL"
    ]
  })

  const conversion_rate = {
    "USD":1,
    "AED":3.6725,
    "AFN":70.2498,
    "ALL":94.1955,
    "AMD":398.0872,
    "ANG":1.7900,
    "AOA":920.7236,
    "ARS":1027.7500,
    "AUD":1.6025,
    "AWG":1.7900,
    "AZN":1.6998,
    "BAM":1.8808,
    "BBD":2.0000,
    "BDT":119.4868,
    "BGN":1.8808,
    "BHD":0.3760,
    "BIF":2950.6815,
    "BMD":1.0000,
    "BND":1.3588,
    "BOB":6.9171,
    "BRL":6.1883,
    "BSD":1.0000,
    "BTN":85.2653,
    "BWP":13.8686,
    "BYN":3.3631,
    "BZD":2.0000,
    "CAD":1.4365,
    "CDF":2844.5636,
    "CHF":0.8999,
    "CLP":991.7235,
    "CNY":7.2997,
    "COP":4414.2316,
    "CRC":507.0738,
    "CUP":24.0000,
    "CVE":106.0343,
    "CZK":24.1738,
    "DJF":177.7210,
    "DKK":7.1743,
    "DOP":60.8037,
    "DZD":135.1974,
    "EGP":50.9057,
    "ERN":15.0000,
    "ETB":126.5891,
    "EUR":0.9616,
    "FJD":2.3202,
    "FKP":0.7973,
    "FOK":7.1743,
    "GBP":0.7973,
    "GEL":2.8031,
    "GGP":0.7973,
    "GHS":14.9942,
    "GIP":0.7973,
    "GMD":72.4953,
    "GNF":8609.6171,
    "GTQ":7.6998,
    "GYD":209.1410,
    "HKD":7.7674,
    "HNL":25.4000,
    "HRK":7.2454,
    "HTG":130.7620,
    "HUF":394.9469,
    "IDR":16214.8577,
    "ILS":3.6517,
    "IMP":0.7973,
    "INR":85.2697,
    "IQD":1310.4005,
    "IRR":42036.0555,
    "ISK":139.6238,
    "JEP":0.7973,
    "JMD":155.8470,
    "JOD":0.7090,
    "JPY":157.1680,
    "KES":129.2044,
    "KGS":86.9714,
    "KHR":4007.8392,
    "KID":1.6031,
    "KMF":473.0918,
    "KRW":1457.9133,
    "KWD":0.3082,
    "KYD":0.8333,
    "KZT":515.8677,
    "LAK":21912.7842,
    "LBP":89500.0000,
    "LKR":294.6711,
    "LRD":181.7128,
    "LSL":18.6576,
    "LYD":4.9085,
    "MAD":10.0545,
    "MDL":18.3780,
    "MGA":4723.0958,
    "MKD":59.1647,
    "MMK":2097.6121,
    "MNT":3399.8396,
    "MOP":8.0006,
    "MRU":39.9963,
    "MUR":46.9324,
    "MVR":15.4536,
    "MWK":1738.8433,
    "MXN":20.1629,
    "MYR":4.4871,
    "MZN":63.8457,
    "NAD":18.6576,
    "NGN":1536.2232,
    "NIO":36.7896,
    "NOK":11.3512,
    "NPR":136.4245,
    "NZD":1.7715,
    "OMR":0.3845,
    "PAB":1.0000,
    "PEN":3.7263,
    "PGK":4.0321,
    "PHP":58.5891,
    "PKR":278.3862,
    "PLN":4.1002,
    "PYG":7752.0027,
    "QAR":3.6400,
    "RON":4.7833,
    "RSD":112.3934,
    "RUB":99.8194,
    "RWF":1380.4752,
    "SAR":3.7500,
    "SBD":8.4868,
    "SCR":13.9527,
    "SDG":511.7199,
    "SEK":11.0823,
    "SGD":1.3589,
    "SHP":0.7973,
    "SLE":22.8796,
    "SLL":22879.6496,
    "SOS":571.4377,
    "SRD":35.1847,
    "SSP":3898.7333,
    "STN":23.5600,
    "SYP":12940.1017,
    "SZL":18.6576,
    "THB":34.1650,
    "TJS":10.9148,
    "TMT":3.4987,
    "TND":3.1883,
    "TOP":2.4020,
    "TRY":35.2248,
    "TTD":6.7850,
    "TVD":1.6031,
    "TWD":32.6691,
    "TZS":2423.3743,
    "UAH":41.8857,
    "UGX":3663.9070,
    "UYU":44.1662,
    "UZS":12868.9161,
    "VES":51.6400,
    "VND":25424.7755,
    "VUV":119.8710,
    "WST":2.8110,
    "XAF":630.7891,
    "XCD":2.7000,
    "XDR":0.7668,
    "XOF":630.7891,
    "XPF":114.7534,
    "YER":249.5032,
    "ZAR":18.6581,
    "ZMW":27.7384,
    "ZWL":25.7692
   }

  const handleExportClick = () => {
    if (!product || !quantity || !value || !recipient || !currency || !target) {
      alert("All fields are required!");
      return;
    }
    onNewExport(product, parseInt(quantity, 10), parseFloat(value), recipient, currency, target);
    setProduct('');
    setQuantity('');
    setValue('');
    setRecipient('');
    setCurrency('');
    setTarget('');
  };

  const handleCurrencyChange = (selectedCurrency) => {
    setCurrency(selectedCurrency);
    if (target) {
      updateConversionRate(selectedCurrency, target);
    }
  };

  const handleTargetChange = (selectedTarget) => {
    setTarget(selectedTarget);
    if (currency) {
      updateConversionRate(currency, selectedTarget);
    }
  };

  const updateConversionRate = (fromCurrency, toCurrency) => {
    console.log(fromCurrency, toCurrency)
    const rate = conversion_rate[fromCurrency] / conversion_rate[toCurrency];
    setRate(rate);
  };

  return (
    <PopoverRoot>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          color="#262A41"
          _hover={{ color: "white", bg: "#262A41" }}
          _active={{ color: "white", bg: "#262A41" }}
        >
          Export New
        </Button>
      </PopoverTrigger>
      <PopoverContent borderRadius="5%" backgroundColor="white" color="black">
        <PopoverArrow />
        <PopoverBody>
          <Stack gap="4">
            <Field label="Product">
              <Input placeholder="Product name" value={product} onChange={(e) => setProduct(e.target.value)} />
            </Field>
            <Field label="Quantity">
              <Input placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
            </Field>
            
            <Flex>
              <Field label="Currency" width={'35%'}>
                <SelectRoot collection={currencies} size="sm" width="75%" onChange={(e) => handleCurrencyChange(e.target.value)}>
                  <SelectTrigger>
                    <SelectValueText placeholder="XXX"/>
                  </SelectTrigger>
                  <SelectContent zIndex={'2000'} height={'100px'}>
                    {currencies.items.map((currency) => (
                      <SelectItem item={currency} key={currency}>
                        {currency}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectRoot>
              </Field>
              <Field label="Value" width={'65%'}>
                <Input placeholder="Value" value={value} onChange={(e) => setValue(e.target.value)} />
              </Field>
            </Flex>
            <Flex>
              <Field label="Target" width={'35%'}>
                <SelectRoot collection={currencies} size="sm" width="75%" onChange={(e) => handleTargetChange(e.target.value)}>
                  <SelectTrigger>
                    <SelectValueText placeholder="XXX"/>
                  </SelectTrigger>
                  <SelectContent zIndex={'2000'} height={'100px'}>
                    {currencies.items.map((currency) => (
                      <SelectItem item={currency} key={currency}>
                        {currency}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectRoot>
              </Field>
              <Field label="Conversion Rate" width={'65%'}>
                <Input placeholder="Conversion Rate" value={rate} onChange={(e) => setValue(e.target.value)} disabled />
              </Field>
            </Flex>
            <Field label="Recipient">
              <Input placeholder="Recipient Address" value={recipient} onChange={(e) => setRecipient(e.target.value)} />
            </Field>
            <Button
              size="sm"
              bg="#262A41"
              color="white"
              _hover={{ bg: "#1a1d33" }}
              onClick={handleExportClick}
            >
              Export New
            </Button>
          </Stack>
        </PopoverBody>
        <PopoverCloseTrigger>
          <Button size="xs" variant="outline" mt="2">
            Close
          </Button>
        </PopoverCloseTrigger>
      </PopoverContent>
    </PopoverRoot>
  );
};

export default AddNewButton;