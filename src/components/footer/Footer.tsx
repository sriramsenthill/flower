import { Box, Flex, Text } from "@chakra-ui/react";


const Footer = () => {
    return (
        <Box as="footer" bg="gray.800" color="white" py={6}>
            <Flex direction="column" align="center" justify="center" gap={4}>
                <Text fontSize="sm" fontWeight="semibold">
                    © 2024 Developed by Azeem.
                </Text>
            </Flex>
        </Box>
    );
};

export default Footer;
