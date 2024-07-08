import { LIST_COUNTRIES } from "@/graphql/countries.queries";
import { CREATE_COUNTRY } from "@/graphql/countries.mutations";
import { LIST_CONTINENTS } from "@/graphql/continents.queries";
import { CountriesQuery, CountriesQueryVariables, AddCountryMutation, AddCountryMutationVariables, NewCountryInput,
  ContinentsQuery, ContinentsQueryVariables,
 } from "@/graphql/generated/schema";
import { useQuery, useMutation } from "@apollo/client";
import Header from "@/components/Header";
import styled from "styled-components";
import Form from "@/components/Form";
import { useRouter } from "next/router";

const Container = styled.div`
  margin: 30px 50px;
  @media (max-width: 768px) {
    margin: 30px;
  }
`;

const CountryContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

const CountryCard = styled.div`
  min-width: 100px;
  border: 1px solid black;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
`;

const P = styled.p`
  margin: 0;
`;

export default function ListCountries() {
  const router = useRouter();
  const { data } = useQuery<CountriesQuery, CountriesQueryVariables>(LIST_COUNTRIES, {
    fetchPolicy: "no-cache",
  });
  const { data: continentsData } = useQuery<ContinentsQuery, ContinentsQueryVariables>(LIST_CONTINENTS, {
    fetchPolicy: "no-cache",
  });

  const [createCountry] = useMutation<
    AddCountryMutation,
    AddCountryMutationVariables
  >(CREATE_COUNTRY, {
    onCompleted() {
      router.reload();
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const infos = Object.fromEntries(formData) as NewCountryInput;
    infos.continent = parseInt(formData.get("continent") as string, 10);
    if (infos.name) {
      createCountry({ variables: { data: infos } });
    }
  };

  return (
    <>
      <Header />
      <Container>
      <Form onSubmit={handleSubmit} continents={continentsData?.continents}/>
      <CountryContainer>
        {data?.countries.map((country) => (
          <CountryCard key={country.name} onClick={() => router.push(`/countries/${country.code}`)}>
                  <P>{country.name}</P>
                  <P>{country.emoji}</P>
                </CountryCard>
        ))}
      </CountryContainer>
        </Container>
    </>
  );
}
