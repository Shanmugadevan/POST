import AttestForm from "../components/AttestForm"
import Footer from "../components/Footer"
import Header from "../components/Header"


export default function IssueSbt() {
	return (
		<div className="">
			<Header />
			<div className="bg-[url('/post_common.png')] pt-10">
				<div className="ml-20 left-7 w-1/2 ">
					<AttestForm size={"100%"} name={"Attest"} abb={"Attest SBT"} />
				</div>
			</div>
			<Footer />
		</div>
	)
}
