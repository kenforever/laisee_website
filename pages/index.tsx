"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import { useAccount, useContractEvent, useTransaction } from "wagmi";
import {
  sendTransaction,
  waitForTransaction,
  readContract,
  writeContract,
} from "@wagmi/core";
import styles from "../styles/Home.module.css";
import abi from "./abi.json";
import { useState, useEffect, use } from "react";
import laiseebg from "./laiseebg.jpg";
import Laisee from "../components/ui/laisee";
import { decodeAbiParameters, formatUnits } from "viem";
import {motion} from 'framer-motion'

function Page() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [laiseeData, setlaiseeData] = useState<
    | [
        {
          tx_hash: string;
          laisee_amount: string;
          laisee_timestamp: string;
          laisee_count: string;
        }
      ]
    | []
  >([]);

  useEffect(() => {
    const data = localStorage.getItem("laiseeData");
    if (data) {
      const parsedData = JSON.parse(data);
      setlaiseeData(parsedData);
    }
  }, []);

  useEffect(() => {
    if (laiseeData.length > 0) {
      localStorage.setItem("laiseeData", JSON.stringify(laiseeData));
    }
  }, [laiseeData]);

  async function OpenLaiSee() {
    setLoading(true);
    try {
      let open = await writeContract({
        address: "0x1bB178e9d12247b80485bb2f10bF578f1fde2A25",
        functionName: "OpenLaiSee",
        abi: abi,
      });
      let tx_hash = open.hash;
      let result = await waitForTransaction({
        hash: tx_hash,
      });

      let decoded = decodeAbiParameters(
        [
          { name: "laisee_amount", type: "uint" },
          { name: "laisee_count", type: "uint" },
          { name: "laisee_timestamp", type: "uint" },
        ],
        result.logs[0].data
      );

      setlaiseeData([
        {
          tx_hash: tx_hash,
          laisee_amount: formatUnits(decoded[0], 18).toString(),
          laisee_count: decoded[1].toString(),
          laisee_timestamp: decoded[2].toString(),
        },
        //@ts-ignore
        ...laiseeData,
      ]);
      setOpen(true)
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const { isConnected } = useAccount();

  return (
    <>
      <div className="${styles.container} ">
        <Head>
          <title>利是逗來！</title>
          <link rel="icon" href="https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.0/72x72/1f9e7.png" />
          <meta property="og:url" content="https://laisee.kenforever.cc" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="利是逗來！" />
          <meta property="og:description" content="新年快樂攞利是！" />
          <meta property="og:image" content="https://i.imgur.com/a/YmdaFww.jpg" />


        </Head>

        <main className="flex flex-col items-center">
          <h1 className="text-3xl font-bold mt-10">你收到了一封利是！</h1>
          <div className="relative overflow-hidden flex flex-col items-center min-h-[560px] w-[340px] m-5 max-w-2xl rounded-md">
            {open && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-red-500 bg-opacity-90 min-h-[560px] w-[340px] z-50 absolute"
              >
              <h1 className="text-3xl font-bold mt-10 text-center text-yellow-300 pt-32">你收到了</h1>
                <h1 className="text-3xl font-bold mt-10 text-center text-yellow-300">{laiseeData[0]?.laisee_amount} 個 ETH！</h1>
                <h1 className="text-3xl font-bold mt-10 text-center text-yellow-300">新年快樂！</h1>
                <div className="flex flex-col items-center pt-100 bottom-8 left-28 absolute">
                  <button
                    className="bg-yellow-400 text-black h-28 w-28 rounded-full text-2xl "
                    onClick={() => setOpen(false)}
                  >再來一個
                  </button>
                </div>
              </motion.div>
            )}
            <div className="bg-red-700 w-full h-full z-0 absolute"></div>
            <div className="bg-[url('https://i.imgur.com/ufc4PpR.jpg')] w-[500px] h-[500px] z-10 absolute bottom-20 rounded-b-full bg-contain bg-center"></div>
            <div className="w-[500px] h-[500px] z-20 absolute bottom-20 rounded-b-full opacity-25 bg-red-400"></div>

            <div className="z-30 w-full h-100%">
              
              {/* <button className="bg-yellow-400 text-black h-28 w-28 rounded-full text-2xl absolute top-12 right-12" onClick={() => setOpen(true)}>open</button> */}


              {!isConnected && (
                <div className="flex flex-col items-center pt-100 bottom-16 left-[6.5rem] absolute">
                  <ConnectButton />
                </div>
              )}

              {loading && (
                <div className="flex flex-col items-center pt-100 bottom-8 left-28  absolute">
                  <button
                    className="bg-yellow-400 text-white h-28 w-28 rounded-full flex items-center justify-center"
                    disabled
                  >
                    <div className="h-12 w-12 rounded-full border-2 border-white border-b-transparent animate-spin"></div>
                  </button>
                </div>
              )}

              {isConnected && !loading && (
                <div>
                  <div className="flex flex-col items-center pt-100 bottom-8 left-28  absolute">
                    <button
                      className="bg-yellow-400 text-black h-28 w-28 rounded-full text-3xl "
                      onClick={() => OpenLaiSee()}
                    >
                      開
                    </button>
                  </div>
                  <div className="absolute bottom-1 right-1">
                    <ConnectButton chainStatus="none" accountStatus="avatar" />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div>
            <Laisee data={laiseeData} />
          </div>
        </main>

        <footer className={styles.footer}>
          <a
            href="https://rainbow.me"
            rel="noopener noreferrer"
            target="_blank"
          >
            Made with ❤️ by your frens at 🌈
          </a>
        </footer>
      </div>
    </>
  );
}

export default Page;
