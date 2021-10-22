import { Flex, Text, Box, Avatar } from "@chakra-ui/react";

interface MessageProps {
  text: string;
  createdAt: string;
  avatar: string;
}

export function Message({ text, createdAt, avatar }: MessageProps) {
  return (
    <Flex w={100}>
      <Avatar w={40} h={40} alt={avatar} src={avatar} />
      <Box >
        <Text>{text}</Text>
        <Text>{createdAt}</Text>
      </Box>
    </Flex>
  )
}