import { Produto } from "../entities/produto";

// ============================================================================
// DOMÍNIO: Contrato IProductDataSource
// Abstração de acesso aos dados de produtos. O domínio define "o que" precisa
// ser recuperado; a infraestrutura decide "como" (memória, SQLite, API REST).
// ============================================================================
export interface IProductDataSource {
  buscarProdutosPorCategoria(categoriaId: string): Promise<Produto[]>;
  buscarProdutoPorId(produtoId: string): Promise<Produto | undefined>;
}
