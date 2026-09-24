import { ImageSourcePropType } from "react-native";

// ============================================================================
// MODEL: Entidade Produto
// Representa um item do cardápio (comida ou bebida).
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
