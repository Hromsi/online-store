'use client';

import { 
    Card as ChaCard, 
    CardBody, 
    Stack, 
    Heading, 
    Divider, 
    CardFooter, 
    ButtonGroup, 
    Button, 
    Image, 
    Text,
    Flex,
} from "@chakra-ui/react";
import { IProduct } from "../../types";

export default function Card({
    stock,
    description,
    thumbnail,
    title,
    price,
}: IProduct) {

    return (
        <ChaCard>
            <CardBody display="flex" flexDirection="column" >
                <Image
                    src={thumbnail}
                    borderRadius='lg'
                />
                <Stack display="flex" mt='6' spacing='3' justifyContent="space-between" height="100%" >
                    <Heading size='md'>{title}</Heading>
                    <Flex flexDirection="column" height="100%" justifyContent="space-between" gap={3}>
                        <Text fontSize="sm">{description}</Text>
                        <Flex gap={3} justifyContent="space-between" alignItems="center">
                            <Text color='blue.600' fontSize='2xl'>
                                $ {price}
                            </Text>
                            <Text fontSize='1xl' fontWeight="500">
                                quantity {stock}
                            </Text>
                        </Flex>
                    </Flex>
                </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
                <ButtonGroup spacing='2'>
                <Button variant='solid' colorScheme='blue'>
                    Buy now
                </Button>
                <Button variant='ghost' colorScheme='blue'>
                    Add
                </Button>
                </ButtonGroup>
            </CardFooter>
        </ChaCard>
    );
}