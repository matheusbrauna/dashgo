/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Button, Flex, Stack } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { Input } from '../components/Form/input'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

const SignInFormSchema = z.object({
  email: z.string().email({ message: 'E-mail obrigatório' }),
  password: z.string().min(1, 'Senha obrigatória'),
})

type SignInProps = z.infer<typeof SignInFormSchema>

const SignIn: NextPage = () => {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm<SignInProps>({
    resolver: zodResolver(SignInFormSchema),
  })

  async function handleSignIn(data: SignInProps) {
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log(data)
  }

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        as="form"
        w="100%"
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">
          <Input
            type="email"
            label="E-mail"
            error={errors.email!}
            {...register('email')}
          />
          <Input
            type="password"
            label="Senha"
            error={errors.password!}
            {...register('password')}
          />
        </Stack>
        <Button type="submit" mt="6" size="lg" isLoading={isSubmitting}>
          Entrar
        </Button>
      </Flex>
    </Flex>
  )
}

export default SignIn
