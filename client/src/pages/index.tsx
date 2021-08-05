import Head from 'next/head';
import { NextPageContext } from 'next';

const Index = (props): JSX.Element => {
  return (
    <>
      <Head>
        <title>pageTitle</title>
      </Head>
    </>
  );
};

export const getServerSideProps = async (ctx: NextPageContext) => {
  return {
    props: {},
  };
};

export default Index;
