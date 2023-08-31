import { Helmet } from "react-helmet";

export interface HelmetDecoratorProps {
  title: string;
}

const HelmetDecorator = ({ title }: HelmetDecoratorProps) => {
  return (
    <Helmet>
      <title>MusicShop | {title}</title>
    </Helmet>
  );
};

export default HelmetDecorator;
