import * as React from "react"

function SvgArrowLeft(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="arrow-container"
      width={32}
      height={52}
      viewBox="0 0 32 52"
      {...props}
    >
      <g className="left-arrow" fill="currentColor">
        <path
          opacity={0.5}
          d="M31.611 7.646L24.824.589.389 25.995l6.787 7.057z"
        />
        <path  d="M.389 26.006l6.787-7.058 24.435 25.406-6.787 7.057z" />
      </g>
    </svg>
  )
}

export default SvgArrowLeft
