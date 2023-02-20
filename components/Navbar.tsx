import { appName } from '@/constants/constants'
import Link from 'next/link'
import { ArrowLeftOnRectangleIcon, Bars3Icon, ChevronDownIcon } from '@heroicons/react/24/outline'
import React, { FormEvent } from 'react'
import Section from '@/components/Section'
import { hamburgerMenuId } from '@/components/LayoutWithDrawer'
import NinjaXUnion from '@/components/NinjaXUnion'
import { useRouter } from 'next/router'
import fetchJson from '@/lib/fetchJson'
import useUser from '@/lib/useUser'
import { useAppwrite } from '@/context/AppwriteContext'

interface NavbarProps {
  sections?: Section[]
}

export default function Navbar(props: NavbarProps) {
  const router = useRouter()
  const { user, mutateUser } = useUser()
  const { account } = useAppwrite()

  async function logout(event: FormEvent) {
    event.preventDefault()
    await account?.deleteSession('current')
    await mutateUser(await fetchJson('/api/logout', { method: 'POST' }), false)
    await router.push('/login')
  }

  return (
    <div className='fixed w-full navbar bg-base-200 border-b border-base-300'>
      <div className='navbar-start'>
        {props.sections && (
          <div className='flex-none lg:hidden'>
            <label htmlFor={hamburgerMenuId} className='btn btn-square btn-ghost'>
              <Bars3Icon className='h-6 w-6' />
            </label>
          </div>
        )}
        <div className='flex-1 px-2 mx-2'>
          <Link href='/'>
            <div className='flex items-center text-xl'>
              <NinjaXUnion />
              {/*<div className='visible md:invisible md:w-0 md:h-0'>{shortAppName}</div>*/}
              <div className='invisible w-0 h-0 md:visible md:w-fit md:h-fit'>{appName}</div>
            </div>
          </Link>
        </div>
      </div>
      <div className='navbar-center'>
        <div className='flex-none hidden lg:block'>
          <ul className='menu menu-horizontal rounded-box'>
            {props.sections &&
              props.sections.map((section, index) => (
                <li key={index}>
                  <Link href={section.path}>{section.name}</Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div className='navbar-end'>
        <div className='dropdown dropdown-end dropdown-hover'>
          <label tabIndex={0} className='m-1 flex inline-block items-center font-medium'>
            {user?.userData?.name || 'Пользователь'}
            <ChevronDownIcon className='w-5 h-5 pt-0.5 stroke-2' />
          </label>
          <ul
            tabIndex={0}
            className='dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40'
          >
            <li>
              <button className='text-red-600' onClick={logout}>
                <ArrowLeftOnRectangleIcon className='w-6 h-6' />
                <span>Выйти</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
