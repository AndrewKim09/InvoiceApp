import React, { useEffect, useState } from "react";
import { NavBar } from "./NavBar";
import { InvoiceBar } from "./InvoiceBar";
import { Invoices } from "./Invoices";
import { AddingInvoice } from "./AddingInvoice";
import { invoiceType } from "../Classes/InvoiceType";
import { ClickedInvoiceExpand } from "./ClickedInvoiceExpand";
import data from "../../assets/data.json";
import api from "../../api";
function App() {
  const [addState, setAddState] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [clickedInvoice, setClickedInvoice] = useState<invoiceType | null>(
    null
  );
  const [fetchedData, setFetchedData] = useState(data);
  const [editState, setEditState] = useState(false);
  const [addStateHeight, setAddStateHeight] = useState("h-[1655.5px]");

  const toggleNightMode = () => {
    document.documentElement.classList.toggle("dark");
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    setAddStateHeight(addStateHeight);
  }, [addStateHeight]);

  const getInvoices = async () => {
    api.get("api/invoices/").then((res) => {
      console.log(res.data);
    })
    .catch((error) => {
      console.log(error);
    });

    setFetchedData(data);
  }

  useEffect(() => {
    getInvoices();
  }, []);

  return (
    <div className="flex flex-col xl:flex-row min-h-[100vh] h-auto App ">
      <NavBar toggleNightMode={toggleNightMode} darkMode={darkMode} />
      <div
        className={`w-[100%] h-[100%] grow xl:grow-0 xl:px-0 xl:w-[100%] xl:pt-[4.0625rem] xl:pb-[3.375rem] relative ${
          addState || editState ? "h-[1936.5px] md:h-[1706.5px]" : 'max-h-[100%]'
        }`}
      >
        <div
          className="xl:w-[50.7vw] w-[100%] h-[100%] flex flex-col md:mx-auto"
        >
          {addState && <AddingInvoice setAddState={setAddState} />}
          {addState && <div className="absolute top-0 bottom-0 left-0 right-0 z-10 hidden bg-black opacity-20 md:block"></div>}
          {clickedInvoice ? (
            <ClickedInvoiceExpand
              editState={editState}
              setEditState={setEditState}
              invoice={clickedInvoice}
              setClickedInvoice={setClickedInvoice}
            />
          ) : (
            <>
              <InvoiceBar
                setAddState={setAddState}
                numberOfInvoices={fetchedData.length}
              />
              <div className="flex flex-col h-[100%] w-[100%] px-[1.5rem]">
                <Invoices
                  setAddState={setAddState}
                  setClickedInvoice={setClickedInvoice}
                  fetchedData={fetchedData}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
