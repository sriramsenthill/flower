import { Flex } from "@chakra-ui/react";
import Link from "next/link";

export default function Logo() {
    return (
        <Flex align="center" gap={3} wrap="nowrap">
            <Link href="/" className="text-2xl text-custom-gray font-bold whitespace-nowrap">
                🌸 flower
            </Link>
        </Flex>
    );
}
