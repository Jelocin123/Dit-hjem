import * as React from "react"

function SvgMail(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="contacts-icon-container"
      width="14px"
      height="14px"
      viewBox="0 0 14 14"
      {...props}
    >
      <path
        d="M7 9L5.268 7.484.316 11.729c.18.167.423.271.691.271h11.986c.267 0 .509-.104.688-.271L8.732 7.484 7 9zm6.684-6.729A1.007 1.007 0 0012.993 2H1.007c-.267 0-.509.104-.689.273L7 8l6.684-5.729zM0 2.878v8.308l4.833-4.107zm9.167 4.201L14 11.186V2.875z"
        className=""
        fill="currentColor"
      />
    </svg>
  )
}

export default SvgMail
