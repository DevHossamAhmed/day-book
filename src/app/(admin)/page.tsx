import React from 'react'
import PageTitle from "@/components/ui/PageTitle";

const page = () => {
  return (
    <div className='bg-[#fcfcfc]'>
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
