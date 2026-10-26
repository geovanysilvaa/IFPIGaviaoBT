import { Categoria } from "@/model/entities/categoria";
import { Produto } from "@/model/entities/produto";

// ============================================================================
// CASOS DE USO: Contrato IMenuUseCases
// Abstração consumida pelas ViewModels. As ViewModels desconhecem a
// implementação concreta (MenuUseCases) e a infraestrutura, dependendo apenas
// desta interface — princípio da Inversão de Dependência (DIP).
// ============================================================================
export interface IMenuUseCases {
  /** Lista todas as categorias disponíveis no cardápio. */
  listarCategorias(): Promise<Categoria[]>;

  /** Lista os produtos de uma categoria, validando o identificador. */
  listarProdutosPorCategoria(categoriaId: string): Promise<Produto[]>;

  /** Recupera um produto pelo id, falhando com DomainError se não existir. */
  obterProdutoPorId(produtoId: string): Promise<Produto>;

  /** Resolve o nome de exibição de uma categoria a partir do seu id. */
  obterNomeCategoria(categoriaId: string): Promise<string>;
}
