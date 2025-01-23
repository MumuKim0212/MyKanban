import React from 'react';
import styled from 'styled-components';
import { Card, Label } from '../../types/kanban';

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

const Input = styled.input`
  margin-bottom: 10px;
  padding: 5px;
`

const TextArea = styled.textarea`
  margin-bottom: 10px;
  padding: 5px;
`

const Select = styled.select`
  margin-bottom: 10px;
  padding: 5px;
`

const Button = styled.button`
  padding: 5px 10px;
  background-color: #0052cc;
  color: white;
  border: none;
  cursor: pointer;
`

interface Props {
  formData: Omit<Card, 'id'>;
  setFormData: React.Dispatch<React.SetStateAction<Omit<Card, 'id'>>>;
  onSubmit: (e: React.FormEvent) => void;
}

const CardForm: React.FC<Props> = ({ formData, setFormData, onSubmit }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLabelsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const labelNames = e.target.value.split(',').map(label => label.trim());
    const labels: Label[] = labelNames.map(name => ({ id: '', name }));
    setFormData(prev => ({ ...prev, labels }));
  };

  return (
    <Form onSubmit={onSubmit}>
      <Input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        required
      />
      <TextArea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        rows={3}
      />
      <Select
        name="priority"
        value={formData.priority}
        onChange={handleChange}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </Select>
      <Input
        name="assignee"
        value={formData.assignee}
        onChange={handleChange}
        placeholder="Assignee"
      />
      <Input
        name="labels"
        value={formData.labels.map(label => label.name).join(', ')}
        onChange={handleLabelsChange}
        placeholder="Labels (comma-separated)"
      />
      <Button type="submit">Save</Button>
    </Form>
  );
};

export default CardForm;