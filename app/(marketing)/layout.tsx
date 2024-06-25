import { Footer } from "./footer";
import { Header } from "./header";

type Props = {
  children: React.ReactNode;
};

const MarketingLayout = ({ children }: Props) => {
  return (
    <div className="h-full">
      <Header />
      {children}
      <Footer />
    </div>
  );
};
export default MarketingLayout;
