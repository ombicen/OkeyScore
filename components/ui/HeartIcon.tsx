import * as React from "react";
import Svg, { Path } from "react-native-svg";

export function HeartIcon({
  color = "#E53935",
  size = 48,
}: {
  color?: string;
  size?: number;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <Path
        d="M24 43s-1.45-1.32-3.6-3.13C12.2 33.13 4 26.36 4 18.5 4 12.7 8.7 8 14.5 8c3.04 0 5.91 1.41 7.5 3.61C23.59 9.41 26.46 8 29.5 8 35.3 8 40 12.7 40 18.5c0 7.86-8.2 14.63-16.4 21.37C25.45 41.68 24 43 24 43z"
        fill={color}
        stroke="#fff"
        strokeWidth={1.5}
      />
    </Svg>
  );
}
