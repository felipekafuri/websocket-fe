import type { NextPage } from 'next'
import { Flex, Text, Button, Box } from '@chakra-ui/react'
import { io } from 'socket.io-client'
import { useEffect, useState } from 'react'
import { v4 } from 'uuid'
import { GiftedChat, IMessage, User } from 'react-web-gifted-chat'
import { Message } from '../components/Message'


const Home: NextPage = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false)
  const [user, setUser] = useState<User>({} as User)

  const socket = io(String(process.env.NEXT_PUBLIC_API_URL));

  async function connectToChat() {
    try {
      setIsConnected(true);
      const  user = {
        id: v4(),
        name: `tester-${v4().slice(0, 5)}`,
        avatar: 'https://placeimg.com/140/140/any'
      }
      setUser(user)
            

      socket.emit('connect_to_chat', {
          username: user.name,
      })
    } catch (error) {
      console.log(error)
      setIsConnected(true);
    }
  }

  async function disconnectFromChat() {
    try {
      socket.disconnect();
      setIsConnected(false);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const welcomeMessage: IMessage =
    {
      id: v4(),
      user:{
        name: 'System',
        id: v4(),
      },
      text: 'Welcome to the chat!',
      createdAt: new Date(),
    }
    setMessages([welcomeMessage, ...messages])
  }, [])

  function onSend(messageText: string) {
    const message: IMessage = {
        id: v4(),
        user:{
          name: user.name,
          id: v4(),
        },
        text: messageText,
        createdAt: new Date(),
      }

    setMessages([...messages, message])
  }



  return (
    <Flex w="full" h="100vh" justify="center">
      <Box w="700px" h="100vh" bg="gray.100" p="4">
        <Text as="h1" fontSize={40} >Chat Next.js</Text>

        {
          !isConnected ? <Button colorScheme="teal" variant="solid" onClick={() => connectToChat()}>
            Connect to Chat
          </Button> : <Button colorScheme="red" variant="solid" onClick={() => disconnectFromChat()}>
            Disconnect from Chat
          </Button>
        }


        {
          isConnected ?
            <Box w="full" h="100vh" bg="blue">

            </Box>
          : <Text>Connect to get access</Text>
        }




      </Box>
    </Flex>
  )
}


export default Home
