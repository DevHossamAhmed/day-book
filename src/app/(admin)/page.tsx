import React from 'react'
import PageTitle from "@/components/ui/PageTitle";

const page = () => {
  return (
    <div className='bg-[#fcfcfc] dark dark:bg-[#1b1b1b] min-h-screen p-6'>
      <PageTitle 
        title="Welcome"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" }
        ]}
      />
    </div>
  )
}

export default page
