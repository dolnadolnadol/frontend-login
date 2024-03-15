'use client';

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
	const routes = useRouter();
	const callAPI = async () => {
		try {
			const res = await fetch(`http://localhost:3001/`);

			if (res.ok) {
				const data = await res.json();
				console.log(data);
			} else {
				console.log('Request failed with status:', res.status);
			}

		} catch (err) {
			console.log(err);
		}
	};
	useEffect(()=>{
		callAPI();
        routes.push("/dashboard/");
	}, []);
	return null;
}