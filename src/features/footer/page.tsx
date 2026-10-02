import React from 'react'

export default function Footer() {
  return (
    <section className='border-t-[#1a1a18] border border-l-0 border-r-0 '>
      <section className='mx-auto max-w-7xl py-15 px-6'>
        <div className='flex flex-wrap items-center justify-between gap-4'>
          <p className='text-[14px] font-mono text-[#444]'>
            © {new Date().getFullYear()} Rong Sokheng. All rights reserved.
          </p>

          <div className='flex items-center gap-2'>
            <span className='w-1.5 h-1.5 rounded-full bg-green-700' />
            <span className='text-[14px] font-mono text-[#555]'>Available for work</span>
          </div>
        </div>
      </section>
    </section>
  )
}