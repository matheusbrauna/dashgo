import { Box, Icon, Link, Stack, Text } from '@chakra-ui/react'
import {
  RiContactsLine,
  RiDashboardLine,
  RiGitMergeLine,
  RiInputMethodLine,
} from 'react-icons/ri'

export function Sidebar() {
  return (
    <Box as="aside" w="64" mr="8">
      <Stack spacing="12" align="flex-start">
        <Box>
          <Text
            fontWeight="bold"
            color="gray.400"
            fontSize="small"
            textTransform="uppercase"
          >
            Geral
          </Text>

          <Stack spacing="4" mt="8">
            <Link display="flex" alignItems="center" gap="4">
              <Icon as={RiDashboardLine} fontSize="20" />
              <Text fontWeight="medium">Dashboard</Text>
            </Link>

            <Link display="flex" alignItems="center" gap="4">
              <Icon as={RiContactsLine} fontSize="20" />
              <Text fontWeight="medium">Usuários</Text>
            </Link>
          </Stack>
        </Box>

        <Box>
          <Text
            fontWeight="bold"
            color="gray.400"
            fontSize="small"
            textTransform="uppercase"
          >
            Automação
          </Text>

          <Stack spacing="4" mt="8">
            <Link display="flex" alignItems="center" gap="4">
              <Icon as={RiInputMethodLine} fontSize="20" />
              <Text fontWeight="medium">Formulários</Text>
            </Link>

            <Link display="flex" alignItems="center" gap="4">
              <Icon as={RiGitMergeLine} fontSize="20" />
              <Text fontWeight="medium">Automação</Text>
            </Link>
          </Stack>
        </Box>
      </Stack>
    </Box>
  )
}
