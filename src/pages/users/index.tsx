import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Spinner,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from '@chakra-ui/react'
import type { NextPage } from 'next'
import NextLink from 'next/link'
import { useState } from 'react'
import { RiAddLine } from 'react-icons/ri'
import { Header } from '../../components/Header'
import { Pagination } from '../../components/Pagination'
import { Sidebar } from '../../components/Sidebar'
import { useUsers } from '../../services/hooks/useUsers'
import { queryClient } from '../../services/queryClient'
import { api } from '../../services/api'
import { TableRow } from '../../components/TableRow'

const UsersList: NextPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const { data, isLoading, isFetching, error } = useUsers(currentPage)

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  async function handlePrefetchUser(userId: string) {
    await queryClient.prefetchQuery(
      ['user', userId],
      async () => {
        const response = await api.get(`users/${userId}`)

        return response.data
      },
      {
        staleTime: 1000 * 60 * 1, // 10 min
      }
    )
  }

  return (
    <Box>
      <Header />

      <Flex
        w="100%"
        my="6"
        maxW={1480}
        mx="auto"
        px={['0', '6']}
        justifyContent="center"
      >
        <Sidebar />

        <Box
          flex="1"
          borderRadius={['0', '8']}
          bg="gray.800"
          p={['6', '8']}
          alignSelf="center"
        >
          <Flex mb="8" justify="space-between" align="center">
            <Heading size={['sm', 'lg']} fontWeight="normal">
              Usuários
              {!isLoading && isFetching && (
                <Spinner size="sm" color="gray.500" ml="4" />
              )}
            </Heading>

            <NextLink href="/users/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="pink"
                cursor="pointer"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Criar novo
              </Button>
            </NextLink>
          </Flex>

          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Falha ao obter os dados dos usuários</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={['4', '4', '6']} color="gray.300" w="8">
                      <Checkbox colorScheme="pink" />
                    </Th>
                    <Th>Usuário</Th>
                    {isWideVersion && <Th>Data de cadastro</Th>}
                    {isWideVersion && <Th w="8"></Th>}
                  </Tr>
                </Thead>

                <Tbody>
                  {data?.users.map((user) => (
                    <TableRow
                      userData={user}
                      key={user.id}
                      onPrefetchUser={handlePrefetchUser}
                    />
                  ))}
                </Tbody>
              </Table>

              <Pagination
                totalCountOfRegisters={data?.totalCount}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  )
}

export default UsersList
