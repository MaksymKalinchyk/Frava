import Image from "next/image";
import { Inter } from "next/font/google";
import Layout from "@/components/layout";
import { useState, useEffect } from "react";
import { getAllMeals } from "@/services/mealService";
import { Container } from "@chakra-ui/react";

const inter = Inter({ subsets: ["latin"] });

export default function AddFriend() {
  return (
    <Layout>
      <Container mt={"5vh"}></Container>
    </Layout>
  );
}
