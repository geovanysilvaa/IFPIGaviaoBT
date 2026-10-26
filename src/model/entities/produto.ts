import { ImageSourcePropType } from "react-native";

// ============================================================================
// DOMÍNIO: Entidade Produto
// Representa um item do cardápio (comida ou bebida).
// Entidade pura: não conhece React, rotas, datasources nem infraestrutura.
// ============================================================================
export type Produto = {
  id: string;
  categoriaId: string;
  categoriaNome: string;
  nome: string;
  preco: number;
  descricao: string;
  proteinas: string;
  carboidratos: string;
  gorduras: string;
  imagem: ImageSourcePropType;
  imagemGrande: ImageSourcePropType;
};
