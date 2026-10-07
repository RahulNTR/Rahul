import Nav from "@/components/Nav";
import AuthForm from "@/components/AuthForm";

export default function Signup() {
  return (<><Nav /><main className="px-6"><AuthForm mode="signup" /></main></>);
}
