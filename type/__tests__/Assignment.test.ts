import Assignment from '../Assignment';

describe('Assignment Type', () => {
  test('should have correct structure', () => {
    const assignment: Assignment = {
      id: 1,
      vendedor_id: 100,
      institucion_nombre: 'Hospital Central',
      direccion: 'Calle Principal 123',
      contacto_principal: 'Dr. Juan Pérez',
    };

    expect(assignment.id).toBe(1);
    expect(assignment.vendedor_id).toBe(100);
    expect(assignment.institucion_nombre).toBe('Hospital Central');
    expect(assignment.direccion).toBe('Calle Principal 123');
    expect(assignment.contacto_principal).toBe('Dr. Juan Pérez');
  });

  test('should accept different values', () => {
    const assignment: Assignment = {
      id: 2,
      vendedor_id: 200,
      institucion_nombre: 'Clínica San José',
      direccion: 'Avenida Libertad 456',
      contacto_principal: 'Dra. María González',
    };

    expect(assignment.id).toBe(2);
    expect(assignment.institucion_nombre).toBe('Clínica San José');
  });

  test('should have all required properties', () => {
    const assignment: Assignment = {
      id: 3,
      vendedor_id: 300,
      institucion_nombre: 'Test Institution',
      direccion: 'Test Address',
      contacto_principal: 'Test Contact',
    };

    expect(assignment).toHaveProperty('id');
    expect(assignment).toHaveProperty('vendedor_id');
    expect(assignment).toHaveProperty('institucion_nombre');
    expect(assignment).toHaveProperty('direccion');
    expect(assignment).toHaveProperty('contacto_principal');
  });
});

