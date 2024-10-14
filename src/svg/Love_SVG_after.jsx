import * as React from "react"
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width={200}
    height={200}
    fill="red"
    baseProfile="tiny"
    viewBox="0 0 256 256"
    {...props}
  >
    <path d="M218.2 144.5c26.5-23.3 29.8-63.9 6.4-90.9-23.3-26.5-63.9-29.8-90.9-6.4l-9.2 8-9.2-8c-26.5-23.3-67.6-20.1-90.9 6.4C1 80.2 4.3 121.2 30.8 144.5L123 239l95.2-94.5z" />
  </svg>
)
export default SvgComponent
