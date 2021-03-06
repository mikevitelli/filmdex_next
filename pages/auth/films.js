import { useSession } from "next-auth/client";
import Welcome from "../../components/TemporaryLanding";
import Films from "../../components/Films";
import Layout from "../../components/Layout";

export async function getStaticProps() {
  const res = await fetch(`https://filmapi.vercel.app/api/films`);
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { films: JSON.parse(JSON.stringify(data)) },
  };
}

const FilmsPage = (props) => {
  const [session, loading] = useSession();

  function displayAuthenticatedContent(session) {
    if (session) {
      return (
        <>
          <Layout>
            <Films {...props} />
          </Layout>
        </>
      );
    } else {
      return (
        <>
          <Welcome />
        </>
      );
    }
  }
  return <>{displayAuthenticatedContent(session)}</>;
};

export default FilmsPage;
