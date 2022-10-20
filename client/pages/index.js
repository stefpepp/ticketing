import { buildClient } from "../api/build-client";

const LandingPage = ({ currentUser }) => {
  return (
    <>
      {currentUser ? (
        <h1>HELLO {currentUser.email}</h1>
      ) : (
        <h1>YOU ARE SIGNED OUT</h1>
      )}
    </>
  );
};

LandingPage.getInitialProps = async (context) => {
  //getInitial props is called on serverside, but could be also called in the browser
  //when navigating trough the app apges
  //When some request is made on the serverside, must be in the form:
  //https://SERVICE_NAME.NAMESPACE.svc.cluster.local:
  const { data } = await buildClient(context).get("/api/users/current-user");
  return { currentUser: data?.currentUser };
};

export default LandingPage;
