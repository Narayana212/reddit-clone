import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { SubredditSubscriptionValidator } from "@/lib/validators/subreddit";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: NextRequest) {
    try {
        const session = await getAuthSession()
        if (!session?.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }
        const body = await request.json()

        const { subredditId } = SubredditSubscriptionValidator.parse(body)
        const subcriptionExists = await prisma.subscription.findFirst({
            where: {
                subredditId,
                userId: session.user.id
            }
        })
        if (subcriptionExists) {
            return NextResponse.json({ message: "You already subscribed to this subreddit" }, { status: 400 })
        }
        await prisma.subscription.create({
            data: {
                subredditId,
                userId: session.user.id
            }
        })


        return NextResponse.json({ message: subredditId }, { status: 200 })




    } catch (error) {

        if (error instanceof z.ZodError) {
            return NextResponse.json({ message: "Invalid request data passed" }, { status: 422 })
        }
        return NextResponse.json({ message: "Could not subcribed, please try again later" }, { status: 500 })

    }
}