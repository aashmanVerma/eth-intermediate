"use client"
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import lockABI from '../artifacts/contracts/Lock.sol/Lock.json'

const contractAddr = '0x5FbDB2315678afecb367f032d93F642f64180aa3'
const contractAbi = lockABI.abi

export default function Home() {

  const [userInfo, setUserInfo] = useState({
    name: null,
    email: null,
    amount: null
  })

  const [wallet, setWallet] = useState(null)
  const [account, setAccount] = useState(null)
  const [base, setBase] = useState(null)

  const [formStatus, setFormStatus] = useState({
    valid: false,
    message: 'Please fill the form to continue.'
  })

  const requestWallet = async () => {
    if (wallet) {
      const account = await wallet.request({ method: 'eth_requestAccounts' });
      console.log(account)
      if (account) {
        setAccount(account)
        await connectContract()
      }
    } else {
      alert("Please install metamask to continue")
    }
  }

  const connectContract = async () => {
    const provider = new ethers.providers.Web3Provider(wallet)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractAddr, contractAbi, signer);

    console.log(contract)

    setBase(contract)
  }

  const processDonation = async () => {
    console.log('Processing donation...')
    console.log(base, formStatus.valid)
    if (base && formStatus.valid) {
      const tx = await base.donate(parseInt(userInfo.amount), userInfo.name, userInfo.email)
      console.log(tx)
    } 
  }

  const [donationInfo, setDonationInfo] = useState({
    donated: 0,
    amount: 0
  })

  const refreshData = async () => {
    if (base) {
      const donated = await base.getTotalDonations()
      const amount = await base.getTotalAmountDonated()
      console.log(donated, amount)

      setDonationInfo({
        donated: donated.toNumber(),
        amount: amount.toNumber()
      })
    }
  }

  useEffect(() => {
    if (userInfo.name && userInfo.email && userInfo.amount && userInfo.amount > 0) {
      setFormStatus({ valid: true, message: 'Form is valid.' })
    } else {
      setFormStatus({ valid: false, message: 'Please fill the form to continue.' })
    }
  }, [userInfo])


  useEffect(() => {

    if (window.ethereum) {
      setWallet(window.ethereum)

      async function getAccount() {
        const account = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (account) {
          setAccount(account)
        }
      }

      getAccount()
    

    } else {
      alert("Please install metamask to continue")
    }

  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Give a Little, Change a Lot.

          <br />
          <br />
          People Donated: {donationInfo.donated}
          <br />
          Amount Donated: {donationInfo.amount}
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            Aashman Verma
          </a>
        </div>
      </div>

      <div className="flex flex-col gap-y-2">
        <div className="flex flex-col gap-y-1">
          <label className="font-medium">Name</label>
          <input type="text" className="p-2 rounded-md" onChange={(e) => setUserInfo({...userInfo, name: e.target.value})} />
        </div>

        <div className="flex flex-col gap-y-1">
          <label className="font-medium">Email</label>
          <input type="text" className="p-2 rounded-md" onChange={(e) => setUserInfo({...userInfo, email: e.target.value})} />
        </div>

        <div className="flex flex-col gap-y-1">
          <label className="font-medium">Amount</label>
          <input type="number" className="p-2 rounded-md" onChange={(e) => setUserInfo({...userInfo, amount: e.target.value})} />
        </div>
      </div>

      <div className={`mt-10 mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left`}>
        <a
          className={`group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 ${formStatus.valid ? 'cursor-pointer' : 'cursor-not-allowed'}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={processDonation}
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Donate{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Click Here to process your donation
          </p>
        </a>

        <a
          className="cursor-pointer group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
          onClick={requestWallet}
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Connect Wallet{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Click Here to connect your metamask wallet
          </p>
        </a>

        <a
          className="cursor-pointer group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
          onClick={refreshData}
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Refresh{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Click here to refresh donation data
          </p>
        </a>

        <a
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Info{" "}
          </h2>
          <span className="text-sm">Wallet addr: {account}</span>
        </a>

      </div>
    </main>
  );
}
