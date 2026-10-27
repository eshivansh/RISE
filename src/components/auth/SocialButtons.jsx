import { useAuth } from "../../context/useAuth.js";

const demoUser = { name: "Demo Trader", email: "demo@rise.com", pass: "demo1234" };

// Google and Apple are not connected; both sign in with the demo account.
export default function SocialButtons() {
  const { loginUser } = useAuth();

  return (
    <>
      <div className="divider">or continue with</div>
      <div className="socials">
        <button type="button" className="socialButton" onClick={() => loginUser(demoUser)}>
          <i className="bi bi-google"></i> Google
        </button>
        <button type="button" className="socialButton" onClick={() => loginUser(demoUser)}>
          <i className="bi bi-apple"></i> Apple
        </button>
      </div>
    </>
  );
}
