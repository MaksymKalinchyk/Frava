import Image from "next/image";
import { Inter } from "next/font/google";
import Layout from "@/components/layout";
import React, { useState, useEffect } from "react";
import { getAllMeals } from "@/services/mealService";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Text,
  VStack,
  Input,
  Divider,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Stack,
} from "@chakra-ui/react";
import { getFriendsList, respondFriendRequest, sendFriendRequest } from "@/services/friendService";
import { Friend, FriendRequest, User } from "@/types";

const inter = Inter({ subsets: ["latin"] });

const PAGE_SIZE = 5; // Number of items per page

export default function AddFriend() {
  const [username, setUsername] = useState("");
  const [filteredFriendsList, setFilteredFriendsList] = useState<Friend[]>([]);
  const [filteredRequestList, setFilteredRequestList] = useState<Friend[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    filterFriendsAndRequests();
  }, []);

  // async function loadFriendsList() {
  //   setFriendsList(await getFriendsList());
  // }

  async function filterFriendsAndRequests() {
    console.log("test");
    
    const user = JSON.parse(localStorage.getItem("User")!);
    const friendList: FriendRequest[] = await getFriendsList();

    friendList.forEach((friendItem) => {
      if (friendItem.sender.userName === user.userName || friendItem.status === "Accepted") {
        const friend: Friend = {
          friendRequestId: friendItem.id,
          status: friendItem.status,
          created_at: friendItem.created_at,
        };
        if(friendItem.sender.userName === user.userName) {
          friend.user = friendItem.receiver;
        } else friend.user = friendItem.sender;
        
        console.log(friend);

        filteredFriendsList.push(friend);
        setFilteredFriendsList([...filteredFriendsList]);
      } else if (friendItem.receiver.userName === user.userName && friendItem.status === "Pending") {
        const request: Friend = {
          friendRequestId: friendItem.id,
          user: friendItem.sender,
          status: friendItem.status,
          created_at: friendItem.created_at,
        };
        filteredRequestList.push(request);
        setFilteredRequestList([...filteredRequestList]);
      }
    });
  }

  async function handleAddFriend() {
    await sendFriendRequest(username);
  }

  async function respondToFriendRequest(request: Friend, status: string) {
     if(status == "Accepted") {
        setFilteredRequestList(filteredRequestList.filter((item) => item.friendRequestId !== request.friendRequestId));
        request.created_at = new Date();
        request.status = "Accepted";
        console.log(request);
        filteredFriendsList.push(request);
        setFilteredFriendsList([...filteredFriendsList]);
     } else {
      setFilteredRequestList(filteredRequestList.filter((item) => item.friendRequestId !== request.friendRequestId));
     }
     await respondFriendRequest(request.friendRequestId, status);
  }

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const pageCount = Math.ceil(filteredFriendsList.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const displayedFriends = filteredFriendsList.slice(startIndex, endIndex);

  return (
    <Layout>
      <Container mt={"5vh"} maxW="container.sm">
        <Box p={4} maxWidth="500px" margin="0 auto">
          <VStack spacing={4} align="stretch">
            <Heading size="md">Add Friends</Heading>
            <Box>
              <Text as="b" fontSize={"md"}>
                Username:
              </Text>
              <Box className="flex space-x-4">
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                />
                <Button onClick={handleAddFriend}>Add Friend</Button>
              </Box>
            </Box>
            <Box>
              <Text fontSize="xl" fontWeight="bold" mb={4}>
                Friend Requests
              </Text>
              <Divider />

              <Stack spacing={4} mt={4}>
                {filteredRequestList.map((request, index) => (
                  <Box
                    key={index}
                    p={4}
                    bg="gray.100"
                    className="flex justify-between"
                    borderRadius="md"
                  >
                    <Text mt={2} fontWeight="bold">
                      {request.user? request.user.userName : "N/A"}
                    </Text>
                    <Text mt={2}>
                      {request.created_at
                        ? new Date(request.created_at).toLocaleDateString(
                            "en-GB"
                          )
                        : "N/A"}
                    </Text>
                    <div className="space-x-4">
                      <Button colorScheme="green" onClick={() => respondToFriendRequest(request, "Accepted")}>Accept</Button>
                      <Button colorScheme="red" onClick={() => respondToFriendRequest(request, "Declined")}>Reject</Button>
                    </div>
                  </Box>
                ))}
              </Stack>
            </Box>
            <VStack spacing={4} align="stretch">
              <Text fontSize="xl" fontWeight="bold" mb={4}>
                Friend List
              </Text>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Username</Th>
                    <Th>Friends Since</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {filteredFriendsList.map((friend, index) => (
                    <React.Fragment key={index}>
                      <Tr>
                        <Td>{friend.user?.userName}</Td>
                        <Td>
                          {friend.created_at
                            ? new Date(friend.created_at).toLocaleDateString(
                                "en-GB"
                              )
                            : "N/A"}
                        </Td>
                      </Tr>
                    </React.Fragment>
                  ))}
                </Tbody>
              </Table>
              <Box display="flex" justifyContent="center" alignItems="center">
                {Array.from({ length: pageCount }).map((_, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    mx={1}
                    onClick={() => handlePageChange(index + 1)}
                    colorScheme={currentPage === index + 1 ? "blue" : "gray"}
                  >
                    {index + 1}
                  </Button>
                ))}
              </Box>
            </VStack>
          </VStack>
        </Box>
      </Container>
    </Layout>
  );
}
