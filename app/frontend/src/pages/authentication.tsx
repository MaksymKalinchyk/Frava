import Layout from "../components/layout";
import { Button, Flex, Heading, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";
import { login } from "../services/authService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await login(email, password, router);
  };

  return (
    <Layout>
      <Flex height="100vh" alignItems="center" justifyContent="center">
        <Flex direction="column" background="gray.100" p={12} rounded={6}>
        <form onSubmit={handleSubmit}>
          <Heading mb={6}>Log In</Heading>
          <Input
            placeholder="test2@test.com"
            variant="filled"
            mb={3}
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <Input
            placeholder="**********"
            variant="filled"
            mb={6}
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button colorScheme="teal" type="submit">Log In</Button>
          </form>
        </Flex>
      </Flex>
    </Layout>
  );
}
