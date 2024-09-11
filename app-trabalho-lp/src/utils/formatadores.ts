export function formatarCPF(value: string): string {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2");
  }
  
  export function formatarNome(value: string): string {
    return value
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  
  export function formatarData(value: string): string {
    return value
      .replace(/\D/g, "") // Remove todos os caracteres que não são dígitos
      .replace(/(\d{2})(\d)/, "$1/$2") // Adiciona uma barra depois do segundo dígito
      .replace(/(\d{2})(\d)/, "$1/$2"); // Adiciona uma barra depois do quarto dígito
  }
  
  export function formatarTelefone(telefone: string): string {
    return telefone
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1)$2")
      .replace(/(\d{4,5})(\d)/, "$1-$2")
      .slice(0, 15);
  }
  
  export function formatarDocumento(valor: string): string {
    const valorLimpo = valor.replace(/\D/g, "");
  
    if (valorLimpo.length <= 11) {
      // Formatar como CPF
      return valorLimpo
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})/, "$1-$2");
    } else {
      // Formatar como CNPJ
      return valorLimpo
        .replace(/(\d{2})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1/$2")
        .replace(/(\d{4})(\d{1,2})/, "$1-$2");
    }
  }
  