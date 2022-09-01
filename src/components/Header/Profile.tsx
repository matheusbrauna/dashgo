import { Avatar, Box, Flex, Text } from '@chakra-ui/react'

interface ProfileProps {
  showProfileData?: boolean
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Matheus Henrique</Text>
          <Text color="gray.300" fontSize="sm">
            matheusbrauna.contato@gmail.com
          </Text>
        </Box>
      )}

      <Avatar
        size={['sm', 'md']}
        name="Matheus Henrique"
        src="https://github.com/matheusbrauna.png"
      />
    </Flex>
  )
}
