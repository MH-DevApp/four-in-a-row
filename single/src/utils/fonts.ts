import { Black_Ops_One, Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800", "900"],
  variable: "--font-poppins",
});
const blackOpsOne = Black_Ops_One({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-black-ops-one",
});

export { poppins, blackOpsOne };
