import { AtSymbolIcon } from "@heroicons/react/solid";
import Head from "next/head";
import Image from "next/image";
import LoadingIcon from "~/components/icon/loading.png";
import { useState } from "react";

const Index = () => {
	const [status, setStatus] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const [primName, setPrimName] = useState("");
	const [secName, setSecName] = useState("");

	const [username, setUsername] = useState("");
	const [primUsername, setPrimUsername] = useState("");
	const [secUsername, setSecUsername] = useState("");

	const [primImg, setPrimImg] = useState("");
	const [secImg, setSecImg] = useState("");

	const inputHandler = (e: any) => {
		setUsername(e.target.value);
	};

	const getData = async () => {
		setStatus("loading");

		// get user
		const respUser = await fetch(
			"https://api.zakiego.my.id/api/twitter/v1/user",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ username }),
			}
		);
		const {
			status: statusUser,
			data: dataUser,
			message: messageUser,
		} = await respUser.json();

		if (statusUser == "error") {
			setErrorMessage(messageUser);
		}

		if (statusUser == "error") return setStatus("error");

		setPrimName(dataUser.name);
		setPrimUsername(dataUser.username);
		setPrimImg(dataUser.profile_image_url.replace("_normal", ""));

		//  get followers

		const respFollowers = await fetch(
			"https://api.zakiego.my.id/api/twitter/v1/followers",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ id: dataUser.id }),
			}
		);
		const { data: dataFollowers } = await respFollowers.json();

		setSecName(dataFollowers.name);
		setSecUsername(dataFollowers.username);
		setSecImg(dataFollowers.profile_image_url.replace("_normal", ""));

		// if done
		setStatus("done");
	};

	const pageHandler = () => {
		if (status == "done")
			return (
				<Found
					primName={primName}
					primUsername={primUsername}
					primImg={primImg}
					secName={secName}
					secUsername={secUsername}
					secImg={secImg}
				/>
			);
		if (status == "loading") return <Loading />;
		if (status == "error") return <div>{errorMessage}</div>;
	};

	return (
		<>
			<Head>
				<title>Pengikut Pertama</title>
			</Head>
			<div className="bg-soft min-h-screen relative text-primary">
				<div className="max-w-3xl mx-auto">
					<div className="max-w-4xl  mx-auto bg-gradient-to-bl from-[#2D5378] to-[#508698] h-36 absolute inset-0 rounded-b-3xl" />
					<div className="pt-20 relative flex flex-col px-7">
						{/* head */}
						<div className="bg-white py-7 rounded-2xl text-center shadow-blues ">
							<div className="text-2xl font-semibold">Pengikut Pertama</div>
							<div className="mt-8 relative w-full flex-wrap items-stretch mb-3 px-11">
								<span className="z-10 h-full text-center absolute flex items-center justify-center w-8 pl-3 py-3">
									<AtSymbolIcon className="h-5 w-5" />
								</span>
								<input
									onChange={inputHandler}
									type="text"
									className="transition-all duration-300 focus:ring-2  ring-[#2D5378] ring-opacity-50 rounded-2xl text-base px-3 py-3 relative border-2 border-tepi outline-none  w-full pl-10"
								/>
							</div>
							<button
								onClick={getData}
								className="mt-2 bg-primary text-white font-semibold text-xs px-5 py-2 rounded-lg shadow-blues opacity-80 hover:opacity-100 transition-all"
							>
								Lihat
							</button>
						</div>

						{/* content */}
						<div className="mt-10 bg-white shadow-blues rounded-2xl text-center py-7">
							{pageHandler()}
							{/* footer */}
							<div className="mt-9 text-primary/40 text-xs text-center">
								{`Made with <3 by `}
								<a
									href="https://zakiego.my.id/"
									className="border-b-[1px] border-hitam-1c/40 hover:border-hitam-1c/75 hover:text-hitam-1c/75 transition-all"
								>
									Zakiego
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Index;

type FoundData = {
	primImg: string;
	primName: string;
	primUsername: string;
	secImg: string;
	secName: string;
	secUsername: string;
};

const Found = ({
	primImg,
	primName,
	primUsername,
	secImg,
	secName,
	secUsername,
}: FoundData) => {
	return (
		<>
			<div className="px-12 py-5 max-w-max mx-auto flex justify-center items-center bg-white shadow-blues  rounded-2xl">
				<Image
					src={primImg}
					height={48}
					width={48}
					unoptimized={false}
					quality={100}
					alt="Profile"
					className="rounded-full"
				/>
				<div className="text-left pl-2 space-y-0 ">
					<div className="text-sm font-medium">{primName}</div>
					<div className="text-sm text-primary text-opacity-50">
						{`@${primUsername}`}
					</div>
				</div>
			</div>
			<div className="mt-10 font-medium opacity-75">
				Pengikut pertama kamu adalah
			</div>
			<div className="mt-5">
				<Image
					src={secImg}
					height={123}
					width={123}
					unoptimized={false}
					quality={100}
					alt="Profile"
					className="rounded-full"
				/>
				<div className="mt-3 text-2xl font-semibold">{secName}</div>
				<div className="mt-1 text-sm text-primary text-opacity-50">
					{`@${secUsername}`}
				</div>
			</div>
		</>
	);
};

const Loading = () => {
	return (
		<div className="flex justify-center animate-spin-slow">
			<Image
				src={LoadingIcon}
				height={48}
				width={48}
				alt="loading icon"
				unoptimized={true}
			/>
		</div>
	);
};
