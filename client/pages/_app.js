import { buildClient } from "../api/build-client";
// COMPONENTS
import Header from "../components/header";
// styles
import "bootstrap/dist/css/bootstrap.css";

const AppComponent = ({ Component, pageProps }) => {
  return (
    <>
      <Header {...pageProps} />
      <Component {...pageProps} />
    </>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  const { data } = await buildClient(appContext.ctx).get(
    "/api/users/current-user"
  );
  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }
  return {
    pageProps,
    ...data,
  };
};

export default AppComponent;
