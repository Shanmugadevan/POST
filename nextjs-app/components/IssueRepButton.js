import { Button } from "@chakra-ui/react"
import { parseEther } from "ethers/lib/utils"
import { useContractWrite, usePrepareContractWrite } from "wagmi"
import addressJson from "../deployedAddress/address.json"
import { Web3Storage } from "web3.storage"
import { useState } from "react"

export default function IssueRepButton(props) {
    const [uri, setUri] = useState("")

	const { config } = usePrepareContractWrite({
		addressOrName: "0x3e646aCfDaa901239A72f86a79bf1aE93B2596ee",
		contractInterface: addressJson.postFactory.abi,
		functionName: "createSoulboundReputationToken",
		args: [
			props.name,
			props.symbol,
			"1",
			uri,
			props.root,
			props.mintLimit,
			0,
            props.addIncrement,
            props.reduceIncrement
		],
		overrides: { value: parseEther("0.001") },
	})
	const { data, write } = useContractWrite(config)
	async function uploadToIpfs() {
		const token = process.env.NEXT_PUBLIC_WEB3_STORAGE
		const web3Client = new Web3Storage({ token: token })
		const obj = { allowed:props.leaves }
		const leafBlob = new Blob([JSON.stringify(obj)], { type: "application/json" })
		const cid = await web3Client.put([
			new File([props.selectedFile], "image.jpg"),
			new File([leafBlob], "allowed.json"),
		])
        console.log(cid)
        setUri("ipfs://"+cid)
	}
	async function issueToken() {
		console.log(typeof props.selectedFile)
		await uploadToIpfs()
		console.log(props.name)
		console.log(props.symbol)
		console.log(props.uri)
		console.log(props.root)
		console.log(props.mintLimit)
		console.log(props.addIncrement)
		console.log(props.reduceIncrement)
		await write?.()
	}
	return (
		<div>
			<Button
				disabled={!(props.root && props.selectedFile)}
				onClick={issueToken}
				bg="#7d769b"
				color="#f7efe8"
				_hover={{ opacity: 0.77 }}
				className="mt-10"
			>
				Issue Reputation Token
			</Button>
		</div>
	)
}
