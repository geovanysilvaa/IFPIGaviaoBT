// ============================================================================
// DOMÍNIO: Erros estruturados
// Toda falha de domínio herda de DomainError. As camadas superiores (Use Cases
// e ViewModels) tratam apenas esses tipos — nunca erros técnicos crus vindos
// da infraestrutura, o que mantém o desacoplamento da Clean Architecture.
// ============================================================================

// Classe base de todos os erros de domínio da aplicação.
export class DomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = new.target.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

// Erro de validação de entrada (dados obrigatórios ausentes/ inválidos).
export class ValidationError extends DomainError {
  constructor(message: string) {
    super(message);
  }
}

// Erro de acesso a dados: encapsula falhas da infraestrutura sem vazar
// detalhes técnicos (stack, driver de banco, status HTTP, etc.) para cima.
export class DataSourceError extends DomainError {
  constructor(message: string, readonly causaOriginal?: unknown) {
    super(message);
  }
}
