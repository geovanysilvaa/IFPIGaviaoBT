// ============================================================================
// Função auxiliar de apresentação, compartilhada entre ViewModels.
// Formatar um preço em moeda é parte de "preparar os dados que a View
// exibirá", por isso mora em viewmodel/ e não no Model (que só conhece o
// número puro) nem na View (que apenas renderiza o texto já pronto).
// ============================================================================
export function formatarPreco(valor: number): string {
  return `R$ ${valor.toFixed(2).replace(".", ",")}`;
}
