import { ICategoryDataSource } from "@/model/datasources/iCategoryDataSource";
import { IProductDataSource } from "@/model/datasources/iProductDataSource";
import { Categoria } from "@/model/entities/categoria";
import { Produto } from "@/model/entities/produto";
import { DomainError, ValidationError } from "@/model/errors";
import { IMenuUseCases } from "./iMenuUseCases";

// ============================================================================
// CASOS DE USO: MenuUseCases
// Concentra as regras de negócio e validações de domínio do cardápio. Depende
// exclusivamente de abstrações (ICategoryDataSource / IProductDataSource),
// recebidas por injeção no construtor — nunca de implementações concretas.
// ============================================================================

const NOME_CATEGORIA_PADRAO = "Cardápio";

export class MenuUseCases implements IMenuUseCases {
  constructor(
    private readonly categoryDataSource: ICategoryDataSource,
    private readonly productDataSource: IProductDataSource
  ) {}

  async listarCategorias(): Promise<Categoria[]> {
    const categorias = await this.categoryDataSource.buscarCategorias();

    if (categorias.length === 0) {
      throw new DomainError("Nenhuma categoria disponível no momento.");
    }

    return categorias;
  }

  async listarProdutosPorCategoria(categoriaId: string): Promise<Produto[]> {
    if (!categoriaId || categoriaId.trim().length === 0) {
      throw new ValidationError("Categoria não informada.");
    }

    return this.productDataSource.buscarProdutosPorCategoria(categoriaId);
  }

  async obterProdutoPorId(produtoId: string): Promise<Produto> {
    if (!produtoId || produtoId.trim().length === 0) {
      throw new ValidationError("Item não informado.");
    }

    const produto = await this.productDataSource.buscarProdutoPorId(produtoId);

    if (!produto) {
      throw new DomainError("Item não encontrado.");
    }

    return produto;
  }

  async obterNomeCategoria(categoriaId: string): Promise<string> {
    if (!categoriaId || categoriaId.trim().length === 0) {
      throw new ValidationError("Categoria não informada.");
    }

    const categoria = await this.categoryDataSource.buscarCategoriaPorId(
      categoriaId
    );

    return categoria?.nome ?? NOME_CATEGORIA_PADRAO;
  }
}
