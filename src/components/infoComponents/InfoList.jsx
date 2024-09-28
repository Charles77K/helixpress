import { Link } from "react-router-dom"

export default function InfoList({title, LinkTitle}) {
  return (
    <p>

    <Link
    className="hover:underline mb-1 hover:cursor-pointer"
   to={`/information${LinkTitle ? LinkTitle : ''}`}
  >
    {title}
  </Link>
  <hr></hr>
    </p>
  )
}
