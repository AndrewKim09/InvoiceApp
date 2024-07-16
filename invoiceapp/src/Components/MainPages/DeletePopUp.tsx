import React, {Dispatch, SetStateAction } from 'react'

interface DeletePopUpProps {
  setDeleteState: Dispatch<SetStateAction<boolean>>;
}

export const DeletePopUp = (props: DeletePopUpProps) => {
  return (
    <div className='fixed mx-auto inset-0 my-auto rounded-md z-30 w-[100%] max-w-[480px] max-h-[249px] py-[3.1875rem] px-[3rem] flex flex-col bg-white opacity-100'>
      <p className='font-bold text-[24px] tracking-[-0.5px] leading-[32px] text-black3'>Confirm Deletion</p>
      <p className='font-medium text-[13px] tracking-[-0.1px] leading-[22px] text-grey mt-[.75rem]'>Are you sure you want to delete invoice #XM9141? This action cannot be undone.</p>
      <div className='flex justify-end gap-[1.5rem] mt-[2.5rem]'>
      <button className='w-[134px] h-[44px] bg-[#f9f9f9] text-black3 font-bold text-[15px] tracking-[-0.25px] rounded-md' onClick={() => {props.setDeleteState(false)}}>Cancel</button>
        <button className='w-[134px] h-[44px] bg-[#ec5757] text-white font-bold text-[15px] tracking-[-0.25px] rounded-md'>Delete</button>
      </div>
    </div>
  )
}