import Link from "next/link"

export default function Navbar() {

    return (

        <div
            className="
            bg-black
            text-white
            p-4
            flex
            gap-5
            "
        >

            <Link href="/">
                Home
            </Link>

            <Link href="/request-service">
                Request Service
            </Link>

            <Link href="/dashboard">
                Dashboard
            </Link>

            <Link href="/test-tools">
                Test Tools
            </Link>

        </div>

    )

}