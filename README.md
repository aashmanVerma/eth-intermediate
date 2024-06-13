# Charity Donation using Metamask project 

I have created a simple charity donation platform using metamask, nextjs, hardhat.

Functions available in the contract - 
1. Donate function with condition checks, if not met then we will revert the transaction
2. Function to fetch to the total number of people who have donated till now
3. Function to fetch the total amount in donations we have received till now

Function available in frontend - 
1. Connect wallet on site load
2. Specifically connect wallet button
3. Donate button to process transaction and refresh button to get the information related to donated amount till now


# Project Setup 

* Next js base project with tailwind css
* Hardhat development enviroment setup

# Installation and Execution

After cloning the github, you will want to do the following to get the code running on your computer.

1. Inside the project directory, in the terminal type: npm i
2. Open two additional terminals in your VS code
3. In the second terminal type to run local hardhat node: npx hardhat node 
4. In the third terminal, type to deploy your contract to local hardhat node: npx hardhat run --network localhost scripts/deploy.js
5. Back in the first terminal, type npm run dev to launch the front-end.
6. Add a local rpc network to the metamask web extension with the help of information given on the second terminal and chain id to be 31337
7. Import a account in the metamask using the account private key given after starting up the local hardhat node

After this, the project will be running on your localhost. 
Typically at http://localhost:3000/

# Contributor 

Aashman Verma - vermaaashman16@gmail.com
In case of any issues of help you can connect with me through mail.