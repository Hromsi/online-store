'use client';

import { 
    Button, 
    Image,
    Flex,
} from "@chakra-ui/react";
import Container from "./blocks/Container";
import { RiShoppingCartLine } from 'react-icons/ri';

export default function Header() {

    return (
        <Flex borderBottom="1px solid #e2e8f0">
            <Container display="flex" justifyContent="space-between" alignItems="center" p={3} >
                <Image
                    src="./logo.png"
                    height="55px"
                />
                <Button 
                    type="button"
                    rightIcon={<RiShoppingCartLine size={30} />} 
                    borderRadius="25px"
                    color="#2b6cb0"
                >
                    0
                </Button>
            </Container>
        </Flex>
    );
}