import * as React from "react"

function SvgClock(props) {
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
        d="M12 23.999C5.373 23.999 0 18.628 0 12 0 5.373 5.373 0 12 0c6.628 0 11.999 5.372 11.999 12S18.628 23.999 12 23.999zM12 2C6.478 2 2 6.478 2 12s4.477 10 10 10 10-4.478 10-10S17.522 2 12 2zm3.567 14.757l-4.275-3.995a1.037 1.037 0 01-.301-.82L10.999 7a1 1 0 012.002 0v4.594l3.756 3.974c.33.328.33.86 0 1.189a.839.839 0 01-1.19 0z"
      />
    </svg>
  )
}

export default SvgClock;