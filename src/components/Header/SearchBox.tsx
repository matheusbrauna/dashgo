import { Flex, Icon, Input } from '@chakra-ui/react'
import { RiSearchLine } from 'react-icons/ri'

export function SearchBox() {
  return (
    <Flex
      as="label"
      flex="1"
      py="4"
      px="8"
      ml="6"
      maxW={480}
      alignSelf="center"
      align="center"
      position="relative"
      bg="gray.800"
      borderRadius="full"
    >
      <Input
        color="gray.50"
        placeholder="Buscar na plataforma"
        px="4"
        mr="4"
        variant="unstyled"
        _placeholder={{
          color: 'gray.400',
        }}
      />
      <Icon as={RiSearchLine} fontSize="20" />
    </Flex>
  )
}
