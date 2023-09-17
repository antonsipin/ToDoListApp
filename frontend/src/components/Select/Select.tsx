import Form from 'react-bootstrap/Form'

interface SelectProps {
    value: string
    setTheme: (event: string) => void
}

export function Select({ value, setTheme }: SelectProps) {
  return (
    <Form.Select onChange={(e) => setTheme(e.currentTarget.value)} aria-label="Theme select">
      <option>Select theme</option>
      <option value='White'>Light theme</option>
      <option value='Black'>Dark theme</option>
    </Form.Select>
  );
}
