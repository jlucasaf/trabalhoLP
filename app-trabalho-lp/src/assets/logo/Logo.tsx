import * as React from "react"
import Svg, {
  SvgProps,
  Path,
  Defs,
  Pattern,
  Use,
  Image,
} from "react-native-svg"
const SvgComponent = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={390}
    height={424}
    fill="none"
    {...props}
  >
    <Path fill="url(#a)" d="M-164 0h718v424h-718z" />
    <Defs>
      <Pattern
        id="a"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <Use xlinkHref="#b" transform="matrix(.00026 0 0 .00044 -.025 0)" />
      </Pattern>
      <Image
        id="b"
        width={4000}
        height={2250}
      />
    </Defs>
  </Svg>
)
export default SvgComponent