"use client";
import Footer from "@/components/Footer/Footer";
import BottomCard from "@/components/AscendusPartnership/bottomCard";
import Form from "@/components/AscendusPartnership/Form";
import Header from "@/components/AscendusPartnership/Header";
import Progress from '@/components/AscendusPartnership/Progress'
import Success from '@/components/AscendusPartnership/Success'
import React from "react";

const page = () => {
  return (
    <div>
      <div className="relative">
        <Header/>
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 z-10 w-full max-w-5xl px-8 ">
          <BottomCard/>
        </div>
      </div>
      
      <div className="pt-20">
        <Form/>
      </div>
      
      <Success/>
      <Progress/>
      <Footer/>
    </div>
  )
}

export default page;