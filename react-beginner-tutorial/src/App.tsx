import {
  Box,
  Button,
  ChakraProvider,
  Checkbox,
  Flex,
  Input,
  Text,
} from "@chakra-ui/react";
import "./App.css";

function App() {
  const testData = [
    // 支出と入金のデータを作成
    {
      id: 1,
      title: "お金を払う",
      isIncome: false,
      amount: 1000,
    },
    {
      id: 2,
      title: "お金をもらう",
      isIncome: true,
      amount: 1000,
    },
  ];

  let title: string = "";
  let amount: number = 0;
  let isIncome: boolean = false;

  return (
    <ChakraProvider>
      <div>
        <Text fontSize="2x1">家計簿アプリ</Text>
        <Box mb="8px">
          <Input
            placeholder="タイトルを入力"
            mb="4px"
            onChange={(e) => (title = e.target.value)}
          ></Input>
          <Input
            placeholder="支出を入力"
            mb="4px"
            onChange={(e) => (amount = e.target.value)}
          ></Input>
          <Flex align="center" justifyContent="space-between">
            <Checkbox w="100px">入金</Checkbox>
            <Button colorScheme="teal">追加</Button>
          </Flex>
        </Box>
        <div>
          {testData.map((data) => (
            <div key={data.id}>
              <Flex align="center" justifyContent="space-between">
                <Text>{data.title}</Text>
                <Text>
                  {data.isIncome ? "+" : "-"}
                  {data.amount}
                </Text>
              </Flex>
            </div>
          ))}
        </div>
      </div>
    </ChakraProvider>
  );
}

export default App;
