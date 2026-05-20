import Link from "next/link"

export default function Home() {

  return (

    <div
      className="
      min-h-screen
      flex
      flex-col
      items-center
      justify-center
      gap-6
      "
    >

      <h1 className="text-5xl font-bold">
        Prowider Lead Distribution System
      </h1>

      <div className="flex gap-5">

        <Link
          href="/request-service"
          className="
          bg-black
          text-white
          px-5
          py-3
          rounded
          "
        >
          Request Service
        </Link>

        <Link
          href="/dashboard"
          className="
          bg-blue-500
          text-white
          px-5
          py-3
          rounded
          "
        >
          Dashboard
        </Link>

        <Link
          href="/test-tools"
          className="
          bg-green-500
          text-white
          px-5
          py-3
          rounded
          "
        >
          Test Tools
        </Link>

      </div>

    </div>

  )

}