export async function downloadDoc(fileUrl) {
  const response = await fetch(fileUrl);
  if (response.status === 200) {
    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = "document";
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}
