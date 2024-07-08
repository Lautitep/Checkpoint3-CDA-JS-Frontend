import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { FIND_COUNTRY } from "@/graphql/countries.queries";
import { FindCountryQuery, FindCountryQueryVariables } from "@/graphql/generated/schema";
import Header from "@/components/Header";
import styled from "styled-components";


const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 30px 50px;
  @media (max-width: 768px) {
    margin: 30px;
  }
`;

const Emoji = styled.span`
  font-size: 100px;
`;

const Text = styled.p`
  font-size: 20px;
`;

const CountryDetails = () => {
  const router = useRouter();
  const { code } = router.query;

  const { data, loading, error } = useQuery<FindCountryQuery, FindCountryQueryVariables>(
    FIND_COUNTRY,
    {
      variables: { code: code as string },
      skip: !code,
    }
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!data || !data.country) return <p>Le pays n'existe pas</p>;

  const { country } = data;

  return (
    <>
      <Header />
      <Container>
        <Emoji>{country.emoji}</Emoji>
        <Text>Name : {country.name} ({country.code})</Text>
        <Text>Continent : {country.continent?.name}</Text>
      </Container>
    </>
  );
};

export default CountryDetails;
