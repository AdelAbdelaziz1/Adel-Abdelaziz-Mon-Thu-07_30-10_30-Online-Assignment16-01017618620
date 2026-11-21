import StaticAuth from "@/components/common/staticAuth";


export default function LayoutAuth({ children }: LayoutProps<"/">) {
  return (
    <div className="container py-16 mx-auto px-4" id="login-section">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
        {/* Left side: promo */}
        <div className="hidden lg:block">


          <StaticAuth/>
          
        </div>

        {/* Right side: login form goes here */}
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
