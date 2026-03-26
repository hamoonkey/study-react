import { Button, ChakraProvider } from '@chakra-ui/react'
import './App.css'
import { Title } from './Title'

function App() {
  return (
    <ChakraProvider>
      <div>
        <Title></Title>
        <Title></Title>
        <Title></Title>
        <Button colorScheme="blue">ボタン</Button>
      </div>
    </ChakraProvider>
  )
}

export default App
