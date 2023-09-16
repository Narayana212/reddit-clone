import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { PostValidator } from "@/lib/validators/post";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";



export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { title, content, subredditId } = PostValidator.parse(body)
        const session = await getAuthSession()
        if (!session?.user) {
            return NextResponse.json({ message: "Unauthorized" }, {
                status: 401
            })
        }
        const subscription = await prisma.subscription.findFirst({
            where: {
                subredditId,
                userId: session.user.id,
            },
        })

        if (!subscription) {
            return NextResponse.json("Subscribe to post", { status: 403 })



        }
        await prisma.post.create({
            data: {
                title,
                content,
                authorId: session.user.id,
                subredditId,
            },
        })

        return NextResponse.json("ok", { status: 200 })






    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(error.message, { status: 400 })
        }

        return NextResponse.json(
            'Could not post to subreddit at this time. Please try later',
            { status: 500 }
        )

    }

}