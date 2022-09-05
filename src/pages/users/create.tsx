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
import Link from 'next/link'
import { Input } from '../../components/Form/input'
import { Header } from '../../components/Header'
import { Sidebar } from '../../components/Sidebar'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { api } from '../../services/api'
import { queryClient } from '../../services/queryClient'
import { useRouter } from 'next/router'

const CreateUsersFormSchema = z
  .object({
    name: z.string().min(1, 'Nome obrigatório'),
    email: z.string().email({ message: 'E-mail obrigatório' }),
    password: z.string().min(6, 'No mínimo 6 caracteres'),
    confirm_password: z.string().min(6, 'No mínimo 6 caracteres'),
  })
  .refine(async (data) => data.password === data.confirm_password, {
    message: 'Senhas não coincidem',
    path: ['confirm_password'],
  })

type CreateUsersProps = z.infer<typeof CreateUsersFormSchema>

const CreateUser: NextPage = () => {
  const router = useRouter()

  const createUser = useMutation(
    async (user: CreateUsersProps) => {
      const response = await api.post('users', {
        user: {
          ...user,
          created_at: new Date(),
        },
      })

      return response.data.user
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('users')
      },
    }
  )

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateUsersProps>({
    resolver: zodResolver(CreateUsersFormSchema),
  })

  async function handleCreateUser(data: CreateUsersProps) {
    await createUser.mutateAsync(data)

    reset()
    router.push('/users')
  }

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <Sidebar />

        <Box
          as="form"
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={['6', '8']}
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size="lg" fontWeight="normal">
            Criar usuário
          </Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">
            <SimpleGrid minChildWidth={248} spacing={['6', '8']} w="full">
              <Input
                type="text"
                label="Nome completo"
                error={errors.name}
                {...register('name')}
              />
              <Input
                type="email"
                label="E-mail"
                error={errors.email}
                {...register('email')}
              />
            </SimpleGrid>

            <SimpleGrid minChildWidth={248} spacing={['6', '8']} w="full">
              <Input
                type="password"
                label="Senha"
                error={errors.password}
                {...register('password')}
              />
              <Input
                type="password"
                label="Confirmar senha"
                error={errors.confirm_password}
                {...register('confirm_password')}
              />
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button as="a" colorScheme="whiteAlpha">
                  Cancelar
                </Button>
              </Link>
              <Button type="submit" isLoading={isSubmitting}>
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}

export default CreateUser
