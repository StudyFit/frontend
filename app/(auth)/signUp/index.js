import { Redirect } from "expo-router";
import { RouterName } from "@/components/RouterName";

export default function SignUpIndex() {
  return <Redirect href={RouterName.signUpStep1} />;
}
