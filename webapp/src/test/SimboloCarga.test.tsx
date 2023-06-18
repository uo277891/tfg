import { render } from '@testing-library/react';
import SimboloCarga from '../components/SimboloCarga';
import '../i18n'

test('SimboloCarga se renderiza correctamente', () => {
  render(<SimboloCarga />);
});
