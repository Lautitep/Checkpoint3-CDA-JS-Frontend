import styled from "styled-components";

const FormContainer = styled.div`
`;

const StyledForm = styled.form`
  display: flex;
  gap: 100px;
  justify-content: center;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: flex-start;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Button = styled.button`
  background-color: #f7146b;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
`;

type FormProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  continents: Array<{ id: number; name: string }>;
};

export default function Form({ onSubmit, continents }: FormProps) {
  return (
    <FormContainer>
      <StyledForm onSubmit={onSubmit}>
        <FormGroup>
          <label htmlFor="name">Name</label>
          <Input type="text" id="name" name="name" />
        </FormGroup>
        <FormGroup>
          <label htmlFor="emoji">Emoji</label>
          <Input type="text" id="emoji" name="emoji" />
        </FormGroup>
        <FormGroup>
          <label htmlFor="code">Code</label>
          <Input type="text" id="code" name="code" />
        </FormGroup>
        <FormGroup>
          <label htmlFor="continent">Continent</label>
          <Select id="continent" name="continent">
            {continents?.map((continent) => (
              <option key={continent.id} value={continent.id}>
                {continent.name}
              </option>
            ))}
          </Select>
        </FormGroup>
        <Button type="submit">Add</Button>
      </StyledForm>
    </FormContainer>
  );
}
