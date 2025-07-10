module.exports = {
  // O preset que informa ao Jest para usar o ts-jest para arquivos .ts
  preset: 'ts-jest',

  // O ambiente de teste que será usado. 'node' é o ideal para backend.
  testEnvironment: 'node',

  // Um padrão de glob para encontrar os arquivos de teste.
  // Isso encontrará qualquer arquivo .test.ts ou .spec.ts dentro de src.
  testMatch: ['<rootDir>/src/**/*.spec.ts'],

  // Limpa os mocks entre cada teste para garantir isolamento.
  clearMocks: true,

  // Coleta a cobertura de código dos arquivos especificados.
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  
  // Mapeia os caminhos do tsconfig.json para que o Jest entenda
  // importações como 'src/modules/...'
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
};