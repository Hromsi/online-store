'use client';

import { ButtonProps, Flex } from "@chakra-ui/react";
import {
    Paginator as ChaPaginator,
    Page,
    Previous,
    Next,
    PageGroup,
    generatePages,
  } from 'chakra-paginator';

export default function Paginator({ 
    pagesQuantity, 
    handlePageChange,
} : { 
    pagesQuantity: number;
    handlePageChange: (newPage: number) => void;
}) {
    const baseStyles: ButtonProps = {
        w: 7,
        fontSize: "sm"
    };

    const normalStyles = {
        ...baseStyles,
        bg: 'white'
    };
    

    const activeStyles = {
        ...baseStyles,
        background: 'blue.300'
    };
    
    return (
        <Flex gap="30px">
            {/* @ts-ignore */}
            <ChaPaginator
                onPageChange={handlePageChange}
                pagesQuantity={pagesQuantity - 1}
                normalStyles={normalStyles}
                activeStyles={activeStyles}
                baseStyles={baseStyles}
            >
                <Previous bg="white">
                    prev
                </Previous>
                <PageGroup>
                    {/* @ts-ignore */}
                    {generatePages(pagesQuantity)?.map((page) => (
                    <Page
                        key={`paginator_page_${page}`}
                        page={page}
                    />
                    ))}
                </PageGroup>
                <Next >
                    next
                </Next>
            </ChaPaginator>
        </Flex>
    );
}