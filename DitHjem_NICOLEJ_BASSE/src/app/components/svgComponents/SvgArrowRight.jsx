import * as React from "react"

function SvgArrowRight(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="arrow-container"
      width={32}
      height={52}
      viewBox="0 0 32 52"
      {...props}
    >
      <g
        className="right-arrow"
        fill="currentColor"
      >
        <path d="M.388 44.354l6.788 7.057 24.436-25.406-6.788-7.057L.388 44.354z" />
        <path
          opacity={0.5}
          d="M31.612 25.994l-6.788 7.058L.388 7.646 7.176.589l24.436 25.405z"
        />
      </g>
    </svg>
  )
}

export default SvgArrowRight;
