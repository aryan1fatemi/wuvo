import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
//import { pusherServer } from "@/app/libs/pusher";

// Function to handle POST requests
export async function POST(request: Request) {
    try {
      const currentUser = await getCurrentUser();
      const body = await request.json();
      const { userId, isGroup, members, name } = body;
  
      // Check if the current user exists and has an id and email
      if (!currentUser?.id || !currentUser?.email) {
        return new NextResponse("User Not Found", { status: 401 });
      }
  
      // Check if it's a group and whether the group has at least 2 members
      // Also checks if a group name is provided
      if (isGroup && (!members || members.length < 2 || !name)) {
        return new NextResponse("Group must have at least 2 members", { status: 400 });
      }
  
      // Check if it's a group and create a new group conversation
      if (isGroup) {
        const newConversation = await prisma.conversation.create({
          data: {
            name,
            isGroup,
            users: {
              connect: [
                ...members.map((member: { value: string }) => ({  
                  id: member.value 
                })),
                {
                  id: currentUser.id
                }
              ]
            }
          },
          include: {
            users: true,
          }
        });
  
        /* Update all connections with the new conversation
        newConversation.users.forEach((user) => {
          if (user.email) {
            pusherServer.trigger(user.email, 'conversation:new', newConversation);
          }
        });*/
  
        return NextResponse.json(newConversation);
      }
  
      // Check for existing conversations between the current user and the specified user
      const existingConversations = await prisma.conversation.findMany({
        where: {
          OR: [
            {
              userIds: {
                equals: [currentUser.id, userId]
              }
            },
            {
              userIds: {
                equals: [userId, currentUser.id]
              }
            }
          ]
        }
      });
  
      // Return the existing single conversation if found
      const singleConversation = existingConversations[0];
  
      if (singleConversation) {
        return NextResponse.json(singleConversation);
      }
  
      // Create a new one-on-one conversation if no existing conversation is found
      const newConversation = await prisma.conversation.create({
        data: {
          users: {
            connect: [
              {
                id: currentUser.id
              },
              {
                id: userId
              }
            ]
          }
        },
        include: {
          users: true
        }
      });
  
      /* Update all connections with the new conversation
      newConversation.users.map((user) => {
        if (user.email) {
          pusherServer.trigger(user.email, 'conversation:new', newConversation);
        }
      });*/
  
      return NextResponse.json(newConversation);
  
    } catch (error: any) {
      return new NextResponse('Internal Error', { status: 500 });
    }
  }
  