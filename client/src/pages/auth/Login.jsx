import Card from "../../components/common/Card";
import Logo from "../../components/common/Logo";
import LoginForm from "../../components/forms/LoginForm";

export default function Login() {
  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center px-6 py-10">
      <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Section */}
        <div className="hidden lg:flex flex-col justify-center">
          <Logo />

          <h1
            className="mt-10 text-5xl font-bold leading-tight"
            style={{
              color: "var(--text-primary)",
            }}
          >
            Professional
            <br />
            Store Rating
            <br />
            Platform
          </h1>

          <p
            className="mt-6 text-lg max-w-md"
            style={{
              color: "var(--text-secondary)",
            }}
          >
            Discover stores, submit ratings, manage businesses,
            and analyze customer satisfaction from one modern,
            secure platform.
          </p>

          <div
            className="mt-8 text-4xl"
            style={{
              color: "var(--warning)",
            }}
          >
            ★★★★★
          </div>
        </div>

        {/* Right Section */}
        <div className="flex justify-center">
          <Card className="w-full max-w-md">
            <h2
              className="text-3xl font-bold"
              style={{
                color: "var(--text-primary)",
              }}
            >
              Welcome Back
            </h2>

            <p
              className="mt-2 mb-8"
              style={{
                color: "var(--text-secondary)",
              }}
            >
              Sign in to your StoreHub account
            </p>

            <LoginForm />
          </Card>
        </div>
      </div>
    </div>
  );
}