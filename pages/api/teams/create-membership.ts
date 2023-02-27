import type { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from '@/lib/session'
import { Client, Teams } from 'node-appwrite'
import { appwriteEndpoint, appwriteProjectId } from '@/constants/constants'
import * as process from "process";

export default withIronSessionApiRoute(createMembership, sessionOptions)

async function createMembership(req: NextApiRequest, res: NextApiResponse) {
  const { teamID, email, roles, url } = await req.body

  try {
    const client = new Client()
      .setEndpoint(appwriteEndpoint)
      .setProject(appwriteProjectId)
      .setKey(process.env.API_TEAMS_ACCESS_TOKEN!)
    await new Teams(client).createMembership(teamID, email, roles || [], url)
    res.status(200).json({ message: 'ok' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: (error as Error).message })
  }
}