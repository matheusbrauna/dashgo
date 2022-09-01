import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react'
import type { NextPage } from 'next'
import { Input } from '../../components/Form/input'
import { Header } from '../../components/Header'
import { Sidebar } from '../../components/Sidebar'

const CreateUsers: NextPage = () => {
  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Heading size="lg" fontWeight="normal">
            Criar usuário
          </Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">
            <SimpleGrid minChildWidth={248} spacing="8" w="full">
              <Input type="text" name="name" label="Nome completo" />
              <Input type="email" name="email" label="E-mail" />
            </SimpleGrid>

            <SimpleGrid minChildWidth={248} spacing="8" w="full">
              <Input type="password" name="password" label="Senha" />
              <Input
                type="password"
                name="confirm_password"
                label="Confirmar senha"
              />
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Button colorScheme="whiteAlpha">Cancelar</Button>
              <Button>Salvar</Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}

export default CreateUsers
