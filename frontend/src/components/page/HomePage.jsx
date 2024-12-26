import React from "react";
import { Flex } from "@chakra-ui/react";
import PageHeading from "../widget/PageHeading";
import InformationCard from "../widget/InformationCard";
import { useAuth } from "../../context/AuthContext";
import Popup from "../ui/popup";

const HomePage = () => {
  const {
    isPopupOpen,
    setIsPopupOpen,
    handleSaveDerivedWallet,
    secret,
    setSecret,
  } = useAuth();

  return (
    <>
      <Flex mt={"2%"} gap={"1%"} justify={"space-between"} width={"100%"}>
        <InformationCard value="23.59" title="Clock" description="Current Time (GMT+7)" />
        <InformationCard value="1" title="Transactions" description="Total transactions" />
      </Flex>
      <Flex mt={"2%"} gap={"1%"} justify={"space-between"} width={"100%"}>
        <InformationCard value="1" title="Ready" description="Goods arrived to be imported" />
        <InformationCard value="30" title="Imported" description="Confirmed Imported Goods" />
      </Flex>
      <Flex mt={"2%"} gap={"1%"} justify={"space-between"} width={"100%"}>
        <InformationCard value="1" title="Departed" description="Goods exported" />
        <InformationCard value="30" title="Confirmed" description="Successful transaction" />
      </Flex>

      <Popup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSave={handleSaveDerivedWallet}
        secret={secret}
        setSecret={setSecret}
      />
    </>
  );
};

export default HomePage;