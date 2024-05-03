import * as React from "react"

function SvgMobil(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="contacts-icon-container"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        className="contacts-icon"
        fillRule="evenodd"
        clipRule="evenodd"
        fill="currentColor"
        d="M17.001 23.999H7A3 3 0 014 21V3a3 3 0 013-3h10.001A3 3 0 0120 3v18a3 3 0 01-2.999 2.999zM18 4a2 2 0 00-2-2H8a2 2 0 00-2 2v16a2 2 0 002 2h8a2 2 0 002-2V4zm-4 1h-4a1 1 0 110-2h4a1 1 0 110 2zm-2 13c1.105 0 2 .672 2 1.499 0 .829-.895 1.501-2 1.501s-2-.672-2-1.501c0-.827.895-1.499 2-1.499z"
      />
    </svg>
  )
}

export default SvgMobil
