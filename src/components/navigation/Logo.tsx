import { Flex } from "@chakra-ui/react";
import Link from "next/link";


export default function Logo() {
    return (
        <Flex align="center" gap={3}>
            <Link href="/" className="text-2xl text-custom-gray font-bold">
                🌸 flower
            </Link>
        </Flex>
    );
}
