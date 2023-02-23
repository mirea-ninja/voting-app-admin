import Link from 'next/link'
import useUser from '@/lib/useUser'
import { useAppwrite } from '@/context/AppwriteContext'
import { useEffect, useState } from 'react'
import { Models, Teams } from 'appwrite'
import Avatar from '@/components/profile/Avatar'

export default function PersonalInformationCard() {
  const { user } = useUser()
  const { client } = useAppwrite()
  const [teams, setTeams] = useState<Models.Team[]>([])

  useEffect(() => {
    async function getTeams() {
      console.log(client)
      const teams = (await new Teams(client!).list()).teams
      setTeams(teams)
    }
    getTeams().then(() => {})
  }, [client])

  return (
    <div className='card w-96 group ring-1 ring-secondary'>
      <div className='card-body items-center text-center'>
        <Avatar iconSize='w-16 h-16' fontSize='text-xl font-bold' />
        <div className='card-title'>{user?.userData?.name}</div>
        <div className='text-slate-500'>
          <div>
            <span>Почта: </span>
            {user?.userData?.email ? (
              <Link href={`mailto:${user?.userData?.email}`} className='link'>
                {user?.userData?.email}
              </Link>
            ) : (
              'Отсутствует'
            )}
          </div>
          <div>
            <span>Телефон: </span>
            {user?.userData?.phone ? (
              <Link href={`tel:${user?.userData?.phone}`} className='link'>
                {user?.userData?.phone}
              </Link>
            ) : (
              'Отсутствует'
            )}
          </div>
          <div className='pt-3'>
            {teams.length > 0 ? (
              <div className='flex justify-center'>
                {teams.map((team, index) => (
                  <div key={index} className='badge badge-primary m-1 hover:scale-110'>
                    {team.name}
                  </div>
                ))}
              </div>
            ) : (
              <div>Не состоит в командах</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
