import Image from "next/image";
import { Inter } from "next/font/google";
import Layout from "@/components/layout";
import { useState, useEffect } from "react";
import { getAllMeals } from "@/services/mealService";
import MealCard from "@/components/mealCard";
import { CommentAmount, LikesPerMeal, Meal } from "@/types";
import { Container } from "@chakra-ui/react";
import { getTotalLikesForAllMeals } from "@/services/likeService";
import { getCommentAmountPerMeal } from "@/services/commentService";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [likes, setLikes] = useState<LikesPerMeal[]>([]);
  const [commentAmount, setCommentAmount] = useState<CommentAmount[]>([]);
  useEffect(() => {
    init();
  }, []);
  async function init() {
    const data = getAllMeals();
    const likeData = await getTotalLikesForAllMeals();
    const totalComments = await getCommentAmountPerMeal();
    const sortedDataDesc: Meal[] = [...await data].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    setMeals(sortedDataDesc);
    setLikes(likeData);   
    setCommentAmount(totalComments);
  }

  return (
    <Layout>
      <Container mt={"5vh"}>
        {meals.map((meal: Meal, index: number) => (
          <MealCard key={index} meal={meal} likes={likes[index]} commentAmount={commentAmount[index].comments} />
        ))}
      </Container>
    </Layout>
  );
}
