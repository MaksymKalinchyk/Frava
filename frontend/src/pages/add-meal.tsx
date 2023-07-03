import Image from "next/image";
import { Inter } from "next/font/google";
import Layout from "@/components/layout";
import React, { useEffect } from "react";
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
  Input,
  Card,
  CardHeader,
  CardBody,
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
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Icon,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { use, useState } from "react";
import { findFoodInfo, createMeal } from "@/services/mealService";
import {
  AddMealResponse,
  MealItems,
  MealResponse,
  Nutriment,
  User,
} from "@/types";

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
  { title: "Add Meal Item", description: "Add Meal Item" },
  { title: "Meal Items", description: "Meal Items" },
  { title: "Complete Meal", description: "Complete Meal" },
];

export default function AddMeal() {
  const [barcode, setBarcode] = useState("");
  const [initialFoodInfo, setInitialFoodInfo] = useState<MealResponse>({});
  const [food, setFood] = useState(initialFoodInfo);

  const [mealItems, setMealItems] = useState<MealItems[]>([]);
  const [calculatedMealItems, setCalculatedMealItems] = useState([
    ...mealItems,
  ]);
  const [totalNutrients, setTotalNutrients] = useState<Nutriment>({
    carbohydrates_serving: 0,
    "energy-kcal_serving": 0,
    fat_serving: 0,
    proteins_serving: 0,
    sugars_serving: 0,
  });

  const [isError, setIsError] = useState(false);

  const [mealName, setMealName] = useState("");
  const [mealDescription, setMealDescription] = useState("");
  const [mealType, setMealType] = useState("");

  const [numOfServings, setNumOfServings] = useState(1);
  const { activeStep, setActiveStep } = useSteps({
    index: 1,
    count: steps.length,
  });

  useEffect(() => {
    setCalculatedMealItems([...mealItems]);
  }, [mealItems]);

  useEffect(() => {
    setTotalNutrients(getTotalNutrients());
  }, [calculatedMealItems]);

  useEffect(() => {
    updateChart(1);
  }, [initialFoodInfo]);

  function nextForm() {
    if (!isError) setActiveStep(activeStep + 1);
  }

  function previousForm() {
    if (!isError) setActiveStep(activeStep - 1);
    if (activeStep == 3) {
      setNumOfServings(1);
      updateChart(1);
    }
  }

  async function findFood(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data: MealResponse = await findFoodInfo(barcode);
    setInitialFoodInfo(data);
    nextForm();
  }

  function getTotalNutrients(): Nutriment {
    const res = calculatedMealItems.reduce(
      (totalNutrients: Nutriment, mealItem) => {
        const {
          carbohydrates_serving,
          fat_serving,
          proteins_serving,
          sugars_serving,
        } = mealItem.nutriment;

        if (
          carbohydrates_serving !== undefined ||
          mealItem.nutriment["energy-kcal_serving"] !== undefined ||
          totalNutrients["energy-kcal_serving"] !== undefined
        ) {
          totalNutrients.carbohydrates_serving += carbohydrates_serving ?? 0;
          totalNutrients["energy-kcal_serving"]! +=
            mealItem.nutriment["energy-kcal_serving"] ?? 0;
          totalNutrients.fat_serving += fat_serving ?? 0;
          totalNutrients.proteins_serving += proteins_serving ?? 0;
          totalNutrients.sugars_serving += sugars_serving ?? 0;
        }

        return totalNutrients;
      },
      {
        carbohydrates_serving: 0,
        "energy-kcal_serving": 0,
        fat_serving: 0,
        proteins_serving: 0,
        sugars_serving: 0,
      }
    );

    return res;
  }

  async function addMeal(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const user = JSON.parse(localStorage.getItem("User")!);
    const test = mealItems.map((mealItem) => {return {
      calories: mealItem.nutriment["energy-kcal_serving"] ?? 0,
      mealItemName: mealItem.product_name,
      carbohydrates: mealItem.nutriment.carbohydrates_serving,
      proteins: mealItem.nutriment.proteins_serving,
      sugars: mealItem.nutriment.sugars_serving,
      fats: mealItem.nutriment.fat_serving,
      servings: mealItem.servings,
    }});
    const meal: AddMealResponse = {
      Meal: {
        userId: user.userId,
        mealType: "Breakfast",
        mealName,
        mealDescription,
        sugars: totalNutrients.sugars_serving ?? 0,
        calories: totalNutrients["energy-kcal_serving"] ?? 0,
        proteins: totalNutrients.proteins_serving ?? 0,
        fats: totalNutrients.fat_serving ?? 0,
        carbohydrates: totalNutrients.carbohydrates_serving ?? 0,
      },
      MealItems: test
    };
    await createMeal(meal);
  }

  function addMealItem() {
    const existingIndex = mealItems.findIndex(
      (mealItem) => mealItem.product_name === initialFoodInfo.product_name
    );

    if (existingIndex !== -1) {
      setMealItems((prevMealItems) => {
        const updatedMealItems = [...prevMealItems];
        const newServings =
          updatedMealItems[existingIndex].servings + numOfServings;

        updatedMealItems[existingIndex].nutriment = calculateNutrientsPerServings(
          mealItems[existingIndex].nutriment,
          newServings,
          updatedMealItems[existingIndex].servings
        );
        updatedMealItems[existingIndex].servings = newServings;
        console.log(updatedMealItems);

        return updatedMealItems;
      });
    } else if (initialFoodInfo.nutriments && initialFoodInfo.product_name) {
      const newMealItem = {
        servings: numOfServings,
        product_name: initialFoodInfo.product_name,
        nutriment: calculateNutrientsPerServings(
          initialFoodInfo.nutriments,
          numOfServings
        ),
      };
      setMealItems([...mealItems, newMealItem]);
    } else {
      return;
    }
    nextForm();
  }

  function updateChart(newNumber: number) {
    if(initialFoodInfo === undefined) return;
    const nutriments = initialFoodInfo.nutriments;
    if (newNumber > 0 && nutriments && nutriments["energy-kcal_serving"]) {
      const updatedFoodInfo = {
        nutriments: calculateNutrientsPerServings(nutriments, newNumber),
      };
      setFood(updatedFoodInfo);
    }
  }

  function handleChange(number: string) {
    const newServingNumber = parseInt(number);
    setNumOfServings(newServingNumber);
    setIsError(newServingNumber === 0);
    updateChart(newServingNumber);
  }

  function deleteMealItem(mealItemToRemove: MealItems) {
    setMealItems(mealItems.filter((mealItem) => mealItemToRemove !== mealItem));
    setCalculatedMealItems(
      mealItems.filter((mealItem) => mealItemToRemove !== mealItem)
    );
  }

  function handleNumOfServings(number: string, index: number) {
    const newServingAmount = parseInt(number);
    const updatedMealItems = [...mealItems];
    updatedMealItems[index].nutriment = calculateNutrientsPerServings(
      updatedMealItems[index].nutriment,
      newServingAmount,
      updatedMealItems[index].servings
    );
    updatedMealItems[index].servings = newServingAmount;

    setMealItems(updatedMealItems);
  }

  function calculateNutrientsPerServings(
    nutriments: Nutriment,
    servings: number,
    prevServings: number = 1
  ): Nutriment {
    const energyKcalServing = nutriments["energy-kcal_serving"];
    let res = {
      "energy-kcal_serving": (energyKcalServing! / prevServings) * servings,
      fat_serving: (nutriments.fat_serving / prevServings) * servings,
      carbohydrates_serving:
        (nutriments.carbohydrates_serving / prevServings) * servings,
      proteins_serving: (nutriments.proteins_serving / prevServings) * servings,
      sugars_serving: (nutriments.sugars_serving / prevServings) * servings,
    };
    return res;
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
        {activeStep === 2 && initialFoodInfo != null && (
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
                    <FormControl>
                      <NumberInput
                        mt={2}
                        min={1}
                        onChange={(number: string) => handleChange(number)}
                        defaultValue={numOfServings}
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>
                  </form>
                </Box>
                <Box>
                  <Heading size="md" textTransform="uppercase">
                    Energy Value:
                  </Heading>
                  <Text size="xs">
                    {food?.nutriments?.["energy-kcal_serving"]?.toFixed(1)}
                  </Text>
                  <Chart
                    chartType="PieChart"
                    width="100%"
                    height="400px"
                    data={data}
                    options={options}
                  />
                  <Grid templateColumns="repeat(4, 1fr)" gap={6}>
                    <GridItem w="100%" h="5" bg="green.500" />
                    <GridItem w="100%" h="5" bg="blue.500" />
                    <GridItem w="100%" h="5" bg="red.500" />
                    <GridItem w="100%" h="5" bg="orange.500" />

                    <GridItem w="100%" h="10">
                      Protein: {food?.nutriments?.proteins_serving?.toFixed(1)}g
                    </GridItem>
                    <GridItem w="100%" h="5">
                      Carbs:{" "}
                      {food?.nutriments?.carbohydrates_serving?.toFixed(1)}g
                    </GridItem>
                    <GridItem w="100%" h="5">
                      Fats: {food?.nutriments?.fat_serving?.toFixed(1)}g
                    </GridItem>
                    <GridItem w="100%" h="5">
                      Sugars: {food?.nutriments?.sugars_serving?.toFixed(1)}g
                    </GridItem>
                  </Grid>
                </Box>
              </Stack>
            </CardBody>
          </Card>
        )}
        {activeStep === 3 && (
          <Card mt={"5vh"}>
            <CardHeader>
              <Heading size="md">Meal Items:</Heading>
            </CardHeader>

            <CardBody>
              <div className="grid grid-cols-4 gap-4 justify-items-stretch">
                {calculatedMealItems.map((mealItem, index) => (
                  <React.Fragment key={index + "fragment"}>
                    <h1 key={index}>{mealItem.product_name}</h1>
                    <h1 key={index + "h1"}>
                      {mealItem?.nutriment["energy-kcal_serving"]?.toFixed(1)} kcal
                    </h1>
                    <div key={index + "div"} className="justify-self-center">
                      <NumberInput
                        size="sm"
                        maxW={24}
                        defaultValue={mealItem.servings}
                        min={1}
                        onChange={(number: string) =>
                          handleNumOfServings(number, index)
                        }
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </div>
                    <Button
                      key={index + "btn"}
                      onClick={() => deleteMealItem(mealItem)}
                      width={"3rem"}
                      bg={"red.500"}
                      color={"white"}
                      className="justify-self-end"
                      _hover={{ bg: "red.600" }}
                    >
                      <Icon as={DeleteIcon} />
                    </Button>
                  </React.Fragment>
                ))}
              </div>
            </CardBody>
          </Card>
        )}
        <form onSubmit={addMeal}>
          {activeStep === 4 && (
            <Card mt={"5vh"}>
              <CardHeader>
                <Heading size="md">Meal Information:</Heading>
              </CardHeader>
              <CardBody>
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
                        onChange={(event) =>
                          setMealDescription(event.target.value)
                        }
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
                  <div className="grid grid-cols-1 mt-4 divide-y justify-items-stretch">
                    <Heading className="mb-2" as="h5" size="md">
                      Nutrition:
                    </Heading>
                    <Heading as="h5" size="sm">
                      Carbohydrates:
                    </Heading>
                    <h1>{totalNutrients.carbohydrates_serving.toFixed(1)}g</h1>
                    <Heading as="h5" size="sm">
                      Proteins:
                    </Heading>
                    <h1>{totalNutrients.proteins_serving.toFixed(1)}g</h1>
                    <Heading as="h5" size="sm">
                      Sugars:
                    </Heading>
                    <h1>{totalNutrients.sugars_serving.toFixed(1)}g</h1>
                    <Heading as="h5" size="sm">
                      Fats:
                    </Heading>
                    <h1>{totalNutrients.fat_serving.toFixed(1)}g</h1>
                    <Heading as="h5" size="sm">
                      Total Calories:
                    </Heading>
                    <h1>
                      {totalNutrients["energy-kcal_serving"]?.toFixed(1)} kcal
                    </h1>
                  </div>
                </FormControl>
              </CardBody>
            </Card>
          )}
          <div className="flex justify-between">
            {activeStep > 1 ? (
              <Button onClick={previousForm} mt={3}>
                Previous
              </Button>
            ) : null}

            {activeStep === 2 && (
              <Button onClick={addMealItem} mt={3}>
                Add Meal Item
              </Button>
            )}

            {activeStep === 3 && (
              <Button onClick={nextForm} mt={3}>
                Next
              </Button>
            )}
            {activeStep === 4 && (
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
