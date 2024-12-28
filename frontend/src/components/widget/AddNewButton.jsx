import React, { useState } from 'react';
import { Flex, Input, Stack } from "@chakra-ui/react";
import { createListCollection } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Spinner } from "@chakra-ui/react"
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
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select"
import { Toaster, toaster } from "@/components/ui/toaster"
import { getExchangeRate } from "../../contracts/contracts";

const AddNewButton = ({ onNewExport }) => {
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [value, setValue] = useState('');
  const [recipient, setRecipient] = useState('');
  const [currency, setCurrency] = useState('');
  const [target, setTarget] = useState('');
  const [rate, setRate] = useState(0);
  const [loading, setLoading] = useState(false);

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
  });

  const handleExportClick = async () => {
    setLoading(true)

    if (!product || !quantity || !value || !recipient || !currency || !target) {
      console.log('SALAH')
      toaster.create({
        title: `Failed to export. All fields is required`,
        type: 'error',
      })
      setLoading(false);
      return;
    }
    try {
      await onNewExport(product, parseInt(quantity, 10), parseFloat(value), recipient, currency, target);
      setProduct('');
      setQuantity('');
      setValue('');
      setRecipient('');
      setCurrency('');
      setTarget('');
      toaster.create({
        title: `Item has been exported to recipient`,
        type: 'success',
      })
    } finally {
      setLoading(false);
    }
  };

  const handleCurrencyChange = async (selectedCurrency) => {
    setCurrency(selectedCurrency);
    if (target) {
      await updateConversionRate(selectedCurrency, target);
    }
  };

  const handleTargetChange = async (selectedTarget) => {
    setTarget(selectedTarget);
    if (currency) {
      await updateConversionRate(currency, selectedTarget);
    }
  };

  const updateConversionRate = async (fromCurrency, toCurrency) => {
    try {
      const fetchedRate = await getExchangeRate(fromCurrency, toCurrency);
      const scalingFactor = 1e6;
      const normalizedRate = Number(fetchedRate.rate) / scalingFactor;
      setRate(isNaN(normalizedRate) ? 0 : normalizedRate);
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
      setRate(0);
    }
  };

  return (
    <PopoverRoot id='popover'>
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
                <Input placeholder="Conversion Rate" value={rate} disabled />
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
              {loading ? <Spinner size="sm" /> : 'Export New'}
            </Button>
            <Toaster />
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