import React, { Dispatch, SetStateAction, useState } from "react";
import { invoiceType } from "../Classes/InvoiceType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCircle } from "@fortawesome/free-solid-svg-icons";
import { EditingInvoice } from "./EditingInvoice";
import { DeletePopUp } from "./DeletePopUp";

interface ClickedInvoiceExpandProps {
  invoice: invoiceType;
  setClickedInvoice: Dispatch<SetStateAction<invoiceType | null>>;
  editState: boolean;
  setEditState: Dispatch<SetStateAction<boolean>>;
}

export const ClickedInvoiceExpand = (invoice: ClickedInvoiceExpandProps) => {
  const [deleteState, setDeleteState] = useState(false);
  const getStatusClasses = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-50 text-green-500";
      case "pending":
        return "bg-yellow-50 text-yellow-500";
      case "draft":
        console.log("draft");
        return "bg-gray-100 text-[#373B53]";
      default:
        return "";
    }
  };

  const convertDate = (date: string) => {
    const dateArray = date.split("-");
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "August",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var dateString = `${dateArray[2]} ${dateArray[1]} ${dateArray[0]}`;
    return dateString;
  };
  const calculateTotal = (
    items: { name: string; quantity: number; price: number; total: number }[]
  ) => {
    let total = 0;
    items.forEach((item) => {
      total += item.quantity * item.price;
    });
    return total;
  };

  return (
    <div className="flex flex-col xl:p-0">
      {invoice.editState && (
        <div className="absolute top-0 bottom-0 left-0 right-0 z-10 hidden bg-black opacity-20 md:block"></div>
      )}
      {invoice.editState && (
        <EditingInvoice
          setEditState={invoice.setEditState}
          invoice={invoice.invoice}
        />
      )}
      {deleteState && <div className="fixed top-0 bottom-0 left-0 right-0 z-20 bg-black opacity-20"/>}
      {deleteState && <DeletePopUp idToDelete={invoice.invoice.id} setDeleteState={setDeleteState}/>}
      
      <div
        className={`flex flex-col px-[1.5rem] w-[100%] md:px-[2.5rem] ${
          invoice.editState ? "h-[2000.5px] md:h-[1850px]" : null
        }`}
      >
        <div className={`flex items-center mt-[1.5rem]`}>
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="text-lightPurple mr-[1.47875rem] cursor-pointer hover:opacity-80"
            onClick={() => {
              invoice.setClickedInvoice(null);
            }}
          />
          <span className="font-bold tracking-[-0.25px] text-[15px] text-black2 ">
            Go back
          </span>
        </div>

        <div className="flex justify-between items-center px-[1.5rem] h-[88px] rounded-md mt-[1.9375rem] bg-white">
          <span className="text-[13px] tracking-[-0.1px] text-[#858BB2]">
            Status
          </span>
          <div
            className={`${getStatusClasses(
              invoice.invoice.status
            )} font-bold h-[40px] w-[104px] flex items-center justify-center md:mr-auto ml-[1.25rem]`}
          >
            <FontAwesomeIcon icon={faCircle} className="mr-[6px] text-[8px]" />
            <span>{invoice.invoice.status}</span>
          </div>

          <div className="hidden md:flex gap-[0.5rem]">
            <button
              className="bg-[#F9FAFE] hover:opacity-80 h-[48px] text-greyBlue font-bold text-[15px] tracking-[-0.25px] px-[1.5rem] rounded-[4000px]"
              onClick={() => {
                invoice.setEditState(true);
              }}
            >
              Edit
            </button>
            <button className="bg-red hover:opacity-80 h-[48px] text-white font-bold text-[15px] tracking-[-0.25px] px-[1.5rem] text-center rounded-[4000px]" onClick={() => {setDeleteState(true)}}>
              Delete
            </button>
            <button className="bg-purple hover:opacity-80 h-[48px] text-center text-white font-bold text-[15px] tracking-[-0.25px] px-[1.5rem] rounded-[4000px]">
              Mark as Paid
            </button>
          </div>
        </div>

        <div className="flex flex-col px-[1.5rem] py-[1.5625rem] text-greyBlue text-[13px] tracking-[-0.1px] md:px-[2rem] md:py-[2.5rem] bg-white mt-[1rem] xl:py-[3.125rem]">
          <div className="flex flex-col justify-between md:flex-row">
            <div className="flex flex-col">
              <span className="font-bold text-black tracking-[-0.25px] text-[15px]">
                <span className="text-greyBlue">#</span>
                {invoice.invoice.id}
              </span>
              <span className="font-medium md:mt-[0.4375rem]">
                {invoice.invoice.description}
              </span>
            </div>

            <div className="flex flex-col mt-[1.875rem] md:mb-auto md:mt-0 md:text-end font-medium">
              <span>{invoice.invoice.senderAddress.street}</span>
              <span>{invoice.invoice.senderAddress.city}</span>
              <span>{invoice.invoice.senderAddress.postCode}</span>
              <span>{invoice.invoice.senderAddress.country}</span>
            </div>
          </div>

          <div className="w-[100%] flex flex-wrap justify-between mt-[1.3125rem] md:mb-[2.9375rem] md:pr-[6.25rem]">
            <div className="flex flex-col">
              <span className="font-medium">Invoice Date</span>
              <span className="font-bold text-[15px] tracking-[-0.25px] text-black2 mt-[0.8125rem] ">
                {convertDate(invoice.invoice.createdAt)}
              </span>

              <span className="font-medium mt-[1.9375rem]">Payment Due</span>
              <span className="font-bold text-[15px] tracking-[-0.25px] text-black2 mt-[0.8125rem] ">
                {convertDate(invoice.invoice.paymentDue)}
              </span>
            </div>

            <div className="flex flex-col pr-[3.375rem]">
              <span className="font-medium">Bill To</span>
              <span className="font-bold text-[15px] tracking-[-0.25px] text-black2 mt-[0.8125rem] ">
                {invoice.invoice.clientName}
              </span>
              <span className="font-medium mt-[1.9375rem]">
                {invoice.invoice.clientAddress.street}
              </span>
              <span>{invoice.invoice.clientAddress.city}</span>
              <span>{invoice.invoice.clientAddress.postCode}</span>
              <span>{invoice.invoice.clientAddress.country}</span>
            </div>

            <div className="flex flex-col w-[100%] mb-[2rem] md:w-auto">
              <span className="font-medium">Sent to</span>
              <span className="font-bold text-[15px] tracking-[-0.25px] text-black2 mt-[0.8125rem] ">
                {invoice.invoice.clientEmail}
              </span>
            </div>
          </div>

          <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr] w-[100%] justify-between px-[1.5rem] bg-[#F9FAFE] items-center gap-[1.5rem] py-[1.5625rem] rounded-t-md">
            <span className="text-greyBlue text-[15px] tracking-[-0.1px] font-medium">
              Item Name
            </span>
            <span className="text-greyBlue text-[15px] tracking-[-0.1px] font-medium text-end">
              QTY.
            </span>
            <span className="text-greyBlue text-[15px] tracking-[-0.1px] font-medium text-end">
              Price
            </span>
            <span className="text-greyBlue text-[15px] tracking-[-0.1px] font-medium text-end">
              Total
            </span>
          </div>

          {invoice.invoice.items.map((item, index) => {
            return (
              <div
                key={index}
                className="grid grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr] w-[100%] justify-between px-[1.5rem] bg-[#F9FAFE] items-center gap-[1.5rem] py-[1.5625rem] rounded-t-md"
              >
                <div className="flex flex-col">
                  <span className="text-black2 text-[15px] tracking-[-0.24px] font-bold">
                    {item.name}
                  </span>
                  <span className="text-[15px] tracking-[-0.25px] text-greyBlue md:hidden">
                    {item.quantity} x $ {item.price}
                  </span>
                </div>

                <span className="hidden text-greyBlue text-[15px] tracking-[-0.25px] md:inline-block text-end mr-3 font-bold">
                  {item.quantity}
                </span>
                <span className="hidden text-greyBlue text-[15px] tracking-[-0.25px] md:inline-block text-end font-bold">
                  $ {item.price}
                </span>

                <span className="font-bold tracking-[-0.25px] text-[15px] text-black2 text-end">
                  $ {item.quantity * item.price}
                </span>
              </div>
            );
          })}
          <div className="flex justify-between px-[1.5rem] bg-[#373B53] items-center py-[1.625rem] rounded-b-md">
            <span className="text-white text-[13px] tracking-[-0.1px]">
              Grand Total
            </span>
            <span className="text-[24px] tracking-[-0.5px] text-white font-bold">
              $ {calculateTotal(invoice.invoice.items)}
            </span>
          </div>
        </div>

        <div className="flex w-[100vw] px-[1.5rem] h-[91px] justify-end gap-[0.5rem] items-center mt-[3.5rem] mx-[-1.5rem] bg-white md:hidden md:px-0 ">
          <button
            className="bg-[#F9FAFE] text-greyBlue font-bold text-[15px] tracking-[-0.25px] px-[1.5rem] py-[1rem] rounded-[4000px]"
            onClick={() => {
              invoice.setEditState(true);
            }}
          >
            Edit
          </button>
          <button className="hidden md:inline-block bg-red text-white font-bold text-[15px] tracking-[-0.25px] px-[1.5rem] py-[1rem] rounded-[4000px]">
            Delete
          </button>
          <button className="bg-purple text-white font-bold text-[15px] tracking-[-0.25px] px-[1.5rem] py-[1rem] rounded-[4000px]">
            Mark as Paid
          </button>
        </div>
      </div>
    </div>
  );
};
