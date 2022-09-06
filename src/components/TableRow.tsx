import {
  Box,
  Button,
  Checkbox,
  Icon,
  Link,
  Td,
  Text,
  Tr,
  useBreakpointValue,
} from '@chakra-ui/react'
import { RiPencilLine } from 'react-icons/ri'

type User = {
  id: string
  name: string
  email: string
  created_at: string
}

interface TableRow {
  userData: User
  onPrefetchUser: (userId: string) => Promise<void>
}

export function TableRow({ userData, onPrefetchUser }: TableRow) {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  return (
    <Tr>
      <Td px={['4', '4', '6']}>
        <Checkbox colorScheme="pink" />
      </Td>
      <Td>
        <Box>
          <Link
            color="purple.400"
            onMouseEnter={() => onPrefetchUser(userData.id)}
          >
            <Text fontWeight="bold" fontSize={['sm', 'md']}>
              {userData.name}
            </Text>
          </Link>
          <Text fontSize={['xs', 'sm']} color="gray.300">
            {userData.email}
          </Text>
        </Box>
      </Td>
      {isWideVersion && <Td>{userData.created_at}</Td>}
      {isWideVersion && (
        <Td>
          <Button
            as="a"
            size="sm"
            fontSize="sm"
            colorScheme="purple"
            leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
            cursor="pointer"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            Editar
          </Button>
        </Td>
      )}
    </Tr>
  )
}
