import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type ApiResponse<T = undefined> = {
  success: boolean
  message: string
  data?: T
}