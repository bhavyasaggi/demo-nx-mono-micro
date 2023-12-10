import {
  Avatar,
  Flex,
  Button,
  Card,
  CardFooter,
  CardBody,
  CardHeader,
  Heading,
  SimpleGrid,
  Table,
  Text,
  Tbody,
  Tr,
  Td,
  TableContainer,
} from '@chakra-ui/react';

import styles from './index.module.scss';

/* eslint-disable-next-line */
export interface DashboardProps {
  id: number;
  firstName: string;
  lastName: string;
  image: string;
  email: string;
  gender: string;
  onLogout?: () => void;
}

export function Dashboard({
  firstName,
  lastName,
  image,
  email,
  gender,
  onLogout,
}: DashboardProps) {
  const name = `${firstName} ${lastName}`;
  return (
    <Card className={`${styles['container']}`}>
      <CardHeader>
        <Heading>Welcome, {firstName}!</Heading>
      </CardHeader>
      <CardBody as={SimpleGrid} columns={2}>
        <TableContainer>
          <Table size="sm">
            <Tbody>
              <Tr>
                <Td>
                  <Text as="em">Name</Text>
                </Td>
                <Td>{name}</Td>
              </Tr>
              <Tr>
                <Td>
                  <Text as="em">Gender</Text>
                </Td>
                <Td>{gender}</Td>
              </Tr>
              <Tr>
                <Td>
                  <Text as="em">Email</Text>
                </Td>
                <Td>{email}</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
        <Flex alignItems="center" justifyContent="center">
          <Avatar
            name={name}
            src={image}
            bg="cyan"
            borderColor="teal"
            showBorder
            size="xl"
          />
        </Flex>
      </CardBody>
      <CardFooter>
        {onLogout ? (
          <Button colorScheme="red" w="100%" onClick={onLogout}>
            Logout
          </Button>
        ) : null}
      </CardFooter>
    </Card>
  );
}

export default Dashboard;
