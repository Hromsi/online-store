import { Container as ChaContainer, ContainerProps } from "@chakra-ui/react";

export default function Container(props: ContainerProps) {
    return (
        <ChaContainer maxW="container.xl" {...props}></ChaContainer>
    );
}