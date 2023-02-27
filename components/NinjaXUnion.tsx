import Image from 'next/image'
import { XMarkIcon } from '@heroicons/react/20/solid'
import React from 'react'
import Link from 'next/link'
import { mireaNinjaURL, studentUnionURL } from '@/constants/constants'
import MNLogo from '@/components/logos/MNLogo'

interface NinjaXUnionProps {
  withLinks?: boolean
}

const studentUnionImage = (
  <Image
    src='/assets/student-union-logo.png'
    alt='Логотип студенческого союза РТУ МИРЭА'
    width={55}
    height={55}
    className='w-30 h-30 pr-2'
    priority
  />
)

export default function NinjaXUnion(props: NinjaXUnionProps) {
  return (
    <div className='inline-block flex items-center'>
      {props.withLinks ? (
        <Link target='_blank' href={mireaNinjaURL}>
          <MNLogo className='w-100 h-100' />
        </Link>
      ) : (
        <MNLogo className='w-30 h-30' />
      )}
      <XMarkIcon className='h-7 w-7 px-1 text-neutral dark:text-slate-400' />
      {props.withLinks ? (
        <Link target='_blank' href={studentUnionURL}>
          {studentUnionImage}
        </Link>
      ) : (
        studentUnionImage
      )}
    </div>
  )
}
