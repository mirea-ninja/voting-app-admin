import AdminPanelHead from '@/components/Head'
import { LayoutProps } from '@/components/LayoutWithDrawer'
import Navbar from '@/components/Navbar'
import React from 'react'

export default function LayoutWithoutDrawer(props: LayoutProps) {
  return (
    <>
      <AdminPanelHead />
      <Navbar />
      <div className='mx-auto px-4 sm:px-6 lg:px-8 pt-16 max-w-7xl'>{props.children}</div>
    </>
  )
}
