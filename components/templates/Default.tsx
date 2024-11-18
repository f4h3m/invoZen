"use client";

import React, { useRef, useState, useEffect } from "react";
import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ImageUpload from "@/components/ImageUpload";
import { Exo_2 } from "next/font/google";

const exo2 = Exo_2({
  subsets: ["latin"],
  weight: ["400", "700"],
});

import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function Default() {
  const [date, setDate] = React.useState<Date | undefined>();
  const [dueDate, setDueDate] = React.useState<Date | undefined>();
  const [mounted, setMounted] = useState(false);

  const componentRef = useRef<HTMLDivElement>(null);
  const [InvoiceNumber, setInvoiceNumber] = useState("");
  const [fromName, setFromName] = useState("");
  const [toName, setToName] = useState("");
  const [fromEmail, setFromEmail] = useState("");
  const [fromAddress, setFromAddress] = useState("");
  const [toEmail, setToEmail] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [note, setNote] = useState("");

  const [vatRate, setVatRate] = useState(0);

  const [items, setItems] = useState([
    { description: "Web Design", quantity: 1, price: 1000 },
  ]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleOnAfterPrint = React.useCallback(() => {
    console.log("`onAfterPrint` called");
  }, []);

  const printFn = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "WithCopiedShadowRoot",
    onAfterPrint: handleOnAfterPrint,
    copyShadowRoots: true,
  });

  const handleOnClick = React.useCallback(() => {
    printFn();
  }, [printFn]);

  const handleAddItem = () => {
    setItems([...items, { description: "New item", quantity: 1, price: 100 }]);
  };

  const handleDeleteItem = (indexToDelete: number) => {
    if (items.length === 1) {
      return;
    }
    setItems(items.filter((_, index) => index !== indexToDelete));
  };

  const subtotal = items.reduce((acc, item) => {
    // @ts-expect-error ignone type error
    const quantity = parseFloat(item.quantity);
    // @ts-expect-error ignone type error
    const price = parseFloat(item.price);
    if (!isNaN(quantity) && !isNaN(price)) {
      return acc + quantity * price;
    }
    return acc;
  }, 0);

  const vat = (subtotal * (vatRate || 0)) / 100;
  const total = subtotal + vat;
  const isPrintEnabled = fromName && toName;

  if (!mounted) {
    return null;
  }

  return (
    <main className="relative">
      <div className="bg-black w-full h-24 absolute left-0 top-0"></div>
      <div className="container mx-auto pb-20 relative">
        <div className="flex">
          <div className="w-9/12 border rounded-lg">
            <div ref={componentRef} className={exo2.className}>
              <div className="bg-white rounded-lg overflow-hidden print-wrapper">
                <div className="p-8">
                  <div className="flex justify-between items-start">
                    <div className="w-1/2">
                      <h1 className="text-4xl font-bold text-gray-800">
                        Invoice
                      </h1>
                      <p className="text-md text-black mt-1">
                        <span className="font-semibold">Invoice Number:</span>{" "}
                        <input
                          type="text"
                          className="focus-visible:outline-none placeholder:text-black"
                          placeholder="INV-001"
                          value={InvoiceNumber}
                          onChange={(e) => setInvoiceNumber(e.target.value)}
                        />
                      </p>
                    </div>
                    <div className="w-1/2">
                      <ImageUpload />
                    </div>
                  </div>

                  <div className="mt-8 grid grid-cols-2 gap-8">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">
                        From:
                      </h2>
                      <input
                        className="focus-visible:outline-none text-xl w-full font-semibold"
                        type="text"
                        placeholder="Acme Inc."
                        value={fromName}
                        onChange={(e) => setFromName(e.target.value)}
                      />
                      <div className="flex items-center">
                        <input
                          className={cn(
                            "focus-visible:outline-none w-full",
                            !fromEmail && "print-hide"
                          )}
                          type="email"
                          placeholder="email@email.com"
                          value={fromEmail}
                          onChange={(e) => setFromEmail(e.target.value)}
                        />
                      </div>
                      <textarea
                        className={cn(
                          "focus-visible:outline-none w-full",
                          !fromAddress && "print-hide"
                        )}
                        placeholder="123 Business St, City, Country"
                        value={fromAddress}
                        onChange={(e) => setFromAddress(e.target.value)}
                      />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">
                        To:
                      </h2>
                      <input
                        className="focus-visible:outline-none text-xl w-full font-semibold"
                        type="text"
                        placeholder="Global Dynamics Corp"
                        value={toName}
                        onChange={(e) => setToName(e.target.value)}
                      />
                      <input
                        className={cn(
                          "focus-visible:outline-none w-full",
                          !toEmail && "print-hide"
                        )}
                        type="email"
                        placeholder="email@email.com"
                        value={toEmail}
                        onChange={(e) => setToEmail(e.target.value)}
                      />
                      <textarea
                        className={cn(
                          "focus-visible:outline-none w-full",
                          !toAddress && "print-hide"
                        )}
                        placeholder="Business St Park, City, Country"
                        value={toAddress}
                        onChange={(e) => setToAddress(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="border-b w-full pt-10"></div>

                  <div className="mt-8 flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="text-black font-semibold">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-[280px] justify-start text-left text-md p-0 border-0 shadow-none !text-black font-semibold hover:!bg-transparent",
                                !date && "print-hide"
                              )}
                            >
                              <CalendarIcon className="h-4 w-4 shadow-none" />
                              Date:{" "}
                              {date ? (
                                format(date, "dd MMM yyyy")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </span>
                    </div>

                    <div className="flex items-center justify-end">
                      <span className="text-black font-semibold">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-[280px] justify-end text-left text-md p-0 border-0 shadow-none !text-black font-semibold hover:!bg-transparent",
                                !dueDate && "print-hide"
                              )}
                            >
                              <CalendarIcon className="h-4 w-4" />
                              Due Date:{" "}
                              {dueDate ? (
                                format(dueDate, "dd MMM yyyy")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={dueDate}
                              onSelect={setDueDate}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </span>
                    </div>
                  </div>

                  <Table className="mt-8">
                    <TableHeader className="bg-black rounded-md">
                      <TableRow>
                        <TableHead className="text-left">Description</TableHead>
                        <TableHead className="text-right">Qty</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {items.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="text-left font-semibold">
                            <input
                              type="text"
                              className="w-full focus-visible:outline-none"
                              value={item.description}
                              onChange={(e) => {
                                const updatedItems = [...items];
                                updatedItems[index].description =
                                  e.target.value;
                                setItems(updatedItems);
                              }}
                            />
                          </TableCell>
                          <TableCell className="text-right">
                            <input
                              type="number"
                              className="w-20 text-right focus-visible:outline-none"
                              value={item.quantity}
                              onChange={(e) => {
                                const updatedItems = [...items];
                                updatedItems[index].quantity =
                                  e.target.valueAsNumber || 0;
                                setItems(updatedItems);
                              }}
                            />
                          </TableCell>
                          <TableCell className="text-right">
                            <input
                              type="number"
                              className="w-24 text-right focus-visible:outline-none"
                              value={item.price}
                              onChange={(e) => {
                                const updatedItems = [...items];
                                updatedItems[index].price =
                                  e.target.valueAsNumber || 0;
                                setItems(updatedItems);
                              }}
                            />
                          </TableCell>
                          <TableCell className="text-right pr-0 items-center flex justify-end">
                            <span className="mr-2">
                              {isNaN(item.quantity * item.price)
                                ? "$0.00"
                                : `$${(item.quantity * item.price).toFixed(2)}`}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50 print-hide"
                              onClick={() => handleDeleteItem(index)}
                              disabled={items.length === 1}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  <Button
                    className="mt-4 print:hidden"
                    onClick={handleAddItem}
                    variant="outline"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    <span className="font-semibold">Add Item</span>
                  </Button>

                  <div className="mt-8 flex justify-end">
                    <div className="w-64">
                      <div className="flex justify-between mb-2">
                        <span className="font-semibold text-black">
                          Subtotal:
                        </span>
                        <span className="text-gray-800">
                          ${subtotal.toFixed(2)}
                        </span>
                      </div>

                      <div className="flex justify-between mb-2">
                        <span className="font-semibold text-black">
                          Tax ({isNaN(vatRate) ? 0 : vatRate}%):
                        </span>
                        <span className="text-gray-800">{vat.toFixed(2)}</span>
                      </div>

                      <div className="flex justify-between border-t pt-2">
                        <span className="font-bold">Total:</span>
                        <span className="font-bold">${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div
                    className={cn(
                      "mt-8 text-black text-sm",
                      !note && "print-hide"
                    )}
                  >
                    <h4 className="font-semibold">Note:</h4>
                    <textarea
                      className="w-2/4 py-2 focus-visible:outline-none"
                      placeholder="Thank you for your business with us. Please make payment within 30
                      days."
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-1/4 ml-4 mt-36">
            <div className="flex flex-col w-full items-start mb-4">
              <Label htmlFor="vatRate" className="font-semibold mb-2 text-md">
                Add a tax (%)
              </Label>
              <Input
                type="number"
                value={vatRate}
                onChange={(e) => setVatRate(parseFloat(e.target.value))}
                className="font-semibold text-lg px-2 rounded-md border w-full bg-white"
              />
            </div>
            <Button
              onClick={handleOnClick}
              className="w-full uppercase font-semibold"
              disabled={!isPrintEnabled}
            >
              Print Now
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
