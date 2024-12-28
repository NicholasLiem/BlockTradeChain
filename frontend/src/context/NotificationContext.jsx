import React, { createContext, useContext, useState } from "react";
import { Box, Text, Flex } from "@chakra-ui/react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);

  const showNotification = ({ status, title, description }) => {
    setNotification({ status, title, description });
    setTimeout(() => setNotification(null), 3000); // Auto-hide after 3 seconds
  };

  return (
    <NotificationContext.Provider value={showNotification}>
      {children}
      {notification && (
        <Box
          position="fixed"
          bottom="5"
          right="5"
          zIndex="1000"
          bg={notification.status === "success" ? "green.500" : "red.500"}
          color="white"
          p={4}
          borderRadius="md"
          shadow="md"
        >
          <Flex justify="space-between" align="center">
            <Box>
              <Text fontWeight="bold">{notification.title}</Text>
              <Text>{notification.description}</Text>
            </Box>
            <Text
              as="button"
              ml={4}
              fontWeight="bold"
              cursor="pointer"
              onClick={() => setNotification(null)}
            >
              ✖
            </Text>
          </Flex>
        </Box>
      )}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);