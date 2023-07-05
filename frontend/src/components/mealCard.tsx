import {
  Box,
  Image,
  Badge,
  Text,
  Flex,
  Card,
  CardHeader,
  Avatar,
  Heading,
  IconButton,
  CardBody,
  CardFooter,
  Button,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Spacer,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Stack,
  Input,
  FormLabel,
} from "@chakra-ui/react";
import {
  StarIcon,
  ChatIcon,
  ExternalLinkIcon,
  WarningIcon,
} from "@chakra-ui/icons";
import yoghurtPic from "../images/yoghurt.jpg";
import { LikeBody, LikesPerMeal, Meal, Comment } from "@/types";
import React, { useEffect, useState } from "react";
import {
  getTotalLikesPerMeal,
  likeMeal,
  removeLike,
} from "@/services/likeService";
import { getCommentsForMeal, postComment } from "@/services/commentService";
import { randomUUID } from "crypto";

interface MealCardProps {
  meal: Meal;
  likes: LikesPerMeal;
  commentAmount: number;
}

const MealCard: React.FC<MealCardProps> = ({ meal, likes, commentAmount }) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  const [isExpanded, setIsExpanded] = useState(false);
  const [newLikes, setNewLikes] = useState(likes);
  const [newCommentAmount, setNewCommentAmount] =
    useState<number>(commentAmount);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");

  useEffect(() => {
    setNewLikes(likes);
    setNewCommentAmount(commentAmount);
  }, [likes]);

  useEffect(() => {
    if (!isExpanded || commentAmount === 0) return;
    if (comments.length === 0) loadComments();
  }, [isExpanded]);

  async function loadComments() {
    setComments(await getCommentsForMeal(meal.id));
  }

  async function handleLikeMeal() {
    let likeBody: LikeBody = {
      userId: meal.user.id,
      mealId: meal.id,
    };
    const res = await likeMeal(likeBody);
    setNewLikes({ likes: newLikes.likes + 1, likeId: res.id });
  }

  async function removeLikeMeal() {
    const likesAfterRemoval = newLikes.likes - 1;
    await removeLike(newLikes.likeId);
    setNewLikes({ likes: likesAfterRemoval, likeId: null });
  }

  async function showComments() {
    setIsExpanded(!isExpanded);
  }

  async function leaveComment(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setNewCommentAmount(newCommentAmount + 1);
    setComments([...comments, { comment: newComment, user: meal.user }]);
    const res = await postComment({ mealId: meal.id, comment: newComment });
    console.log(newComment);
    
    console.log(res);
    
  }

  return (
    <Card maxW="lg" mt={"5vh"}>
      <CardHeader>
        <Flex>
          <Flex flex="1" gap="4">
            <Avatar
              name={meal.user.firstName + meal.user.lastName}
              src="https://bit.ly/sage-adebayo"
            />

            <Box justifyContent={"space-between"}>
              <Heading size="sm">
                {meal.user.firstName} {meal.user.lastName}
              </Heading>

              <Text>{meal.mealName}</Text>
            </Box>
            <Spacer />
            <Box>
              <Text color={"gray.600"}>
                {new Date(meal.created_at).toLocaleString("en-GB", options)}
              </Text>
            </Box>
          </Flex>
        </Flex>
      </CardHeader>
      <CardBody>
        <Text fontSize="md" as="b">
          Description:
        </Text>
        <Text>{meal.mealDescription}</Text>
        <TableContainer mt={"2vh"}>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>Nutrition</Th>
                <Th>Value</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Carbohydrates:</Td>
                <Td>{meal.carbohydrates}g</Td>
              </Tr>
              <Tr>
                <Td>Proteins:</Td>
                <Td>{meal.proteins}g</Td>
              </Tr>
              <Tr>
                <Td>Sugars:</Td>
                <Td>{meal.sugars}g</Td>
              </Tr>
              <Tr>
                <Td>Fats:</Td>
                <Td>{meal.fats}g</Td>
              </Tr>
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>Total Calories:</Th>
                <Th>{meal.calories}</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </CardBody>
      <Image objectFit="cover" src={yoghurtPic.src} alt="Chakra UI" />

      <CardFooter
        justify="space-between"
        flexWrap="wrap"
        sx={{
          "& > button": {
            minW: "136px",
          },
        }}
      >
        {newLikes.likeId !== null ? (
          <Button
            flex="1"
            onClick={removeLikeMeal}
            variant="ghost"
            leftIcon={<StarIcon color={"yellow.300"} />}
          >
            Props Given ({newLikes.likes})
          </Button>
        ) : (
          <Button
            flex="1"
            onClick={handleLikeMeal}
            variant="ghost"
            leftIcon={<StarIcon />}
          >
            Give props ({newLikes.likes})
          </Button>
        )}
        <Button
          flex="1"
          variant="ghost"
          onClick={showComments}
          leftIcon={<ChatIcon />}
        >
          Comment ({newCommentAmount})
        </Button>
        <Button flex="1" variant="ghost" leftIcon={<ExternalLinkIcon />}>
          Share
        </Button>
      </CardFooter>
      {isExpanded && (
        <Stack className="p-3">
          <FormLabel>Leave a comment:</FormLabel>
            <form className="flex w-full" onSubmit={leaveComment}>
              <Input placeholder="Leave a comment" value={newComment} onChange={(event) => setNewComment(event.target.value)} />
              <Button type="submit" colorScheme="blue" className="">
                Save
              </Button>
            </form>
          {comments.map((comment, index) => (
            <Box key={index} p={4} borderWidth="1px" bg="white">
              <Stack direction="row" align="center">
                <Avatar size="sm" name={comment.user.userName} />
                <Box>
                  <Text fontWeight="bold">{comment.user.userName}</Text>
                  <Text fontSize="sm" color="gray.500">
                  {comment.created_at && new Date(comment.created_at).toLocaleString("en-GB", options)}
                  </Text>
                </Box>
              </Stack>
              <Text mt={2}>{comment.comment}</Text>
            </Box>
          ))}
        </Stack>
      )}
    </Card>
  );
};

export default MealCard;
