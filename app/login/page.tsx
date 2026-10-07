import Nav from "@/components/Nav";
import AuthForm from "@/components/AuthForm";

export default function Login() {
  return (<><Nav /><main className="px-6"><AuthForm mode="login" /></main></>);
}
