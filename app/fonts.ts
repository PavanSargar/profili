import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "---font-poppins",
  weight: ["300", "400", "600", "700", "800"],
  display: 'swap'
});

export const fonts = {
  poppins,
};
