import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { SubredditValidator } from "@/lib/validators/subreddit";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod"

export async function POST(request: NextRequest) {

    try {
        const session = await getAuthSession()
        if (!session?.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }

        const body = await request.json()
        const { name } = SubredditValidator.parse(body)
        const subredditExists = await prisma.subreddit.findFirst({
            where: {
                name,
            },
        })
        if (subredditExists) {
            return NextResponse.json({ message: "Subreddit already exists" }, { status: 409 })
        }

        const subreddit = await prisma.subreddit.create({
            data: {
                name,
                creatorId: session.user.id
            }
        })

        await prisma.subscription.create({
            data: {
                userId: session.user.id,
                subredditId: subreddit.id,
            }
        })

        return NextResponse.json({ message: subreddit.name }, { status: 200 })



    } catch (error: any) {
        console.log(error.message)
        if (error instanceof z.ZodError) {
            return NextResponse.json({ message: error.message }, { status: 422 })
        }
        return NextResponse.json({ message: "Could not create subreddit" }, { status: 500 })

    }


}

