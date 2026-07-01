import Card from "../../components/common/Card";
import Logo from "../../components/common/Logo";
import RegisterForm from "../../components/forms/RegisterForm";

export default function Register() {
  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center px-6 py-10">
      <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-16 items-center">

        {/* Left */}

        <div className="hidden lg:block">
          <Logo />

          <h1
            className="text-5xl font-bold mt-10 leading-tight"
            style={{
              color: "var(--text-primary)",
            }}
          >
            Join
            <br />
            StoreHub
            <br />
            Today
          </h1>

          <p
            className="mt-6 text-lg max-w-md"
            style={{
              color: "var(--text-secondary)",
            }}
          >
            Register and start exploring stores,
            submitting ratings and managing your
            business with StoreHub Ratings.
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

        {/* Right */}

        <div className="flex justify-center">
          <Card className="w-full max-w-md">
            <h2
              className="text-3xl font-bold"
              style={{
                color: "var(--text-primary)",
              }}
            >
              Create Account
            </h2>

            <p
              className="mt-2 mb-8"
              style={{
                color: "var(--text-secondary)",
              }}
            >
              Join the StoreHub Ratings Platform
            </p>

            <RegisterForm />
          </Card>
        </div>
      </div>
    </div>
  );
}