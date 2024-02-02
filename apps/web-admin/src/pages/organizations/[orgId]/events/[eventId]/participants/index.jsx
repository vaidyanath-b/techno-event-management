import { useRouter } from 'next/router';

import {
  Box,
  Flex,
  Table,
  TableCaption,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  TableContainer,
  Text,
} from '@chakra-ui/react';

import { useFetch } from '@/hooks/useFetch';

import DashboardLayout from '@/layouts/DashboardLayout';
import { useEffect, useState } from 'react';

export default function Events() {
  const router = useRouter();

  const { orgId, eventId } = router.query;

  const { loading, get } = useFetch();

  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const fetchParticipants = async () => {
      const { data, status } = await get(
        `/core/organizations/${orgId}/events/${eventId}/participants`,
      );
      setParticipants(data.participants || []);
      console.log(data);
    };
    fetchParticipants();
  }, [orgId, eventId]);

  return (
    <DashboardLayout>
      <Flex
        direction="column"
        height="100%"
        width="100%"
        alignItems="center"
        justifyContent="center"
        gap={8}
      >
        <Box width="100%" p={8}>
          <Text fontSize="4xl" fontWeight="bold">
            Participants
          </Text>
        </Box>
        <Box width="100%" height="100%">
          <TableContainer width="100%" height="100%">
            <Table variant="simple">
              <TableCaption>Participants</TableCaption>
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>First Name</Th>
                  <Th>Last Name</Th>
                </Tr>
              </Thead>
              <Tbody>
                {participants.map((participant) => (
                  <Tr
                    key={participant?.id}
                    onClick={() => {
                      router.push(
                        `/organizations/${orgId}/events/${eventId}/participants/${participant?.id}`,
                      );
                    }}
                    cursor="pointer"
                  >
                    <Td>{participant?.id}</Td>
                    <Td>{participant?.firstName}</Td>
                    <Td>{participant?.lastName}</Td>
                  </Tr>
                ))}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th>{participants.length} participants</Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </Box>
      </Flex>
    </DashboardLayout>
  );
}