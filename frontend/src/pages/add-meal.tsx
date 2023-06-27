import Image from "next/image";
import { Inter } from "next/font/google";
import Layout from "@/components/layout";
import { useEffect } from "react";
import { Chart } from "react-google-charts";
import {
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  StackDivider,
  Text,
  InputGroup,
  InputRightAddon,
  Select,
  Grid,
  GridItem,
  Textarea,
} from "@chakra-ui/react";
import { use, useState } from "react";
import { findFoodInfo, createMeal } from "@/services/mealService";
import { log } from "console";
import { AddMealResponse, MealResponse, Nutriment, User } from "@/types";

const inter = Inter({ subsets: ["latin"] });

export const data = [
  ["Nutrients", "Grams"],
  ["Carbs", 11],
  ["Fats", 3],
  ["Sugars", 4],
  ["Protein", 6],
];

export const options = {
  pieHole: 0.3,
  is3D: false,
  legend: "none",
  pieSliceText: "label",
};

const steps = [
  { title: "Barcode", description: "Find Food" },
  { title: "Add Food", description: "Add Food" },
  { title: "Portion", description: "Portion size" },
];

export default function AddMeal() {
  const [barcode, setBarcode] = useState("");
  const [initialFoodInfo, setInitialFoodInfo] = useState<MealResponse>({});
  const [food, setFood] = useState(initialFoodInfo);
  const [isError, setIsError] = useState(false);
  const [mealName, setMealName] = useState("");
  const [mealDescription, setMealDescription] = useState("");
  const [mealType, setMealType] = useState("");
  let numOfServings = 0;

  const { activeStep, setActiveStep } = useSteps({
    index: 1,
    count: steps.length,
  });

  function nextForm() {
    if (!isError) setActiveStep(activeStep + 1);
  }

  function previousForm() {
    if (!isError) setActiveStep(activeStep - 1);
  }

  async function findFood(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data: MealResponse = await findFoodInfo(barcode);
    setInitialFoodInfo(data);
    nextForm();
  }

  async function addMeal(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const user: User = JSON.parse(localStorage.getItem("User")!);
    const meal: AddMealResponse = {
      userId: user.userId,
      mealType: "Breakfast",
      mealName,
      mealDescription,
      sugars: food.nutriments?.sugars_serving || 0,
      calories: food.nutriments?.["energy-kcal_serving"] || 0,
      proteins: food.nutriments?.proteins_serving || 0,
      fats: food.nutriments?.fat_serving || 0,
      carbohydrates: food.nutriments?.carbohydrates_serving || 0,
      servings: numOfServings,
    };
    await createMeal(meal);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    numOfServings = parseInt(value);

    setIsError(numOfServings === 0 || value === "");

    if (
      numOfServings > 0 &&
      initialFoodInfo.nutriments &&
      initialFoodInfo.nutriments["energy-kcal_serving"]
    ) {
      const updatedFoodInfo = {
        nutriments: {
          "energy-kcal_serving":
            initialFoodInfo.nutriments["energy-kcal_serving"] * numOfServings,
          fat_serving: initialFoodInfo.nutriments.fat_serving * numOfServings,
          carbohydrates_serving:
            initialFoodInfo.nutriments.carbohydrates_serving * numOfServings,
          proteins_serving:
            initialFoodInfo.nutriments.proteins_serving * numOfServings,
          sugars_serving:
            initialFoodInfo.nutriments.sugars_serving * numOfServings,
        },
      };
      setFood(updatedFoodInfo);
    }
  }
  return (
    <Layout>
      <Container mt={"5vh"}>
        <Stepper index={activeStep}>
          {steps.map((step, index) => (
            <Step key={index}>
              <StepIndicator>
                <StepStatus
                  complete={<StepIcon />}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>

              <Box flexShrink="0">
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </Box>

              <StepSeparator />
            </Step>
          ))}
        </Stepper>
        {activeStep === 1 && (
          <form onSubmit={findFood}>
            <FormControl isRequired>
              <FormLabel>Barcode</FormLabel>
              <Input
                placeholder="21312412471611"
                value={barcode}
                onChange={(event) => setBarcode(event.target.value)}
              />
            </FormControl>
            <Button type="submit" mt={3}>
              Find meal
            </Button>
          </form>
        )}
        {activeStep === 2 && (
          <Card mt={"5vh"}>
            <CardHeader>
              <Heading size="md">{initialFoodInfo.product_name}</Heading>
            </CardHeader>

            <CardBody>
              <Stack divider={<StackDivider />} spacing="4">
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    Serving Size
                  </Heading>
                  <InputGroup mt={2}>
                    <Input
                      type="text"
                      placeholder=""
                      defaultValue={initialFoodInfo.serving_size}
                    />
                    <InputRightAddon>
                      {initialFoodInfo.serving_unit}
                    </InputRightAddon>
                  </InputGroup>
                </Box>
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    Number of servings
                  </Heading>
                  <form>
                    <FormControl isInvalid={isError}>
                      <Input
                        mt={2}
                        type="number"
                        placeholder=""
                        onChange={(event) => {
                          handleChange(event);
                        }}
                      />
                      {isError && (
                        <FormErrorMessage>Email is required.</FormErrorMessage>
                      )}
                    </FormControl>
                  </form>
                </Box>
                <Box>
                  <Heading size="md" textTransform="uppercase">
                    Energy Value:
                  </Heading>
                  <Text size="xs">542 calories</Text>
                  <Chart
                    chartType="PieChart"
                    width="100%"
                    height="400px"
                    data={data}
                    options={options}
                  />
                  {food.nutriments != undefined && (
                    <Grid templateColumns="repeat(4, 1fr)" gap={6}>
                      <GridItem w="100%" h="5" bg="green.500" />
                      <GridItem w="100%" h="5" bg="blue.500" />
                      <GridItem w="100%" h="5" bg="red.500" />
                      <GridItem w="100%" h="5" bg="orange.500" />

                      <GridItem w="100%" h="10">
                        Protein: {food.nutriments.proteins_serving}
                      </GridItem>
                      <GridItem w="100%" h="5">
                        Carbs: {food.nutriments.carbohydrates_serving}
                      </GridItem>
                      <GridItem w="100%" h="5">
                        Fats: {food.nutriments.fat_serving}
                      </GridItem>
                      <GridItem w="100%" h="5">
                        Sugars: {food.nutriments.sugars_serving}
                      </GridItem>
                    </Grid>
                  )}
                </Box>
              </Stack>
            </CardBody>
          </Card>
        )}
        <form onSubmit={addMeal}>
          {activeStep === 3 && (
            <FormControl isRequired>
              <Box>
                <FormLabel>Meal Title</FormLabel>
                <Input
                  placeholder="Healthy meal"
                  type="text"
                  onChange={(event) => setMealName(event.target.value)}
                />
              </Box>
              <Box>
                <Box>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    placeholder="My first healthy meal!"
                    onChange={(event) => setMealDescription(event.target.value)}
                  />
                </Box>
                <FormLabel>Meal Type</FormLabel>
                <Select
                  mt={2}
                  onChange={(event) => setMealType(event.target.value)}
                >
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                </Select>
              </Box>
            </FormControl>
          )}
          <div className="flex justify-between">
            {activeStep === 2 || activeStep === 3 ? (
              <Button onClick={previousForm} mt={3}>
                Previous
              </Button>
            ) : null}

            {activeStep === 2 && (
              <Button onClick={nextForm} mt={3}>
                Next
              </Button>
            )}

            {activeStep === 3 && (
              <Button mt={3} colorScheme="messenger" type="submit">
                Add Meal
              </Button>
            )}
          </div>
        </form>
      </Container>
    </Layout>
  );
}
