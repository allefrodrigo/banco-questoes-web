// services/uploadService.ts
export async function uploadDocx(file: File): Promise<any> {
    const formData = new FormData();
    formData.append("docx", file);
  
    const response = await fetch("http://localhost:3000/convert", {
      method: "POST",
      body: formData,
    });
  
    if (!response.ok) {
      throw new Error("Erro ao processar o arquivo");
    }
    return await response.json();
  }
  