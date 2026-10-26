import { Categoria } from "../entities/categoria";

// ============================================================================
// DOMÍNIO: Contrato ICategoryDataSource
// Abstração de acesso aos dados de categorias. O domínio define "o que" precisa
// ser recuperado; a infraestrutura decide "como" (memória, SQLite, API REST).
// ============================================================================
export interface ICategoryDataSource {
  buscarCategorias(): Promise<Categoria[]>;
  buscarCategoriaPorId(id: string): Promise<Categoria | undefined>;
}
