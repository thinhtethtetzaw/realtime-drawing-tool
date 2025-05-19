import { Button } from "@/components/ui/button";
import { PageEndPoint } from "@/ecosystem/PageEndPoint";
import { loginState } from "@/state";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";

function Home() {
  const navigate = useNavigate();
  const setAuthState = useSetRecoilState(loginState);

  const handleLogout = () => {
    setAuthState({ token: "", userData: { email: "" } });
    navigate(PageEndPoint.login.url);
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      Home
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
}

export default Home;
